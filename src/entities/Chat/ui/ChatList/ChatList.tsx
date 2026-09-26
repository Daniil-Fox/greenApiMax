import { classNames } from "@/shared/lib/classNames";
import cls from "./ChatList.module.scss";
import type {Chat} from "@/entities/Chat/model/types";
import {ChatItem} from "./../ChatItem/ChatItem";
import type {To} from "react-router-dom";

interface ChatListProps {
  className?: string;
  chats: Chat[];
  activeChatId?: string | null;
  getChatTo: (chatId: string) => To;
}

export const ChatList = (props: ChatListProps) => {
  const { className, chats, activeChatId, getChatTo } = props;
  return (
    <div className={classNames(cls.ChatList, {}, [className])}>
      {chats.map((chat) => (
          <ChatItem
              key={chat.id}
              chat={chat}
              to={getChatTo(chat.id)}
              isActive={chat.id === activeChatId}
          />
      ))}
    </div>
  );
};
