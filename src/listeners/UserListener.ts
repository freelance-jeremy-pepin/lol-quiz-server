import User from '../models/User';
import Listener from './Listener';

export default class UserListener extends Listener {
    private _users: User[] = [];

    constructor(io: any, socket: any) {
        super(io, socket);
    }

    public registerListener() {
        this.onGetAllUsers();
        this.onCreateOrUpdate();
    }

    public onGetAllUsers() {
        this.socket.on('get_all_users', () => {
            this.receive('get_all_users');

            this.send('all_users', this._users);
        });
    }

    public onCreateOrUpdate() {
        this.socket.on('create_or_update_user', (user: User) => {
            this.receive('create_or_update_user', user);

            // Cherche l'utilisateur.
            const indexFound = this._users.findIndex(u => u.id === user.id);

            // Si l'utilisateur existe, le modifie.
            // Sinon l'ajoute.
            if (indexFound > -1) {
                this._users[indexFound] = user;
            } else {
                this._users.push(user);
            }

            this.sendToAll('user_created_or_updated', user);
        })
    }
}
