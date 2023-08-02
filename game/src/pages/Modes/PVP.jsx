import React, { useState } from 'react'
import { TicTacToeBoard } from '../../components/TicTacToeBoard'
import { checkWin } from "../../../../bot/utils.js";

const PVP = () => {

  const [marks, setMarks] = useState(new Array(9).fill("."));
  const [turn, setTurn] = useState(true);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(true);
  const [winGrid, setWinGrid] = useState([]);
  const [win, setWin] = useState(".");
  const [cnt, setCnt] = useState(0);


  const updateMark = (idx) => {
    let arr = marks;
    if (arr[idx] === "." && turn === currentPlayerTurn) {
      turn ? arr[idx] = "X" : arr[idx] = "O";
      setCnt(cnt + 1);
      setMarks(arr);
      setTurn(!turn);
      setCurrentPlayerTurn(!currentPlayerTurn);
      const { winner, winnerGrid } = checkWin(marks);
      if (winner !== '.') {
        setWin(winner)
        setWinGrid(winnerGrid)
      }
    }
  }

  return (
    <div className='bg-[#1e1e20] w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
      <div className='w-[100%] text-center flex flex-col'><span>{win == '.' ? turn ? "X Turn" : "O Turn" : <span className='text-white text-[4rem]'>{win == 'X' ? "X Won" : "O Won"}</span>}</span><span>{cnt == 9 && win == '.' ? "Draw" : ""}</span></div>
      <div className='w-[20rem] h-[20rem] flex items-center justify-center'>
        <TicTacToeBoard marks={marks} setMarks={setMarks} updateMark={updateMark} turn={turn} setTurn={setTurn} win={win} winGrid={winGrid} />
      </div>
    </div>
  )
}

export default PVP