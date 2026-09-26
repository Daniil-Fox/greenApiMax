import { classNames } from "@/shared/lib/classNames";
import cls from "./MessagesList.module.scss";
import {VStack} from "@/shared/ui/Stack";
import type {Message} from "./../../model/types";
import {MessageBubble} from "./../MessageBubble/MessageBubble";
import {useLayoutEffect, useRef} from "react";

interface MessagesListProps {
  className?: string;
  messages: Message[];
}

export const MessagesList = (props: MessagesListProps) => {
  const {className, messages} = props;
  const listRef = useRef<HTMLDivElement>(null);
  const lastMessageId = messages[messages.length - 1]?.id;

  useLayoutEffect(() => {
    const node = listRef.current;
    if (!node) return;

    node.scrollTop = node.scrollHeight;
  }, [messages.length, lastMessageId]);

  return (
    <div ref={listRef} className={classNames(cls.MessagesList, {}, [className])}>
      <VStack gap={'8'}>
        {messages.map((msg: Message) => (
            <MessageBubble key={msg.id} message={msg}/>
        ))}
      </VStack>
    </div>
  );
};
