export interface Time {
    minutes: number;
    seconds: number;
    milliseconds: number;
    totalSeconds: number;
    time: number;
}

export function createDefaultTime(): Time {
    return {
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
        totalSeconds: 0,
        time: 0,
    };
}

export function createNewTime(time: number): Time {
    const newTime = createDefaultTime();
    newTime.time = time;

    const milliseconds = time % 1000;
    time = (time - milliseconds) / 1000;
    const seconds = time % 60;
    time = (time - seconds) / 60;
    const minutes = time % 60;

    return {
        ...newTime,
        minutes,
        seconds,
        milliseconds,
        totalSeconds: minutes * 60 + seconds,
    };
}
