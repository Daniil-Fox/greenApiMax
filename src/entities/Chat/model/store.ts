import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { GreenApi } from "@/shared/api/greenApi/greenApi";
import type { GreenApiChat } from "@/shared/api/greenApi/types";
import type { Chat, UpsertChatInput } from "./types";
import type { Credentials } from "@/entities/Session/model/types";

interface ChatStore {
    chats: Chat[];
    isLoading: boolean;
    error: string | null;

    upsertChat: (chat: UpsertChatInput) => void;
    fetchChats: (credentials: Credentials) => Promise<void>;
}

const sortChats = (chats: Chat[]): Chat[] => {
    return [...chats].sort((a, b) => (b.lastActivityAt ?? 0) - (a.lastActivityAt ?? 0));
};

const toChat = (serverChat: GreenApiChat, existing?: Chat): Chat => ({
    id: serverChat.chatId,
    name: serverChat.name || existing?.name || serverChat.chatId,
    type: serverChat.type,
    phoneNumber: serverChat.phoneNumber ?? existing?.phoneNumber ?? 0,
    lastMessage: existing?.lastMessage,
    lastActivityAt: existing?.lastActivityAt,
    avatar: existing?.avatar,
});

const mergeChat = (current: Chat, patch: UpsertChatInput): Chat => ({
    ...current,
    name: patch.name || current.name,
    type: patch.type ?? current.type,
    phoneNumber: patch.phoneNumber ?? current.phoneNumber,
    lastMessage: patch.lastMessage ?? current.lastMessage,
    lastActivityAt: patch.lastActivityAt ?? (patch.lastMessage ? Date.now() : current.lastActivityAt),
    avatar: patch.avatar || current.avatar,
});

const avatarRequests = new Set<string>();
let pendingChatsFetch: Promise<void> | null = null;
let lastChatsFetchAt = 0;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRateLimitError = (error: unknown): boolean => {
    return typeof error === 'object'
        && error !== null
        && 'response' in error
        && (error as { response?: { status?: number } }).response?.status === 429;
};

const loadMissingAvatars = async (
    api: GreenApi,
    get: () => ChatStore,
    set: (
        partial: Partial<ChatStore> | ((state: ChatStore) => Partial<ChatStore>),
        replace?: false,
        action?: string,
    ) => void,
) => {
    const missing = get().chats.filter((chat) => chat.avatar === undefined && !avatarRequests.has(chat.id));

    const applyAvatar = (chatId: string, urlAvatar: string) => {
        set((state) => ({
            chats: state.chats.map((item) =>
                item.id === chatId ? { ...item, avatar: urlAvatar } : item
            ),
        }), false, 'chats/setAvatar');
    };

    for (const chat of missing) {
        avatarRequests.add(chat.id);

        try {
            applyAvatar(chat.id, await api.getAvatar(chat.id));
            await delay(150);
        } catch (error) {
            if (!isRateLimitError(error)) {
                avatarRequests.delete(chat.id);
                console.error('Не удалось загрузить аватар:', error);
                break;
            }

            await delay(1100);

            try {
                applyAvatar(chat.id, await api.getAvatar(chat.id));
            } catch (retryError) {
                avatarRequests.delete(chat.id);
                console.error('Не удалось загрузить аватар:', retryError);
                break;
            }
        }
    }
};

export const useChatStore = create<ChatStore>()(
    devtools(
        persist(
            (set, get) => ({
                chats: [],
                isLoading: false,
                error: null,

                upsertChat: (patch) => {
                    const { chats } = get();
                    const existingChat = chats.find((chat) => chat.id === patch.id);

                    if (existingChat) {
                        set({
                            chats: sortChats(chats.map((chat) =>
                                chat.id === patch.id ? mergeChat(chat, patch) : chat
                            )),
                        }, false, 'chats/upsertChat');
                        return;
                    }

                    const newChat: Chat = {
                        id: patch.id,
                        name: patch.name || patch.id,
                        type: patch.type ?? 'user',
                        phoneNumber: patch.phoneNumber ?? 0,
                        lastMessage: patch.lastMessage,
                        lastActivityAt: patch.lastActivityAt,
                        avatar: patch.avatar,
                    };

                    set({ chats: sortChats([newChat, ...chats]) }, false, 'chats/upsertChat');
                },

                fetchChats: (credentials) => {
                    if (pendingChatsFetch) return pendingChatsFetch;

                    pendingChatsFetch = (async () => {
                        set({ isLoading: true, error: null }, false, 'chats/fetchStart');
                        try {
                            const wait = 1100 - (Date.now() - lastChatsFetchAt);
                            if (wait > 0) await delay(wait);

                            const api = new GreenApi(credentials);
                            let serverChats: GreenApiChat[];

                            try {
                                serverChats = await api.getChats();
                            } catch (error) {
                                if (!isRateLimitError(error)) throw error;
                                await delay(1100);
                                serverChats = await api.getChats();
                            }

                            lastChatsFetchAt = Date.now();
                            const localById = new Map(get().chats.map((chat) => [chat.id, chat]));

                            const merged = serverChats.map((serverChat) => {
                                const existing = localById.get(serverChat.chatId);
                                localById.delete(serverChat.chatId);
                                return toChat(serverChat, existing);
                            });

                            const localOnly = Array.from(localById.values());

                            set({ chats: sortChats([...merged, ...localOnly]), isLoading: false }, false, 'chats/fetchSuccess');
                            void loadMissingAvatars(api, get, set);
                        } catch (err) {
                            console.error('Ошибка при загрузке чатов:', err);
                            set({
                                error: isRateLimitError(err)
                                    ? 'Слишком много запросов. Подождите секунду и попробуйте снова.'
                                    : err instanceof Error ? err.message : 'Не удалось загрузить чаты',
                                isLoading: false,
                            }, false, 'chats/fetchError');
                        } finally {
                            pendingChatsFetch = null;
                        }
                    })();

                    return pendingChatsFetch;
                },
            }),
            {
                name: 'green-api-chats',
                version: 1,
                partialize: (state) => ({ chats: state.chats }),
                migrate: () => ({ chats: [] }),
            }
        ),
        { name: 'Chat' }
    )
);
