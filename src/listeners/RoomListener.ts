import Participant from '../models/Participant';
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
        this.onUpdateParticipant();
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
                    return r.participants.find(p => p.userId === user.id) !== undefined;
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
        this.socket.on('join_room', (roomToJoin: Room, participant: Participant) => {
            this.receive('join_room', { roomToJoin, participant });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === roomToJoin.id) {
                    r.participants.push(participant);
                }

                return r;
            });

            this.sendToAll('room_joined', { roomJoined: roomToJoin, participant });
        });
    }

    public onLeaveRoom() {
        this.socket.on('leave_room', (roomToLeave: Room, participant: Participant) => {
            this.receive('leave_room', { roomToLeave, participant });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === roomToLeave.id) {
                    r.participants = r.participants.filter(p => p.id !== participant.id);
                }

                return r;
            });

            this.sendToAll('room_left', { roomLeft: roomToLeave, participant });
        });
    }

    public onDeleteRoom() {
        this.socket.on('delete_room', (roomToDelete: Room) => {
            this.receive('delete_room');

            this.store.rooms = this.store.rooms.filter(r => r.id !== roomToDelete.id);

            this.sendToAll('room_deleted', roomToDelete)
        });
    }

    public onUpdateParticipant() {
        this.socket.on('update_participant', (room: Room, participant: Participant) => {
            this.receive('update_participant', { room, participant });

            this.store.rooms = this.store.rooms.map(r => {
                if (r.id === room.id) {
                    r.participants = r.participants.map(p => (p.id === participant.id ? participant : p));
                }

                return r;
            });

            this.sendToAll('participant_updated', { room, participantUpdated: participant });
        })
    }
}
