export type Mods = Record<string, boolean | undefined>

export const classNames = (baseClassName: string, mods: Mods, additionClasses: (string | undefined)[]): string => {
    return [
        baseClassName,
        ...additionClasses,
        ...Object.entries(mods)
            .filter(([_, value]) => Boolean(value))
            .map(([className, _]) => className)
    ].join(' ')
}