import Player from 'src/models/Player';
import Model from 'src/models/Model';
import QuizConfiguration, { createDefaultQuizConfiguration } from 'src/models/QuizConfiguration';
import { uniqueID } from 'src/utils/randomNumber';

export default interface Room extends Model {
    name: string;
    quizConfiguration: QuizConfiguration;
    ownerId: string; // Id d'un User.
    players: Player[];
    inGame: boolean;
}

export function createDefaultRoom(): Room {
    return {
        id: uniqueID(),
        quizConfiguration: createDefaultQuizConfiguration(),
        name: '',
        ownerId: '',
        players: [],
        inGame: false,
    };
}
