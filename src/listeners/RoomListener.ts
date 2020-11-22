import Participant from '../models/Participant';
import Room from '../models/Room';
import Store from '../store/Store';
import Listener from './Listener';

export default class RoomListener extends Listener {
    constructor(io: any, socket: any, store: Store) {
        super(io, socket, store);
    }

    public registerListener() {
        this.onGetAllRooms();
        this.onCreateRoom();
        this.onJoinRoom();
        this.onLeaveRoom();
        this.onDeleteRoom();
    }

    public onGetAllRooms() {
        this.socket.on('get_all_rooms', () => {
            console.log(this.store.rooms)
            this.receive('get_all_rooms');
            this.send('all_rooms', this.store.rooms);
        });
    }

    public onCreateRoom() {
        this.socket.on('create_room', (newRoomName: Room) => {
            this.receive('create_room', newRoomName);

            this.store.rooms.push(newRoomName);

            this.sendToAll('room_created', newRoomName);
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
}
