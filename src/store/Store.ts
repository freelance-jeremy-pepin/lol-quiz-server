import Room from '../models/Room';
import User from '../models/User';

export default class Store {
    private _users: User[];

    private _rooms: Room[];

    constructor() {
        this._users = [];
        this._rooms = [];
    }

    public get users(): User[] {
        return this._users;
    }

    public set users(value: User[]) {
        this._users = value;
    }

    public get rooms(): Room[] {
        return this._rooms;
    }

    public set rooms(value: Room[]) {
        this._rooms = value;
    }
}
