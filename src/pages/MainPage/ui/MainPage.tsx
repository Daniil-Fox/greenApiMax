
import cls from "./MainPage.module.scss";
import {classNames} from "@/shared/lib/classNames";
import {LoginWindow} from "@/widgets/login-window/ui/LoginWindow";
import {useSessionStore} from "@/entities/Session";
import {HStack, VStack} from "@/shared/ui/Stack";
import {MessagesList} from "@/entities/Message";

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
            <MessagesList messages={
                [
                    {
                        id: '1',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '2',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '3',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "incoming",
                        timestamp: 1790422640691,
                    },
                    {
                        id: '4',
                        text: 'Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1Text of message 1',
                        sender: "outgoing",
                        timestamp: 1790422640691,
                    },
                ]
            }/>

        </div>
    );
};
