export type MessageSender = 'incoming' | 'outgoing';

export interface Message {
    id: string;
    text: string;
    sender: MessageSender;
    timestamp: number;
}