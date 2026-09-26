import { classNames } from "@/shared/lib/classNames";
import cls from "./SendMessageForm.module.scss";
import {Input, InputTheme} from "@/shared/ui/Input/Input";
import {useState} from "react";
import {Button} from "@/shared/ui/Button/Button";
import ArrowRight from '@/shared/assets/arrow-right.svg?react'
import {useSessionStore} from "@/entities/Session";
import {GreenApi} from "@/shared/api/greenApi/greenApi";
import {useMessageStore} from "@/entities/Message";

interface SendMessageFormProps {
    className?: string;
    chatId: string;
}

export const SendMessageForm = ({ className, chatId }: SendMessageFormProps) => {
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const credentials = useSessionStore((s) => s.credentials);
    const addMessage = useMessageStore((s) => s.addMessage)

    const handleTextChange = (value: string) => {
        setMessage(value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!credentials || !message.trim()) return

        setIsLoading(true)

        try {
            const greenApi = new GreenApi(credentials)
            const response = await greenApi.sendMessage(chatId, message)

            addMessage({
                id: response.idMessage,
                text: message,
                sender: 'outgoing',
                timestamp: Date.now()
            })

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
