import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/number';

export default interface PlayerAnswer extends Model {
    value: string,
    isRight: boolean,
}

export function createDefaultPlayerAnswer(): PlayerAnswer {
    return {
        id: uniqueID(),
        value: '',
        isRight: false,
    };
}
