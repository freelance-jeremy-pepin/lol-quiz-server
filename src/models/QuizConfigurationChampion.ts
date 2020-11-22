import ChampionLolApi from 'src/models/LolApi/ChampionLolApi';
import QuizConfiguration, { createDefaultQuizConfiguration } from 'src/models/QuizConfiguration';

export default interface QuizConfigurationChampion extends QuizConfiguration {
    champions: ChampionLolApi[];
}

export function createDefaultQuizConfigurationChampion(): QuizConfigurationChampion {
    return {
        ...createDefaultQuizConfiguration(),
        champions: [],
    };
}
