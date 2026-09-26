
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

export type GreenApiChatType = 'user' | 'group' | 'channel' | 'bot';

export interface SenderData {
    chatId: string;
    chatName?: string;
    chatType?: GreenApiChatType;
    sender?: string;
    senderName?: string;
    senderPhoneNumber?: number;
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

export interface GreenApiChat {
    chatId: string;
    name: string;
    type: GreenApiChatType;
    phoneNumber: number;
}

export interface CheckAccountSuccess {
    exist: boolean;
    chatId: string;
    fromCache: boolean;
}

export interface CheckAccountFailure {
    status: false;
    reason: string;
}

export type CheckAccountResponse = CheckAccountSuccess | CheckAccountFailure;

export interface ContactInfo {
    avatar?: string;
    name?: string;
    contactName?: string;
    chatId: string;
    chatType?: GreenApiChatType;
    phoneNumber?: number;
}

export interface GetAvatarResponse {
    urlAvatar: string;
}