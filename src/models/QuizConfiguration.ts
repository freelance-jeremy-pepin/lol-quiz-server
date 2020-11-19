import ItemLolApi from 'src/models/LolApi/ItemLolApi';
import Model from 'src/models/Model';
import Quiz, { createDefaultQuiz } from 'src/models/Quiz';

export default interface QuizConfiguration extends Model {
    quiz: Quiz;
    numberQuestions: number;
    withStopWatch: boolean;
    items: ItemLolApi[];
}

export function createDefaultQuizConfiguration(): QuizConfiguration {
    return {
        id: '',
        quiz: createDefaultQuiz(),
        numberQuestions: 0,
        withStopWatch: false,
        items: [],
    };
}
