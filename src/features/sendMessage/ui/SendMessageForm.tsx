import { classNames } from "@/shared/lib/classNames";
import cls from "./SendMessageForm.module.scss";
import {Input, InputTheme} from "@/shared/ui/Input/Input";
import {useState, type FormEvent} from "react";
import {Button} from "@/shared/ui/Button/Button";
import ArrowRight from '@/shared/assets/arrow-right.svg?react'
import {useSessionStore} from "@/entities/Session";
import {GreenApi} from "@/shared/api/greenApi/greenApi";
import {useMessageStore} from "@/entities/Message";
import {useChatStore} from "@/entities/Chat";

interface SendMessageFormProps {
    className?: string;
    chatId: string;
}

export const SendMessageForm = ({ className, chatId }: SendMessageFormProps) => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const credentials = useSessionStore((s) => s.credentials);
    const addMessage = useMessageStore((s) => s.addMessage);
    const upsertChat = useChatStore((s) => s.upsertChat);

    const handleTextChange = (value: string) => {
        setMessage(value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = message.trim();
        if(!credentials || !text) return

        setIsLoading(true)

        try {
            const greenApi = new GreenApi(credentials)
            const response = await greenApi.sendMessage(chatId, text)

            addMessage(chatId, {
                id: response.idMessage,
                text,
                sender: 'outgoing',
                timestamp: Date.now()
            })
            upsertChat({ id: chatId, lastMessage: text, lastActivityAt: Date.now() })
            setMessage('')

        } catch (err) {
            console.error('Ошибка при отправке сообщения:', err);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={classNames(cls.SendMessageForm, {}, [className])}>
            <Input
                value={message}
                onChange={handleTextChange}
                disabled={isLoading}
                placeholder={'Текст сообщения...'}
                theme={InputTheme.DEFAULT}
                className={cls.input}
            />
            <Button square={true} className={cls.btn} disabled={isLoading} type={'submit'}>
                <ArrowRight className={cls.icon}/>
            </Button>
        </form>
    );
};
