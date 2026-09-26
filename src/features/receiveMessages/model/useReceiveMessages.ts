import { useEffect } from 'react';
import {useSessionStore} from "@/entities/Session";
import {useMessageStore} from "@/entities/Message";
import {useChatStore} from "@/entities/Chat";
import {GreenApi} from "@/shared/api/greenApi/greenApi";
import type {IncomingMessageData, NotificationBody} from "@/shared/api/greenApi/types";
import type {MessageSender} from "@/entities/Message";

const getDirection = (typeWebhook: string): MessageSender | null => {
    if (typeWebhook === 'incomingMessageReceived') return 'incoming';
    if (typeWebhook === 'outgoingMessageReceived' || typeWebhook === 'outgoingAPIMessageReceived') {
        return 'outgoing';
    }

    return null;
};

const getText = (messageData?: IncomingMessageData): string | undefined => {
    if (messageData?.typeMessage === 'textMessage') {
        return messageData.textMessageData?.textMessage;
    }

    if (messageData?.typeMessage === 'extendedTextMessage') {
        return messageData.extendedTextMessageData?.text;
    }

    return undefined;
};

const saveTextMessage = (body: NotificationBody) => {
    const direction = getDirection(body.typeWebhook);
    const sender = body.senderData;
    const chatId = sender?.chatId;
    const text = getText(body.messageData);
    const messageId = body.idMessage;

    if (!direction || !chatId || !text || !messageId) return;

    const timestamp = body.timestamp ? body.timestamp * 1000 : Date.now();

    useMessageStore.getState().addMessage(chatId, {
        id: messageId,
        text,
        sender: direction,
        timestamp,
    });

    useChatStore.getState().upsertChat({
        id: chatId,
        name: sender?.chatName || sender?.senderName,
        type: sender?.chatType,
        phoneNumber: sender?.senderPhoneNumber,
        lastMessage: text,
        lastActivityAt: timestamp,
    });
};

export const useReceiveMessages = () => {
    const credentials = useSessionStore((state) => state.credentials);

    useEffect(() => {
        if (!credentials) return;

        const api = new GreenApi(credentials);
        const controller = new AbortController();
        let active = true;

        const pollNotifications = async () => {
            while (active) {
                try {
                    const notification = await api.receiveNotification(controller.signal);

                    if (!active || !notification?.body) continue;

                    saveTextMessage(notification.body);
                    await api.deleteNotification(notification.receiptId);
                } catch (error) {
                    if (!active) return;

                    console.error('Ошибка при получении/удалении уведомления:', error);
                    await new Promise((resolve) => setTimeout(resolve, 3000));
                }
            }
        };

        void pollNotifications();

        return () => {
            active = false;
            controller.abort();
        };
    }, [credentials]);
};
