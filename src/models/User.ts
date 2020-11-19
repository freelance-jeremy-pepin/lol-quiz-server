import Model from 'src/models/Model';

export default interface User extends Model {
    pseudo: string;
}

export function createDefaultUser(): User {
    return {
        id: '',
        pseudo: '',
    };
}
