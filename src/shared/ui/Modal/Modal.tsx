import { classNames } from "@/shared/lib/classNames";
import cls from "./Modal.module.scss";
import {Portal} from "@/shared/ui";
import type {ReactNode} from "react";
import {type MouseEvent} from "react";

interface ModalProps {
    className?: string;
    children: ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

export const Modal = (props: ModalProps) => {
    const {className, children, isOpen, onClose} = props;

    const handleClick = () => {
        onClose()
    }

    const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
       e.stopPropagation()
    }

    if(!isOpen) return null

    return (
        <Portal>
            <div className={classNames(cls.Modal, {}, [className])} onClick={handleClick}>
                <div className={cls.overlay}></div>
                <div className={cls.content} onClick={handleContentClick}>
                    {children}
                </div>
            </div>
        </Portal>
    );
};
