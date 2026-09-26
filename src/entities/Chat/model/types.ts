import type { GreenApiChatType } from '@/shared/api/greenApi/types';

export interface Chat {
    id: string;
    name: string;
    type: GreenApiChatType;
    phoneNumber: number;
    lastMessage?: string;
    lastActivityAt?: number;
    avatar?: string;
}

export interface UpsertChatInput {
    id: string;
    name?: string;
    type?: GreenApiChatType;
    phoneNumber?: number;
    lastMessage?: string;
    lastActivityAt?: number;
    avatar?: string;
}
