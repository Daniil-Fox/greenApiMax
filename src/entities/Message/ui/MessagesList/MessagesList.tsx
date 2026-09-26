import { classNames } from "@/shared/lib/classNames";
import cls from "./MessagesList.module.scss";
import {VStack} from "@/shared/ui/Stack";
import type {Message} from "./../../model/types";
import {MessageBubble} from "./../MessageBubble/MessageBubble";

interface MessagesListProps {
  className?: string;
  messages: Message[];
}

export const MessagesList = (props: MessagesListProps) => {
  const {className, messages} = props;

  return (
    <VStack gap={'8'} className={classNames(cls.MessagesList, {}, [className])}>
      {messages.map((msg: Message) => (
          <MessageBubble key={msg.id} message={msg}/>
      ))}
    </VStack>
  );
};
