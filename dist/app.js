"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const server = require('http').Server(app);
const port = 3000;
app.get('/', (req, res) => {
    res.json({ data: 'hello world' });
});
server.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=app.js.map