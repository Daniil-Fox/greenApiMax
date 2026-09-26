declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.svg?react' {
    import type {FC, SVGProps} from 'react';
    const ReactComponent: FC<SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}