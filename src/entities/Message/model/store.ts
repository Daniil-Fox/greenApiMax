import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Message } from './types';

interface MessageState {
    messages: Record<string, Message[]>;
    addMessage: (chatId: string, message: Message) => void;
    clearMessages: () => void;
}

export const useMessageStore = create<MessageState>()(
    devtools(
        persist(
            (set) => ({
                messages: {},
                addMessage: (chatId, newMessage) => {
                    set((state) => {
                        const currentChatMessages = state.messages[chatId] || [];

                        const isDuplicate = currentChatMessages.some(
                            (message) => message.id === newMessage.id
                        );

                        if (isDuplicate) return state;

                        return {
                            messages: {
                                ...state.messages,
                                [chatId]: [...currentChatMessages, newMessage],
                            },
                        };
                    }, false, 'messages/addMessage');
                },

                clearMessages: () => set({ messages: {} }, false, 'messages/clearMessages'),
            }),
            {
                name: 'green-api-messages-history',
            }
        ),
        { name: 'Message' }
    )
);