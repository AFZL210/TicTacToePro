import express from "express";
import cors from "cors";
import { Server } from "socket.io";
const app = express();
const httPort = 5000;
const wsPort = 5001;

app.use(cors({ origin: "*" }));
app.use(express.json());
const io = new Server({ cors: true });

let playerRoomMapping = [{
    id: 1,
    players: []
}];

io.on('connection', (socket) => {
    console.log(socket.id);

    socket.on('join-room', (data) => {
        const { id, username } = data;
        let roomId, roomDetails = 0;

        let n = playerRoomMapping.length;
        for (let i = 0; i < n; i++) {
            if (playerRoomMapping[i].id == id) {
                roomId = i;
                roomDetails = playerRoomMapping[i];
                break;
            }
        }

        console.log(data, roomDetails)

        if (roomDetails == 0) socket.emit('join-info', { status: true, msg: "no room found" });
        else if (roomDetails.players.length >= 2) socket.emit('join-info', { status: true, msg: "room is full" });
        else {
            playerRoomMapping[roomId].players.push(username);
            socket.join(id);
            socket.emit('join-info', { status: true, msg: "joined room" });
        }
    })
});

io.listen(wsPort);
app.listen(httPort, () => {
    console.log(`http server running on port ${httPort}`);
    console.log(`ws server running on port ${wsPort}`);
});