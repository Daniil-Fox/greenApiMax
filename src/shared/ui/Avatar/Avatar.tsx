import { classNames } from "@/shared/lib/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    size: string | number;
    circle?: boolean
}

export const Avatar = (props: AvatarProps) => {
    const { className, size, circle = true } = props

    return (
        <div className={classNames(cls.Avatar, {[cls.circle]: circle}, [className])} style={{width: size, height: size}}/>
    );
};
