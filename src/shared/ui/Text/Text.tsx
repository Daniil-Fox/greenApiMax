import { classNames } from "./../../lib/classNames";
import cls from "./Text.module.scss";

export enum TextSize {
  'S' = 'size_s',
  'M' = 'size_m',
  'L' = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type TextAlign = 'left' | 'center' | 'right' | 'justify';

interface TextProps {
    className?: string;
    text?: string;
    title?: string;
    size?: TextSize;
    align?: TextAlign;
}

const mapTagsForSize: Record<TextSize, HeaderTagType> = {
   [TextSize.S]: 'h3',
   [TextSize.M]: 'h2',
   [TextSize.L]: 'h1',
}

export const Text = (props: TextProps) => {
    const { title, text, className, size = TextSize.S, align = 'left' } = props

    const HeaderTag = mapTagsForSize[size];

    return (
        <div className={classNames(cls.Text, {}, [className, cls[align]])}>
            { title && <HeaderTag>{title}</HeaderTag> }
            { text && <p>{text}</p>}
        </div>
    );
};
