import { classNames } from "@/shared/lib/classNames";
import cls from "./Input.module.scss";
import type {ChangeEvent} from "react";

export enum InputTheme {
    DEFAULT = 'input_default',
    LIGHT = 'input_light',
}

interface InputProps {
    className?: string;
    name?: string;
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    label?: string;
    theme?: InputTheme;
    disabled?: boolean;
    inputMode?: 'tel' | 'text' | 'numeric';
}

export const Input = (props: InputProps) => {
    const {className, name, placeholder, value, onChange, label, disabled, inputMode, theme = InputTheme.LIGHT} = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value)
    }

    if(theme === InputTheme.DEFAULT){
        return (
            <input name={name} inputMode={inputMode} disabled={disabled} placeholder={placeholder} value={value} className={classNames(cls.input, {[cls.disabled]: disabled}, [className, cls[theme]])} onChange={handleChange}/>
        )
    }

    return (
        <div className={classNames(cls.inputWrapper, {}, [className])}>
            {label && <span className={cls.label}>{label}</span>}
            <input name={name} inputMode={inputMode} disabled={disabled} placeholder={placeholder} value={value} className={classNames(cls.input, {[cls.disabled]: disabled}, [cls[theme]])} onChange={handleChange}/>
        </div>
    );
};
