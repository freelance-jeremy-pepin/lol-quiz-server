import RoomListener from './src/listeners/RoomListener';
import UserListener from './src/listeners/UserListener';
import Player from './src/models/Player';
import Room from './src/models/Room';
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

// Supprime les salles trop anciennes
setInterval(() => {
    store.rooms = store.rooms.filter(r => {
        let expiresAt: Date;

        if (typeof r.expiresAt === 'string') {
            expiresAt = new Date(r.expiresAt);
        }

        return expiresAt.getTime() - new Date().getTime() > 0;
    });
}, 60000);

io.on('connection', (socket: any) => {
    const userListener = new UserListener(io, socket, store);
    userListener.registerListener();

    const roomListener = new RoomListener(io, socket, store);
    roomListener.registerListener();

    socket.on('disconnect', () => {
        const userDisconnected = store.users.find(u => u.socketId === socket.id);

        if (userDisconnected && store.rooms) {
            store.rooms = store.rooms.map((r: Room) => {
                r.players.map((p: Player) => {
                    if (p.userId === userDisconnected.id) {
                        p.hasQuitRoom = true;
                    }

                    return p;
                });

                return r;
            });

            io.emit('all_rooms', store.rooms);
        }
    });
});

http.listen(3000, () => {
});
