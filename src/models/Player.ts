import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/randomNumber';
import { createDefaultTime, Time } from 'src/models/Time';
import AnswerHistoryItem from 'src/models/AnswerHistoryItem';

export default interface Player extends Model {
    userId: string;
    score: number;
    currentQuestionNumber: number;
    hasFinished: boolean;
    answersHistoryItem: AnswerHistoryItem[]; // TODO: à remplace par AnswerHistory[]
    completeTime: Time;
    isReady: boolean;
}

export function createDefaultPlayer(): Player {
    return {
        id: uniqueID(),
        userId: '',
        score: 0,
        currentQuestionNumber: 0,
        hasFinished: false,
        answersHistoryItem: [],
        completeTime: createDefaultTime(),
        isReady: false,
    };
}
