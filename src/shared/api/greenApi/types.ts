
export interface GreenApiCredentials {
    idInstance: string;
    apiTokenInstance: string;
}

export interface SendMessagePayload {
    chatId: string;
    message: string;
    quotedMessageId?: string;
}

export interface SendMessageResponse {
    idMessage: string;
}

export interface TextMessageData {
    textMessage: string;
}

export interface IncomingMessageData {
    typeMessage: "textMessage" | "extendedTextMessage" | string;
    textMessageData?: TextMessageData;
    extendedTextMessageData?: {
        text: string;
    };
}

export interface SenderData {
    chatId: string;
    sender?: string;
    senderName?: string;
}

export interface NotificationBody {
    typeWebhook: string;
    instanceData: {
        idInstance: number;
        wid: string;
        typeInstance: string;
    };
    timestamp: number;
    idMessage: string;
    senderData?: SenderData;
    messageData?: IncomingMessageData;
}

export interface ReceiveNotificationResponse {
    receiptId: number;
    body: NotificationBody;
}

export interface DeleteNotificationResponse {
    result: boolean;
}

export interface GetStateInstanceResponse {
    stateInstance: 'authorized' | 'notAuthorized' | 'blocked' | 'starting';
}