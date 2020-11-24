import Player from '../models/Player';
import Room from '../models/Room';
import User from '../models/User';
import Store from '../store/Store';
import Listener from './Listener';

export default class RoomListener extends Listener {
    constructor(io: any, socket: any, store: Store) {
        super(io, socket, store);
    }

    public registerListener() {
        this.onGetAllRooms();
        this.onGetRoomById();
        this.onCreateOrUpdateRoom();
        this.onJoinRoom();
        this.onLeaveRoom();
        this.onDeleteRoom();
        this.onUpdatePlayer();
    }

    public onGetAllRooms() {
        this.socket.on('get_all_rooms', () => {
            this.receive('get_all_rooms');
            this.send('all_rooms', this.store.rooms);
        });
    }

    public onGetRoomById() {
        this.socket.on('get_room_by_id', (id: string, user: User) => {
            this.receive('get_room_by_id', { id, user });

            const roomFound = this.store.rooms.find(r => {
                if (r.id === id) {
                    return r.players.find(p => p.userId === user.id) !== undefined;
                }

                return false;
            });

            this.send('room_by_id', roomFound ? roomFound : null);
        });
    }

    public onCreateOrUpdateRoom() {
        this.socket.on('create_or_update_room', (room: Room) => {
            this.receive('create_room', room);

            // Cherche la salle.
            const indexFound = this.store.rooms.findIndex(r => r.id === room.id);

            // Si la salle existe, la modifie.
            // Sinon l'ajoute.
            if (indexFound > -1) {
                this.store.rooms = this.store.rooms.map(r => (r.id === room.id ? room : r));
            } else {
                this.store.rooms.push(room);
            }

            this.sendToAll('room_created_or_updated', room);
        });
    }

    public onJoinRoom() {
        this.socket.on('join_room', (roomToJoin: Room, player: Player) => {
            this.receive('join_room', { roomToJoin, player });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === roomToJoin.id) {
                    r.players.push(player);
                }

                return r;
            });

            this.sendToAll('room_joined', { roomJoined: roomToJoin, player });
        });
    }

    public onLeaveRoom() {
        this.socket.on('leave_room', (roomToLeave: Room, player: Player) => {
            this.receive('leave_room', { roomToLeave, player });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === roomToLeave.id) {
                    r.players = r.players.filter(p => p.id !== player.id);
                }

                return r;
            });

            this.sendToAll('room_left', { roomLeft: roomToLeave, player });
        });
    }

    public onDeleteRoom() {
        this.socket.on('delete_room', (roomToDelete: Room) => {
            this.receive('delete_room');

            this.store.rooms = this.store.rooms.filter(r => r.id !== roomToDelete.id);

            this.sendToAll('room_deleted', roomToDelete)
        });
    }

    public onUpdatePlayer() {
        this.socket.on('update_player', (room: Room, player: Player) => {
            this.receive('update_player', { room, player });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === room.id) {
                    r.players = r.players.map(p => (p.id === player.id ? player : p));
                }

                return r;
            });

            this.sendToAll('player_updated', { room, playerUpdated: player });
        })
    }
}
