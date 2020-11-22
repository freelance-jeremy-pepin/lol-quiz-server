import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/randomNumber';

export default interface Quiz extends Model {
    name: string;
    internalName: string;
}

export function createDefaultQuiz(): Quiz {
    return {
        id: uniqueID(),
        name: '',
        internalName: '',
    };
}

export const quizList: Quiz[] = [
    {
        id: '1',
        name: `Find item's name`,
        internalName: 'item-name-quiz',
    },

    {
        id: '2',
        name: `Ultra secret quiz ... chut !`,
        internalName: 'an-ultra-secret-quiz',
    },
];
