import React, { useEffect, useState } from 'react'
import { TicTacToeBoard } from '../../components/TicTacToeBoard'
import { checkWin, nextMoveIndex } from '../../bot';
import { oneLayerBot } from '../../bot/one-layer-bot';
import { randomBot } from '../../bot/random-bot';
import { twoLayerBot } from '../../bot/two-layer-bot';
import { minMaxBot } from '../../bot/pro-minmax-bot';
import { GameProvider } from '../../providers/GameContext';

const PvBot = () => {

  const { difficulty } = GameProvider();
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

  useEffect(() => {
    if (difficulty === 'easy' && currentPlayerTurn == false) {
      let nextMoveIndex = randomBot(marks);
      updateMark(nextMoveIndex);
    } else if (difficulty === 'medium' && currentPlayerTurn == false) {
      let nextMoveIndex = oneLayerBot(marks);
      updateMark(nextMoveIndex);
    } else if (difficulty === 'hard' && currentPlayerTurn == false) {
      let nextMoveIndex = twoLayerBot(marks);
      updateMark(nextMoveIndex);
    } else if (difficulty == 'impossible' && currentPlayerTurn == false) {
      let nextMoveIndex = minMaxBot(marks);
      updateMark(nextMoveIndex);
    }
  }, [currentPlayerTurn])

  return (
    <div className='bg-[#1e1e20] w-[100vw] h-[100vh] flex flex-col items-center justify-center' style={{ touchAction: currentPlayerTurn ? "" : "none" }}>
      <div className='w-[100%] text-center flex flex-col'><span>{win == '.' ? turn ? "X Turn" : "O Turn" : <span className='text-white text-[4rem]'>{win == 'X' ? "X Won" : "O Won"}</span>}</span><span>{cnt == 9 && win == '.' ? "Draw" : ""}</span></div>
      <div className='w-[20rem] h-[20rem] flex items-center justify-center'>
        <TicTacToeBoard marks={marks} setMarks={setMarks} updateMark={updateMark} turn={turn} setTurn={setTurn} win={win} winGrid={winGrid} />
      </div>
    </div>
  )
}

export default PvBot