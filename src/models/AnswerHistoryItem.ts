import ItemLolApi, { createDefaultLolApiItem } from 'src/models/LolApi/ItemLolApi';
import AnswerHistory, { createDefaultAnswerHistory } from 'src/models/AnswerHistory';

export default interface AnswerHistoryItem extends AnswerHistory {
    item: ItemLolApi;
}

export function createDefaultAnswerHistoryItem(): AnswerHistoryItem {
    return {
        ...createDefaultAnswerHistory(),
        item: createDefaultLolApiItem(),
    };
}
