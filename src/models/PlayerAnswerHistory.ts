import Model from 'src/models/Model';
import PlayerAnswer from 'src/models/PlayerAnswer';
import { createDefaultTime, Time } from 'src/models/Time';
import { uniqueID } from 'src/utils/number';

export default interface PlayerAnswerHistory extends Model {
    found: boolean;
    skipped: boolean;
    score: number;
    totalScore: number;
    startDate: Date; // Date à laquelle le joueur a commencé à répondre à la question.
    endDate: Date; // Date à laquelle le joueur ne peux plus répondre à la question.
    timeElapsed?: Time;
    answers: PlayerAnswer[];
}

export function createDefaultPlayerAnswerHistory(): PlayerAnswerHistory {
    return {
        id: uniqueID(),
        found: false,
        skipped: false,
        score: 0,
        totalScore: 0,
        startDate: new Date(),
        endDate: new Date(),
        timeElapsed: createDefaultTime(),
        answers: [],
    };
}
