import ItemLolApi from 'src/models/LolApi/ItemLolApi';
import QuizConfiguration, { createDefaultQuizConfiguration } from 'src/models/QuizConfiguration';

export default interface QuizConfigurationItem extends QuizConfiguration {
    items: ItemLolApi[];
}

export function createDefaultQuizConfigurationItem(): QuizConfigurationItem {
    return {
        ...createDefaultQuizConfiguration(),
        items: [],
    };
}
