import { classNames } from "@/shared/lib/classNames";
import cls from "./ChatWindow.module.scss";
import {MessagesList, useMessageStore, type Message} from "@/entities/Message";
import {SendMessageForm} from "@/features/sendMessage";
import {VStack} from "@/shared/ui/Stack";
import {ChatHeader} from "./../ChatHeader/ChatHeader";
import {useSearchParams} from "react-router-dom";
import {chatIdSearchParam} from "@/shared/routes/config/chatParams";
import {useChatStore} from "@/entities/Chat";
import {Text} from "@/shared/ui";


interface ChatWindowProps {
    className?: string;
}

const emptyMessages: Message[] = [];

export const ChatWindow = ({ className }: ChatWindowProps) => {
    const [searchParams] = useSearchParams();
    const chatId = searchParams.get(chatIdSearchParam);
    const messages = useMessageStore((state) => (
        chatId ? state.messages[chatId] ?? emptyMessages : emptyMessages
    ));
    const chat = useChatStore((state) => state.chats.find((item) => item.id === chatId));

    if (!chatId) {
        return (
            <VStack justify={'center'} align={'center'} className={classNames(cls.ChatWindow, {}, [className])}>
                <Text text={'Выберите чат'}/>
            </VStack>
        );
    }

    return (
        <VStack className={classNames(cls.ChatWindow, {}, [className])}>
            <ChatHeader className={cls.header} name={chat?.name || chatId}/>
            <MessagesList className={cls.messages} messages={messages}/>
            <SendMessageForm className={cls.sendForm} chatId={chatId}/>
        </VStack>
    );
};
