import {create} from "zustand/react";
import type {Message} from "./types";

interface MessageState {
    messages: Message[];
    addMessage: (message: Message) => void;
    clearMessages: () => void;
}

export const useMessageStore = create<MessageState>()((set) => ({
    messages: [],
    addMessage: (newMessage) => {
        set((state) => {
            const isDuplicate = state.messages.some(message => message.id === newMessage.id);
            if(isDuplicate) return state

            return {
                messages: [...state.messages, newMessage],
            }
        })
    },
    clearMessages: () => set({ messages: [] }),
}))