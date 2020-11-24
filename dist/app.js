"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RoomListener_1 = require("./src/listeners/RoomListener");
const UserListener_1 = require("./src/listeners/UserListener");
const Store_1 = require("./src/store/Store");
const app = require('express')();
const http = require('http').createServer(app);
//@ts-ignore
const io = require('socket.io')(http, {
    cors: {
        origin: ['http://dev.lol-quiz.com:4000', 'http://prod.lol-quiz.com'],
        methods: ['GET', 'POST'],
    }
});
const store = new Store_1.default();
io.on('connection', (socket) => {
    const userListener = new UserListener_1.default(io, socket, store);
    userListener.registerListener();
    const roomListener = new RoomListener_1.default(io, socket, store);
    roomListener.registerListener();
});
http.listen(3000, () => {
});
//# sourceMappingURL=app.js.map