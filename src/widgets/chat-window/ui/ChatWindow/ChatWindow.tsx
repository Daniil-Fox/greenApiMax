import { classNames } from "@/shared/lib/classNames";
import cls from "./ChatWindow.module.scss";
import {MessagesList} from "@/entities/Message";
import {SendMessageForm} from "@/features/sendMessage";
import {VStack} from "@/shared/ui/Stack";
import {ChatHeader} from "./../ChatHeader/ChatHeader";


interface ChatWindowProps {
    className?: string;
}

export const ChatWindow = ({ className }: ChatWindowProps) => {
    return (
        <VStack className={classNames(cls.ChatWindow, {}, [className])}>
            <ChatHeader className={cls.header}/>
            <MessagesList className={cls.messages} messages={
                [
                    {
                        id: '1',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '2',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '3',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '4',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "outgoing",
                        timestamp: 1790422640691,
                    },
                ]
            }
            />
            <SendMessageForm className={cls.sendForm} chatId={'123'}/>
        </VStack>
    );
};
