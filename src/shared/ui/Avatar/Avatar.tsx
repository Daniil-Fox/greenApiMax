import { classNames } from "@/shared/lib/classNames";
import cls from "./Avatar.module.scss";

interface AvatarProps {
    className?: string;
    size: string | number;
    src?: string;
    circle?: boolean
}

export const Avatar = (props: AvatarProps) => {
    const { className, size, src, circle = true } = props

    return (
        <div className={classNames(cls.Avatar, {[cls.circle]: circle}, [className])} style={{width: size, height: size}}>
            {src && <img src={src} alt={'user avatar'}/>}
        </div>
    );
};
