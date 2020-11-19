import Participant from './src/models/Participant';
import Room from './src/models/Room';

const app = require('express')();
const http = require('http').createServer(app);
//@ts-ignore
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://lol-quiz-items.com:4000',
        methods: ['GET', 'POST'],
    }
});

let rooms: Room[] = [];

io.on('connection', (socket: any) => {
    console.log('user connected');

    socket.on('get_all_rooms', () => {
        console.log('received', 'get_all_rooms');
        socket.emit('all_rooms', rooms);
        console.log('emitted', 'all_rooms');
    });

    socket.on('create_room', (newRoomName: Room) => {
        console.log('received', 'create-room', newRoomName);
        rooms.push(newRoomName);
        io.emit('room_created', newRoomName);
        console.log('emitted', 'room_created');
    });

    socket.on('join_room', (roomToJoin: Room, participant: Participant) => {
        console.log('received', 'join_room', roomToJoin, participant);

        const roomToJoinFound = rooms.find(r => r.id === roomToJoin.id);

        if (roomToJoinFound) {
            roomToJoinFound.participants.push(participant);

            io.emit('room_joined', roomToJoin, participant);
            console.log('emitted', 'room_joined');
        }
    });

    socket.on('leave_room', (roomToLeave: Room, participant: Participant) => {
        console.log('received', 'leave_room', roomToLeave, participant);

        const roomLeftFound = rooms.find(r => r.id === roomToLeave.id);
        if (roomLeftFound) {
            const participantIndexToRemove = roomLeftFound.participants.findIndex(p => p.id === participant.id);
            console.log('participantIndexToRemove', participantIndexToRemove)

            if (participantIndexToRemove > -1) {
                roomLeftFound.participants.splice(participantIndexToRemove, 1);

                io.emit('room_left', roomToLeave, participant);
                console.log('emitted', 'room_left');
            }
        }
    });

    socket.on('delete_room', (roomToDelete: Room) => {
        console.log('received', 'delete_room', roomToDelete);
        const indexToDelete = rooms.findIndex(r => r.id === roomToDelete.id);
        rooms.splice(indexToDelete, 1);
        io.emit('room_deleted', roomToDelete);
        console.log('emitted', 'room_deleted');
    });
});

http.listen(3000, () => {
});
