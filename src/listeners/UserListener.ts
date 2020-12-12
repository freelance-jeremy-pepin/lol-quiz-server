import User from '../models/User';
import Store from '../store/Store';
import Listener from './Listener';

export default class UserListener extends Listener {
    constructor(io: any, socket: any, store: Store) {
        super(io, socket, store);
    }

    public registerListener() {
        this.onGetAllUsers();
        this.onCreateOrUpdate();
    }

    public onGetAllUsers() {
        this.socket.on('get_all_users', () => {
            this.receive('get_all_users');

            this.send('all_users', this.store.users);
        });
    }

    public onCreateOrUpdate() {
        this.socket.on('create_or_update_user', (user: User) => {
            user.socketId = this.socket.id;

            this.receive('create_or_update_user', user);

            // Cherche l'utilisateur.
            const indexFound = this.store.users.findIndex(u => u.id === user.id);

            // Si l'utilisateur existe, le modifie.
            // Sinon l'ajoute.
            if (indexFound > -1) {
                this.store.users = this.store.users.map(u => (u.id === user.id ? user : u));
            } else {
                this.store.users.push(user);
            }

            this.sendToAll('user_created_or_updated', user);
        })
    }
}
