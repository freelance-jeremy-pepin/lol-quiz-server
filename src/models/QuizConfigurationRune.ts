import RuneLolApi from 'src/models/LolApi/RuneLolApi';
import QuizConfiguration, { createDefaultQuizConfiguration } from 'src/models/QuizConfiguration';

export default interface QuizConfigurationRune extends QuizConfiguration {
    runes: RuneLolApi[];
}

export function createDefaultQuizConfigurationRune(): QuizConfigurationRune {
    return {
        ...createDefaultQuizConfiguration(),
        runes: [],
    };
}
