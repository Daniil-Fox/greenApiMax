import { classNames } from "@/shared/lib/classNames";
import cls from "./LoginWindow.module.scss";
import {LoginForm} from "@/features/authByGreenApi";
import {Text} from "@/shared/ui";
import {TextSize} from "@/shared/ui/Text/Text";
import {VStack} from "@/shared/ui/Stack";

interface LoginWindowProps {
  className?: string;
}

export const LoginWindow = ({ className }: LoginWindowProps) => {
  return (
    <VStack gap={'16'} className={classNames(cls.LoginWindow, {}, [className])}>
        <Text title={'Авторизация'} size={TextSize.L} align={'center'}/>
        <LoginForm className={cls.form}/>
    </VStack>
  );
};
