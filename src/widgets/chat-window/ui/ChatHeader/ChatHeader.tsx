import { classNames } from "@/shared/lib/classNames";
import cls from "./ChatHeader.module.scss";
import {HStack, VStack} from "@/shared/ui/Stack";
import {Avatar} from "@/shared/ui/Avatar/Avatar";
import {Text} from "@/shared/ui";
import {Button} from "@/shared/ui/Button/Button";
import {useNavigate} from "react-router-dom";
import ArrowRight from '@/shared/assets/arrow-right.svg?react'

interface ChatHeaderProps {
    className?: string;
    name: string;
}

export const ChatHeader = ({ className, name }: ChatHeaderProps) => {
    const navigate = useNavigate();

    const handleClickBack = () => {
        navigate('/')
    }

    return (
        <HStack justify={'between'} className={classNames(cls.ChatHeader, {}, [className])}>
            <HStack gap={'16'} align={'center'}>
                <Button square={true} className={cls.back} onClick={handleClickBack}>
                    <ArrowRight className={cls.icon}/>
                </Button>
                <HStack gap={'8'} align={'center'}>
                    <Avatar size={40}/>
                    <VStack gap={'4'}>
                        <Text text={name}/>
                    </VStack>
                </HStack>
            </HStack>
        </HStack>
    );
};
