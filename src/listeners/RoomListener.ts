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

            this.send('room_created', newRoomName);
        });
    }

    public onJoinRoom() {
        this.socket.on('join_room', (roomToJoin: Room, participant: Participant) => {
            this.receive('join_room', roomToJoin, participant);

            const roomToJoinFound = this.store.rooms.find(r => r.id === roomToJoin.id);

            if (roomToJoinFound) {
                roomToJoinFound.participants.push(participant);

                this.sendToAll('room_joined', roomToJoin, participant);
            }
        });
    }

    public onLeaveRoom() {
        this.socket.on('leave_room', (roomToLeave: Room, participant: Participant) => {
            this.receive('leave_room', roomToLeave, participant);

            const roomLeftFound = this.store.rooms.find(r => r.id === roomToLeave.id);
            if (roomLeftFound) {
                const participantIndexToRemove = roomLeftFound.participants.findIndex(p => p.id === participant.id);

                if (participantIndexToRemove > -1) {
                    roomLeftFound.participants.splice(participantIndexToRemove, 1);

                    this.sendToAll('room_left', roomToLeave, participant)
                }
            }
        });
    }

    public onDeleteRoom() {
        this.socket.on('delete_room', (roomToDelete: Room) => {
            this.receive('delete_room');

            const indexToDelete = this.store.rooms.findIndex(r => r.id === roomToDelete.id);
            this.store.rooms.splice(indexToDelete, 1);

            this.sendToAll('room_deleted', roomToDelete)
        });
    }
}
