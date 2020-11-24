import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/randomNumber';

export default interface Quiz extends Model {
    name: string;
    internalName: QuizListInternalName | '';
}

export function createDefaultQuiz(): Quiz {
    return {
        id: uniqueID(),
        name: '',
        internalName: '',
    };
}

export enum QuizListInternalName {
    ItemNameQuiz = 'item-name-quiz',
    AnUltraSecretQuiz = 'an-ultra-secret-quiz',
}

export const quizList: Quiz[] = [
    {
        id: '1',
        name: `Find item's name`,
        internalName: QuizListInternalName.ItemNameQuiz,
    },

    {
        id: '2',
        name: `Ultra secret quiz ... chut !`,
        internalName: QuizListInternalName.AnUltraSecretQuiz,
    },
];
