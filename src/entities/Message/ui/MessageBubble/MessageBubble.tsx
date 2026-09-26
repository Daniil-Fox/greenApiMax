import { classNames } from "@/shared/lib/classNames";
import cls from "./MessageBubble.module.scss";
import type {Message} from "./../../model/types";
import {Text} from "@/shared/ui";

interface MessageBubbleProps {
    className?: string;
    message: Message;
}

export const MessageBubble = (props: MessageBubbleProps) => {
    const { className, message } = props
    const msgFrom = message.sender

    return (
        <div className={classNames(cls.MessageBubble, {}, [className, cls[msgFrom]])}>
            <Text text={message.text}/>

            {
                message.timestamp && (
                    <time className={cls.time}>{message.timestamp}</time>
                )
            }
        </div>
    );
};
