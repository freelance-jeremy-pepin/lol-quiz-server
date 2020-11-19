import Model from 'src/models/Model';

export default interface Quiz extends Model {
    name: string;
    internalName: string;
}

export function createDefaultQuiz(): Quiz {
    return {
        id: '',
        name: '',
        internalName: '',
    };
}

export const quizList: Quiz[] = [
    {
        id: '1',
        name: 'Name quiz',
        internalName: 'name-quiz',
    },
];
