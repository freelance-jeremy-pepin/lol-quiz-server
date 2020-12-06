import Model from 'src/models/Model';
import Player from 'src/models/Player';
import QuizConfiguration, { createDefaultQuizConfiguration } from 'src/models/QuizConfiguration';
import { uniqueID } from 'src/utils/number';

export default interface Room extends Model {
    name: string;
    quizConfiguration: QuizConfiguration;
    ownerId: string; // ID d'un User.
    players: Player[];
    inGame: boolean;
    nextRoomId?: string;
    expiresAt: Date;
}

export function createDefaultRoom(): Room {
    return {
        id: uniqueID(),
        quizConfiguration: createDefaultQuizConfiguration(),
        name: '',
        ownerId: '',
        players: [],
        inGame: false,
        expiresAt: new Date(new Date().getTime() + 1 * 60000),
    };
}
