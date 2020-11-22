import { uniqueID } from 'src/utils/randomNumber';
import Model from 'src/models/Model';

export interface Time extends Model {
    minutes: string;
    seconds: string;
    milliseconds: string;
}

export function createDefaultTime(): Time {
    return {
        id: uniqueID(),
        minutes: '00',
        seconds: '00',
        milliseconds: '000',
    };
}
