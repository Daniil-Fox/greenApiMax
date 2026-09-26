import {useState, type FormEvent} from "react";
import {useNavigate} from "react-router-dom";
import cls from "./CreateChat.module.scss";
import {Modal, Text} from "@/shared/ui";
import {TextSize} from "@/shared/ui/Text/Text";
import {Input} from "@/shared/ui/Input/Input";
import {Button} from "@/shared/ui/Button/Button";
import {VStack} from "@/shared/ui/Stack";
import {useSessionStore} from "@/entities/Session";
import {useChatStore} from "@/entities/Chat";
import {GreenApi} from "@/shared/api/greenApi/greenApi";
import {getChatLocation} from "@/shared/routes/config/chatParams";
import {formatPhone, phoneToApiNumber} from "../../model/phoneMask";

interface CreateChatProps {
    className?: string;
}

export const CreateChat = ({ className }: CreateChatProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [phone, setPhone] = useState('+7');
    const [isLoading, setIsLoading] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const credentials = useSessionStore((state) => state.credentials);
    const upsertChat = useChatStore((state) => state.upsertChat);
    const navigate = useNavigate();
    const phoneNumber = phoneToApiNumber(phone);

    const reset = () => {
        setPhone('+7');
        setNotFound(false);
        setError(null);
        setIsLoading(false);
    };

    const close = () => {
        setIsOpen(false);
        reset();
    };

    const handlePhoneChange = (value: string) => {
        setPhone(formatPhone(value));
        setNotFound(false);
        setError(null);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!credentials || !phoneNumber) return;

        setIsLoading(true);
        setNotFound(false);
        setError(null);

        try {
            const api = new GreenApi(credentials);
            const result = await api.checkAccount(phoneNumber);

            if ('status' in result && result.status === false) {
                setError('Не удалось проверить номер. Попробуйте позже.');
                return;
            }

            if (!('exist' in result) || !result.exist || !result.chatId) {
                setNotFound(true);
                return;
            }

            let name = phone;
            let avatar: string | undefined;

            try {
                const contact = await api.getContactInfo(result.chatId);
                name = contact.name || contact.contactName || phone;
                avatar = contact.avatar || undefined;
            } catch (contactError) {
                console.error('Не удалось получить имя контакта:', contactError);
            }

            upsertChat({
                id: result.chatId,
                name,
                type: 'user',
                phoneNumber,
                avatar,
            });
            navigate(getChatLocation(result.chatId));
            close();
        } catch (err) {
            console.error('Ошибка CheckAccount:', err);
            setError('Не удалось проверить номер. Попробуйте позже.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button type="button" className={className} onClick={() => setIsOpen(true)}>
                +
            </Button>
            <Modal isOpen={isOpen} onClose={close}>
                <form className={cls.form} onSubmit={handleSubmit}>
                    <VStack gap={'16'}>
                        <Text title={'Новый чат'} size={TextSize.M}/>
                        <Input
                            value={phone}
                            onChange={handlePhoneChange}
                            label={'Номер телефона'}
                            placeholder={'+7 (___) ___-__-__'}
                            inputMode={'tel'}
                            disabled={isLoading}
                        />
                        {notFound && <Text text={'Пользователь не найден по данному номеру'}/>}
                        {error && <Text text={error}/>}
                        <Button className={cls.submit} type={'submit'} disabled={isLoading || !phoneNumber}>
                            {isLoading ? 'Поиск...' : 'Найти'}
                        </Button>
                    </VStack>
                </form>
            </Modal>
        </>
    );
};
