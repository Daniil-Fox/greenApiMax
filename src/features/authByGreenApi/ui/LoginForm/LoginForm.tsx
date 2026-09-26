import { classNames } from "@/shared/lib/classNames";
import cls from "./LoginForm.module.scss";
import {Input} from "@/shared/ui/Input/Input";
import {useState, type FormEvent} from "react";
import {VStack} from "@/shared/ui/Stack";
import {Button} from "@/shared/ui/Button/Button";
import {useSessionStore} from "@/entities/Session";
import {Text} from "@/shared/ui";

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const [idInstance, setIdInstance] = useState<string>("");
    const [apiTokenInstance, setApiTokenInstance] = useState<string>("");

    const login = useSessionStore((state) => state.login);
    const isLoading = useSessionStore((state) => state.isLoading);
    const error = useSessionStore((state) => state.error);

    const handleIdInputChange = (value: string) => {
        setIdInstance(value)
    }

    const handleApiInstanceInputChange = (value: string) => {
        setApiTokenInstance(value)
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!idInstance.trim() || !apiTokenInstance.trim()) return;
        await login(idInstance, apiTokenInstance)
    }

    return (
        <form onSubmit={handleSubmit} className={classNames(cls.LoginForm, {[cls.loading]: isLoading}, [className])}>
            <VStack  gap={'8'}>
                {error && <Text text={error}/>}
                <Input
                    value={idInstance}
                    onChange={handleIdInputChange}
                    placeholder={'Введите ID Instance'}
                    name={'idInstance'}
                    disabled={isLoading}
                />
                <Input
                    value={apiTokenInstance}
                    onChange={handleApiInstanceInputChange}
                    placeholder={'Введите Api Token Instance'}
                    name={'apiTokenInstance'}
                    disabled={isLoading}
                />
                <Button disabled={isLoading} type="submit">
                    {isLoading ? "Проверка..." : "Войти"}
                </Button>
            </VStack>
        </form>
    );
};
