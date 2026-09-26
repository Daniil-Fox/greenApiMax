import axios from "axios";
import type {
    CheckAccountResponse,
    ContactInfo,
    DeleteNotificationResponse,
    GetStateInstanceResponse, GreenApiChat,
    GreenApiCredentials, ReceiveNotificationResponse,
    SendMessagePayload,
    SendMessageResponse
} from "./types";

const readNotification = (data: unknown): ReceiveNotificationResponse | null => {
    let payload = data;

    if (typeof payload === 'string' && payload.trim()) {
        try {
            payload = JSON.parse(payload);
        } catch {
            return null;
        }
    }

    if (!payload || typeof payload !== 'object' || !('body' in payload) || !('receiptId' in payload)) {
        return null;
    }

    return payload as ReceiveNotificationResponse;
};

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

    async receiveNotification(signal?: AbortSignal): Promise<ReceiveNotificationResponse | null> {
        const receiveTimeout = 5;
        const startedAt = Date.now();

        const emptyResult = async (): Promise<null> => {
            const elapsed = Date.now() - startedAt;
            if (elapsed < 1000) {
                await new Promise((resolve) => setTimeout(resolve, 1000 - elapsed));
            }
            return null;
        };

        try {
            const response = await axios.get<ReceiveNotificationResponse | string | null>(
                `${this.baseUrl}/receiveNotification/${this.token}`,
                {
                    params: { receiveTimeout },
                    signal,
                    timeout: receiveTimeout * 1000 + 5_000,
                    validateStatus: (status) => status === 200 || status === 408,
                }
            );

            const notification = readNotification(response.data);
            if (notification) return notification;

            return emptyResult();
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 408) {
                const notification = readNotification(error.response.data);
                if (notification) return notification;
                return emptyResult();
            }

            if (axios.isAxiosError(error) && (error.code === 'ERR_CANCELED' || error.code === 'ECONNABORTED')) {
                return emptyResult();
            }

            throw error;
        }
    }

    async deleteNotification(receiptId: number): Promise<DeleteNotificationResponse> {
        const response = await axios.delete<DeleteNotificationResponse>(
            `${this.baseUrl}/deleteNotification/${this.token}/${receiptId}`
        );

        return response.data;
    }

    async checkAccount(phoneNumber: number): Promise<CheckAccountResponse> {
        const response = await axios.post<CheckAccountResponse>(
            `${this.baseUrl}/checkAccount/${this.token}`,
            { phoneNumber }
        );

        return response.data;
    }

    async getContactInfo(chatId: string): Promise<ContactInfo> {
        const response = await axios.post<ContactInfo>(
            `${this.baseUrl}/getContactInfo/${this.token}`,
            { chatId }
        );

        return response.data;
    }

    async getChats(): Promise<GreenApiChat[]> {
        const response = await axios.get<GreenApiChat[]>(
            `${this.baseUrl}/getChats/${this.token}`
        );

        if (!Array.isArray(response.data)) {
            throw new Error('Некорректный ответ GetChats');
        }

        return response.data;
    }
}