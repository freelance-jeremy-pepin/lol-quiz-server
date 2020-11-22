import Model from 'src/models/Model';
import Quiz, { createDefaultQuiz } from 'src/models/Quiz';
import { uniqueID } from 'src/utils/randomNumber';

export default interface QuizConfiguration extends Model {
    quiz: Quiz;
    numberQuestions: number;
    withStopWatch: boolean;
}

export function createDefaultQuizConfiguration(): QuizConfiguration {
    return {
        id: uniqueID(),
        quiz: createDefaultQuiz(),
        numberQuestions: 5,
        withStopWatch: false,
    };
}
