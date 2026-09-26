import { classNames } from "@/shared/lib/classNames";
import cls from "./ChatItem.module.scss";
import type {Chat} from "@/entities/Chat/model/types";
import {Text} from "@/shared/ui";
import {HStack, VStack} from "@/shared/ui/Stack";
import {Avatar} from "@/shared/ui/Avatar/Avatar";
import {NavLink, type To} from "react-router-dom";

interface ChatItemProps {
    className?: string;
    chat: Chat;
    to: To;
    isActive?: boolean;
}

export const ChatItem = (props: ChatItemProps) => {
    const { className, chat, to, isActive = false } = props;

    return (
        <NavLink
            to={to}
            className={() => classNames(cls.ChatItem, { [cls.active]: isActive }, [className])}
            aria-current={isActive ? 'page' : false}
        >
            <HStack gap={'16'} align={'center'}>
                <Avatar size={48} src={chat.avatar || undefined}/>
                <VStack gap={'4'} className={cls.info}>
                    <Text text={chat.name}/>
                    {chat.lastMessage && <Text text={chat.lastMessage} className={cls.lastMessage}/>}
                </VStack>
            </HStack>
        </NavLink>
    );
};
