import Model from 'src/models/Model';
import { uniqueID } from 'src/utils/number';

export default interface User extends Model {
    pseudo: string;
    socketId?: string;
}

export function createDefaultUser(): User {
    return {
        id: uniqueID(),
        pseudo: '',
    };
}
