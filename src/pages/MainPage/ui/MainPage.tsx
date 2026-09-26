
import cls from "./MainPage.module.scss";
import {classNames} from "@/shared/lib/classNames";
import {LoginWindow} from "@/widgets/login-window/ui/LoginWindow";
import {useSessionStore} from "@/entities/Session";
import {HStack, VStack} from "@/shared/ui/Stack";
import {ChatWindow} from "@/widgets/chat-window";

interface MainPageProps {
    className?: string;
}

export const MainPage = ({ className }: MainPageProps) => {
    const {credentials} = useSessionStore(state => state)

    if(!credentials){
        return (
            <VStack justify={'center'} className={classNames(cls.MainPage, {}, [className, cls.fullheight])}>
                <HStack justify={'center'}>
                    <LoginWindow className={cls.loginWindow}/>
                </HStack>
            </VStack>
        )
    }

    return (
        <div className={classNames(cls.MainPage, {}, [className])}>
            <ChatWindow/>
        </div>
    );
};
