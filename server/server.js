import express from "express";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const httPort = 5000;
const wsPort = 5001;
const RANGE = 1000000;

app.use(cors({ origin: "*" }));
app.use(express.json());
const io = new Server({ cors: true });

let playerRoomMapping = [];
const socketRoomMapping = new Map();
const socketUsernameMapping = new Map();

app.get('/room', (req, res) => {
    res.json(playerRoomMapping);
})

app.get('/printmap', (req, res) => {
    socketRoomMapping.forEach((value, key) => {
        console.log(key, "-->", value);
    })
    res.send("printed");
})

const generateRandom = (range) => {
    return Math.floor((Math.random() * range) + 1);
}

io.on('connection', (socket) => {

    socket.on('join-room', (data) => {
        const { id, username } = data;

        let roomId = playerRoomMapping.findIndex((e) => { return e.id == id });

        if (roomId == -1) socket.emit('join-info', { status: false, msg: "no room found" });
        else if (playerRoomMapping[roomId].players.length >= 2) socket.emit('join-info', { status: false, msg: "room is full" });
        else {
            playerRoomMapping[roomId].players.push(username);
            socket.join(id);
            socketRoomMapping.set(socket.id, id);
            socketUsernameMapping.set(socket.id, username);
            socket.emit('join-info', { status: true, msg: "joined room", code: 'join', id: id });
        }
    });

    socket.on('create-room', (data) => {
        const { username } = data;
        let id, idx;

        while (1) {
            id = generateRandom(RANGE).toString();
            idx = playerRoomMapping.findIndex((e) => { return e.id == id });
            if (idx == -1) {
                idx = playerRoomMapping.length;
                break;
            }
        }

        socket.join(id);
        playerRoomMapping.push({ id: id, players: [username] });
        socketRoomMapping.set(socket.id, id);
        socketUsernameMapping.set(socket.id, username);
        socket.emit('join-info', { status: true, msg: 'created room', code: 'create', id: id })
    });


    socket.on('play-move', (data) => {
        const { index, cell, turn, symbol, id } = data;
        if (cell == '.') {
            if (turn && symbol == 'X') {
                io.to(id).emit('play-info', { status: true, turn: false, symbol: 'X', index });
            } else if (!turn && symbol == 'O') {
                io.to(id).emit('play-info', { status: true, turn: true, symbol: 'O', index });
            } else io.to(id).emit('play-info', { status: false, msg: "invalid move" });
        }
    });

    socket.on("disconnect", () => {
        const id = socketRoomMapping.get(socket.id);
        const username = socketUsernameMapping.get(socket.id);
        socketRoomMapping.delete(socket.id);
        const idx = playerRoomMapping.findIndex((e) => { return e.id == id });

        if (idx != -1) {
            playerRoomMapping[idx].players = playerRoomMapping[idx].players.filter((e) => { return e != username });
            if (playerRoomMapping[idx].players.length == 0) {
                playerRoomMapping = playerRoomMapping.filter((e) => { return e.id != id });
            }
        }
    });
});

io.listen(wsPort);
app.listen(httPort, () => {
    console.log(`http server running on port ${httPort}`);
    console.log(`ws server running on port ${wsPort}`);
});