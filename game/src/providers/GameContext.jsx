import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext(null);

export const GameProvider = () => useContext(GameContext);

export const GameContextProvider = (props) => {

    const [dialogBox, setDialogBox] = useState(null);
    const [difficulty, setDifficulty] = useState("easy");
    const [username, setUsername] = useState("");
    const [username2, setUsername2] = useState("");
    const [roomId, setRoomId] = useState("");
    const [turn, setTurn] = useState(true);
    const [symbol, setSymbol] = useState("X");


    return (
        <GameContext.Provider value={{ username, setUsername, username2, setUsername2, difficulty, setDifficulty, dialogBox, setDialogBox, roomId, setRoomId, turn, setTurn, symbol, setSymbol }}>{props.children}</GameContext.Provider>
    )
}