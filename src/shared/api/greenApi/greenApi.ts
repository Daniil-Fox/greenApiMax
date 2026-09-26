import axios from "axios";
import type {
    DeleteNotificationResponse,
    GetStateInstanceResponse,
    GreenApiCredentials, ReceiveNotificationResponse,
    SendMessagePayload,
    SendMessageResponse
} from "./types";


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