import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext(null);

export const GameProvider = () => useContext(GameContext);

export const GameContextProvider = (props) => {

    const [dialogBox, setDialogBox] = useState(null);
    const [difficult, setDifficulty] = useState("easy");
    const [username, setUsername] = useState("");
    const [username2, setUsername2] = useState("");
    const [roomId, setRoomId] = useState("");

    return (
        <GameContext.Provider value={{ username, setUsername, username2, setUsername2, difficult, setDifficulty, dialogBox, setDialogBox, roomId, setRoomId }}>{props.children}</GameContext.Provider>
    )
}