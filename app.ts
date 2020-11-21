import RoomListener from './src/listeners/RoomListener';
import UserListener from './src/listeners/UserListener';

const app = require('express')();
const http = require('http').createServer(app);
//@ts-ignore
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://dev.lol-quiz.com:4000',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket: any) => {

    const userListener = new UserListener(io, socket);
    userListener.registerListener();

    const roomListener = new RoomListener(io, socket);
    roomListener.registerListener();
});

http.listen(3000, () => {
});
