import { classNames } from "@/shared/lib/classNames";
import cls from "./SidebarHeader.module.scss";
import {HStack} from "@/shared/ui/Stack";
import {Text} from "@/shared/ui";
import {TextSize} from "@/shared/ui/Text/Text";
import {CreateChat} from "@/features/createChat";

interface SidebarHeaderProps {
  className?: string;
}

export const SidebarHeader = ({ className }: SidebarHeaderProps) => {
  return (
    <HStack justify={'between'} align={"center"} className={classNames(cls.SidebarHeader, {}, [className])}>
        <Text title={'Чаты'} size={TextSize.M}/>

        <CreateChat className={cls.addChat}/>
    </HStack>
  );
};
