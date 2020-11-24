import RoomListener from './src/listeners/RoomListener';
import UserListener from './src/listeners/UserListener';
import Store from './src/store/Store';

const app = require('express')();
const http = require('http').createServer(app);
//@ts-ignore
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://dev.lol-quiz.com:4000', 'http://prod.lol-quiz.com'],
        methods: ['GET', 'POST'],
    }
});

const store = new Store();

io.on('connection', (socket: any) => {

    const userListener = new UserListener(io, socket, store);
    userListener.registerListener();

    const roomListener = new RoomListener(io, socket, store);
    roomListener.registerListener();
});

http.listen(3000, () => {
});
