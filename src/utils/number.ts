export function randomNumber(min: number, max: number): number {
    // eslint-disable-next-line @typescript-eslint/no-var-requires,global-require
    const randomNumberJs = require('@aspiesoft/random-number-js');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return parseInt(randomNumberJs(min, max), 10);
}

export function uniqueID(): string {
    return Math.random().toString(36).substr(2, 9);
}

export function stringToInt(value: string): number {
    const parsed = parseInt(value, 10);

    if (Number.isNaN(parsed)) {
        return 0;
    }

    return parsed;
}
