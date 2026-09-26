import {classNames, type Mods} from "@/shared/lib/classNames";
import cls from "./Button.module.scss";
import {type ButtonHTMLAttributes} from "react";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    disabled?: boolean;
    square?: boolean;
}

export const Button = (props: ButtonProps) => {
    const {className, children, disabled, square, ...otherProps} = props

    const mods: Mods = {
        [cls.disabled]: disabled,
        [cls.square]: square
    }

    return (
        <button {...otherProps} disabled={disabled} className={classNames(cls.Button, mods, [className])}>
            {children}
        </button>
    );
};
