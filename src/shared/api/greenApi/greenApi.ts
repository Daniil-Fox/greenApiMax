import axios from "axios";

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

export class GreenApi {
    private readonly baseUrl: string;
    private readonly token: string;

    constructor(creds: GreenApiCredentials) {
        this.baseUrl = `https://api.green-api.com/waInstance${creds.idInstance}`;
        this.token = creds.apiTokenInstance;
    }

    async getStateInstance(): Promise<GetStateInstanceResponse> {
        const response = await axios.get<GetStateInstanceResponse>(
            `${this.baseUrl}/getStateInstance/${this.token}`
        );

        return response.data;
    }

    async sendMessage(chatId: string, message: string): Promise<SendMessageResponse> {
        const body: SendMessagePayload = {
            chatId,
            message,
        };

        const response = await axios.post<SendMessageResponse>(
            `${this.baseUrl}/sendMessage/${this.token}`,
            body
        );

        return response.data;
    }

    async receiveNotification(): Promise<ReceiveNotificationResponse | null> {
        const response = await axios.get<ReceiveNotificationResponse | null>(
            `${this.baseUrl}/receiveNotification/${this.token}?receiveTimeout=10`
        );

        return response.data;
    }

    async deleteNotification(receiptId: number): Promise<DeleteNotificationResponse> {
        const response = await axios.delete<DeleteNotificationResponse>(
            `${this.baseUrl}/deleteNotification/${this.token}/${receiptId}`
        );

        return response.data;
    }
}