import { classNames } from "@/shared/lib/classNames";
import cls from "./Sidebar.module.scss";
import { VStack } from "@/shared/ui/Stack";
import { SidebarHeader } from "@/widgets/Sidebar/ui/SidebarHeader/SidebarHeader";
import { ChatList, useChatStore } from "@/entities/Chat";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSessionStore } from "@/entities/Session";
import { Text } from "@/shared/ui";
import { Button } from "@/shared/ui/Button/Button";
import { chatIdSearchParam, getChatLocation } from "@/shared/routes/config/chatParams";

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  const chats = useChatStore((state) => state.chats);
  const fetchChats = useChatStore((state) => state.fetchChats);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const credentials = useSessionStore((state) => state.credentials);
  const [searchParams] = useSearchParams();
  const activeChatId = searchParams.get(chatIdSearchParam);

  useEffect(() => {
    if (!credentials) return;
    fetchChats(credentials);
  }, [credentials, fetchChats]);

  return (
    <VStack className={classNames(cls.Sidebar, {}, [className])}>
      <SidebarHeader />
      {isLoading && <Text text="Загрузка чатов..." />}
      {error && (
        <>
          <Text text="Ошибка при загрузке чатов" />
          <Button onClick={() => fetchChats(credentials!)}>
            Попробовать снова
          </Button>
        </>
      )}

      {chats.length > 0 && (
        <ChatList
          className={cls.chats}
          chats={chats}
          activeChatId={activeChatId}
          getChatTo={getChatLocation}
        />
      )}
    </VStack>
  );
};
