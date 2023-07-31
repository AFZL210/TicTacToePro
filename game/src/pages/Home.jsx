import React, { useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import Input from '../components/Input';
import { GameProvider } from '../providers/GameContext';
import { useSocket } from '../providers/SocketProvider';

const Home = (props) => {

    const { socket } = useSocket();
    const toggleDialogBox = (box) => setDialogBox(box);
    const {
        username, username2, setUsername, setUsername2, dialogBox, setDialogBox, setRoomId, roomId
    } = GameProvider();

    useCallback(() => {
        const handleJoinRoom = () => {
            socket.emit('join-room', { id: roomId, username });
        }
    }, [])

    return (
        <div className='w-[100vw] h-[100vh] bg-[#1e1e20] flex items-center justify-center'>
            <div className='w-[80vw] md:w-[50vw] h-[50vh] flex flex-col relative'>
                <h1 className='mx-auto text-2xl font-bold'>TicTacToePro</h1>
                <div className='w-[100%] h-[100%] flex flex-col items-center gap-5 mt-6'>
                    <Button title="Player vs Player" toggle={toggleDialogBox} togleOption="pvp" type="toggle" />
                    <Button title="Player vs Bot" toggle={toggleDialogBox} togleOption="pvb" type="toggle" />
                    <Button title="Watch Bot Fight" toggle={toggleDialogBox} togleOption="bvb" type="toggle" />
                </div>
                {dialogBox !== null && <div className='absolute w-[100%] h-[100%] top-0 bg-black flex flex-col'>
                    <div className='w-[100%] text-right px-4 py-4 '><span onClick={() => setDialogBox(null)} className='w-[2.2rem] cursor-pointer text-[#fff] text-[1.2rem] rounded-full'>X</span></div>
                    {dialogBox == "pvp" ? <JoinCreateRoom username={username} setUsername={setUsername} roomId={roomId} setRoomId={setRoomId} username2={username2} setUsername2={setUsername2} />
                        : dialogBox == "bvb" ? <BotVsBot />
                            : <PlayerVsBot />}</div>}
            </div>
        </div>
    )
}


const JoinCreateRoom = (props) => {

    const { socket } = useSocket();

    // const handleJoinRoom = () => {
    //     socket.emit('join-room', {id: props.roomId, username: props.username});
    // }

    const handleJoinRoom = useCallback(() => {
        socket.emit('join-room', { id: props.roomId, username: props.username });
    }, [socket, props.roomId, props.username])

    useEffect(() => {
        socket.on('join-info', (data) => console.log(data))
    }, [socket])

    return (
        <div className='w-[100%] flex flex-col items-center'>
            <h1>Join Room</h1>
            <div className='w-[100%] flex flex-col items-center gap-4 mt-4'>
                <Input placeholder="username" value={props.username} setValue={props.setUsername} />
                <Input placeholder="room id" value={props.roomId} setValue={props.setRoomId} />
                <Button title="Join" onClickHandler={handleJoinRoom} type="btn" />
            </div>

            <h1 className='mt-5'>Create Room</h1>
            <div className='w-[100%] flex flex-col items-center gap-4 mt-4'>
                <Input placeholder="username" value={props.username2} setValue={props.setUsername2} />
                <Button title="Create" />
            </div>

            <div className='mt-5'><Link to={"/room/pvp"}><Button title="Single Device" /></Link></div>
        </div>
    )
}

const PlayerVsBot = (props) => {
    return (
        <div className='w-[100%] flex flex-col items-center'>
            <h1>Select Difficulty</h1>
            <div className='w-[100%] flex flex-col items-center gap-4 mt-[10%]'>
                <Link to={"/room/pvb/easy"}><Button title="Easy" /></Link>
                <Link to={"/room/pvb/medium"}><Button title="Medium" /></Link>
                <Link to={"/room/pvb/hard"}><Button title="Hard" /></Link>
            </div>
        </div>
    )
}

const BotVsBot = (props) => {
    return (
        <div className='w-[100%] flex flex-col items-center'>
            <h1>Select Difficulty</h1>
            <div className='w-[100%] flex flex-col items-center gap-4 mt-[10%]'>
                <Button title="Easy" />
                <Button title="Medium" />
                <Button title="Hard" />
            </div>
        </div>
    )
}

export default Home