import Model from 'src/models/Model';
import Quiz, { createDefaultQuiz } from 'src/models/Quiz';
import QuizAnswer from 'src/models/QuizAnswer';
import { uniqueID } from 'src/utils/number';

export default interface QuizConfiguration extends Model {
    quiz: Quiz;
    answers: QuizAnswer[];
    numberQuestions: number;
    withStopWatch: boolean;
    totalScore: number;
}

export function createDefaultQuizConfiguration(): QuizConfiguration {
    return {
        id: uniqueID(),
        answers: [],
        quiz: createDefaultQuiz(),
        numberQuestions: 5,
        withStopWatch: false,
        totalScore: 0,
    };
}
