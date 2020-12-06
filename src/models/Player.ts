import Model from 'src/models/Model';
import PlayerAnswerHistory from 'src/models/PlayerAnswerHistory';
import { createDefaultTime, Time } from 'src/models/Time';
import { uniqueID } from 'src/utils/number';

export default interface Player extends Model {
    userId: string;
    score: number;
    currentQuestionNumber: number;
    hasFinished: boolean;
    answersHistory: PlayerAnswerHistory[];
    completeTime: Time;
    isReady: boolean;
    hasQuitRoom: boolean;
}

export function createDefaultPlayer(): Player {
    return {
        id: uniqueID(),
        userId: '',
        score: 0,
        currentQuestionNumber: 0,
        hasFinished: false,
        answersHistory: [],
        completeTime: createDefaultTime(),
        isReady: false,
        hasQuitRoom: false,
    };
}
