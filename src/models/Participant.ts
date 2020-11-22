import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/randomNumber';
import { createDefaultTime, Time } from 'src/models/Time';
import AnswerHistoryItem from 'src/models/AnswerHistoryItem';

export default interface Participant extends Model {
    userId: string;
    score: number;
    currentQuestionNumber: number;
    hasFinished: boolean;
    answersHistoryItem: AnswerHistoryItem[];
    completeTime: Time;
    isReady: boolean;
}

export function createDefaultParticipant(): Participant {
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
