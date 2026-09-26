import { classNames } from "@/shared/lib/classNames";
import cls from "./Flex.module.scss";
import type {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";


type FlexAlign = 'start' | 'center' | 'end' | 'stretch';
type FlexJustify = 'start' | 'center' | 'end' | 'between' | 'evenly' | 'around';
type FlexGap = '4' | '8' | '16' | '32' | '64'
type FlexDirection = 'row' | 'column'

const alignMapping: Record<FlexAlign, string> = {
    'start': cls.alignStart,
    'center': cls.alignCenter,
    'end': cls.alignEnd,
    'stretch': cls.stretch,
}

const justifyMapping: Record<FlexJustify, string> = {
    'start': cls.justifyStart,
    'center': cls.justifyCenter,
    'end': cls.justifyEnd,
    'between': cls.justifyBetween,
    'evenly': cls.justifyEvenly,
    'around': cls.justifyAround,
}

const gapMapping: Record<FlexGap, string> = {
    '4': cls.gap4,
    '8': cls.gap8,
    '16': cls.gap16,
    '32': cls.gap32,
    '64': cls.gap64,
}

const directionMapping: Record<FlexDirection, string> = {
    'row': cls.row,
    'column': cls.column,
}

type DivType = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>

export interface FlexProps extends DivType {
    className?: string;
    align?: FlexAlign;
    justify?: FlexJustify;
    gap?: FlexGap;
    children: ReactNode;
    direction?: FlexDirection
}

export const Flex = (props: FlexProps) => {
    const { className, children, align = 'stretch', justify = 'start', gap = '4', direction = 'row' } = props
    const gapClass = gapMapping[gap]
    const alignClass = alignMapping[align]
    const justifyClass = justifyMapping[justify]
    const directionClass = directionMapping[direction]

    const classNamesAdd = [className, justifyClass, alignClass, gapClass, directionClass]

    return (
        <div className={classNames(cls.Flex, {}, classNamesAdd)}>
            {children}
        </div>
    );
};
