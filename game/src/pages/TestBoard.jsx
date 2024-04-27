import React, { useState } from 'react'
import { TicTacToeBoard } from '../components/TicTacToeBoard'

const TestBoard = () => {

    const [marks, setMarks] = useState(new Array(9).fill("."));
    const [turn, setTurn] = useState(true);
    const [currentPlayerTurn, setCurrentPlayerTurn] = useState(true);

    const updateMark = (idx) => {
        let arr = marks;
        if (arr[idx] === "." && turn === currentPlayerTurn) {
            turn ? arr[idx] = "X" : arr[idx] = "O";
            setMarks(arr);
            setTurn(!turn);
            setCurrentPlayerTurn(!currentPlayerTurn);
        }
    }

    return (
        <div className='text-black w-[100vw] h-[100vh] flex items-center justify-center'>
            <span className='text-black'>{turn ? "X Turn" : "O Turn"}</span>
            <div className='w-[50%] h-[50%] bg-red-200'>
                <TicTacToeBoard marks={marks} setMarks={setMarks} updateMark={updateMark} turn={turn} setTurn={setTurn} />
            </div>
        </div>
    )
}

export default TestBoard