import React, { useState } from 'react'
import Button from '../components/Button'

const Home = () => {

    const [dialogBox, setDialogBox] = useState(null);
    const [difficult, setDifficulty] = useState("easy");
    const toggleDialogBox = (box) => setDialogBox(box);

    console.log(dialogBox)

    return (
        <div className='w-[100vw] h-[100vh] bg-[#1e1e20] flex items-center justify-center'>
            <div className='w-[50vw] h-[50vh] flex flex-col relative'>
                <h1 className='mx-auto text-2xl font-bold'>TicTacToePro</h1>
                <div className='w-[100%] h-[100%] flex flex-col items-center gap-5 mt-6'>
                    <Button title="Player vs Player" toggle={toggleDialogBox} togleOption="pvp" />
                    <Button title="Player vs Bot" toggle={toggleDialogBox} togleOption="pvb" />
                    <Button title="Watch Bot Fight" toggle={toggleDialogBox} togleOption="bvb" />
                </div>
                {dialogBox !== null && <div className='absolute w-[100%] h-[100%] top-0 bg-black flex flex-col'>
                    <div className='w-[100%] text-right px-4 py-4 '><span onClick={() => setDialogBox(null)} className='w-[2.2rem] cursor-pointer text-[#fff] text-[1.2rem] rounded-full'>X</span></div>
                    {dialogBox == "pvp" ? <JoinCreateRoom /> : dialogBox == "bvb" ? <BotVsBot /> : <PlayerVsBot />}</div>}
            </div>
        </div>
    )
}


const JoinCreateRoom = (props) => {
    return (
        <div>
            Join
        </div>
    )
}

const PlayerVsBot = (props) => {
    return (
        <div>
            P v B
        </div>
    )
}

const BotVsBot = (props) => {
    return (
        <div>
            B v B
        </div>
    )
}

export default Home