const digitsOnly = (value: string): string => value.replace(/\D/g, '');

const formatRussia = (digits: string): string => {
    let normalized = digits;

    if (normalized.startsWith('8')) {
        normalized = `7${normalized.slice(1)}`;
    }

    if (normalized.startsWith('9')) {
        normalized = `7${normalized}`;
    }

    if (!normalized.startsWith('7')) {
        normalized = `7${normalized}`;
    }

    normalized = normalized.slice(0, 11);

    const code = normalized.slice(1, 4);
    const first = normalized.slice(4, 7);
    const second = normalized.slice(7, 9);
    const third = normalized.slice(9, 11);

    let result = '+7';

    if (code) result += ` (${code}`;
    if (normalized.length >= 4) result += ')';
    if (first) result += ` ${first}`;
    if (second) result += `-${second}`;
    if (third) result += `-${third}`;

    return result;
};

const formatBelarus = (digits: string): string => {
    const normalized = digits.slice(0, 12);

    if (normalized.length <= 3) return `+${normalized}`;

    const operator = normalized.slice(3, 5);
    const first = normalized.slice(5, 8);
    const second = normalized.slice(8, 10);
    const third = normalized.slice(10, 12);

    let result = `+375 (${operator}`;

    if (normalized.length >= 5) result += ')';
    if (first) result += ` ${first}`;
    if (second) result += `-${second}`;
    if (third) result += `-${third}`;

    return result;
};

const isBelarusPrefix = (digits: string): boolean => {
    return digits === '3' || digits === '37' || digits.startsWith('375');
};

export const formatPhone = (value: string): string => {
    const digits = digitsOnly(value);

    if (!digits) return '+7';
    if (isBelarusPrefix(digits)) return formatBelarus(digits);

    return formatRussia(digits);
};

export const phoneToApiNumber = (value: string): number | null => {
    const digits = digitsOnly(value);

    if (/^7\d{10}$/.test(digits) || /^375\d{9}$/.test(digits)) {
        return Number(digits);
    }

    return null;
};
