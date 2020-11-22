import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/randomNumber';

export default interface User extends Model {
    pseudo: string;
}

export function createDefaultUser(): User {
    return {
        id: uniqueID(),
        pseudo: '',
    };
}
