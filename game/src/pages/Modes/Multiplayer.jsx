import React, { useState, useEffect, useCallback } from 'react'
import { TicTacToeBoard } from '../../components/TicTacToeBoard'
import { checkWin } from "../../../../bot/utils.js";
import { GameProvider } from '../../providers/GameContext';
import { useSocket } from '../../providers/SocketProvider';
import { useParams } from 'react-router-dom'

const Multiplayer = () => {

  const { socket } = useSocket();
  const { turn, setTurn, setSymbol, symbol } = GameProvider();
  const [marks, setMarks] = useState(new Array(9).fill("."));
  const [winGrid, setWinGrid] = useState([]);
  const [win, setWin] = useState(".");
  const [cnt, setCnt] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    socket.on('play-info', (data) => {
      if(data.status) {
        console.log(data)
        const { index, symbol, turn } = data;
        setTurn(turn);
        let arr = marks;
        arr[index] = symbol;
        setMarks(arr);
        const { winner, winnerGrid } = checkWin(marks);
        if (winner !== '.') {
          setWin(winner);
          setWinGrid(winnerGrid);
        }
      }
    })
  }, [socket])

  const playMove = useCallback((idx) => {
    // socket.emit('play-move', { index: idx, id: id, turn, cell: marks[idx], symbol });
    if((turn==true && symbol=='X') || (turn==false && symbol=='O')) {
      socket.emit('play-move', { index: idx, id: id, turn, cell: marks[idx], symbol });
    }
  }, [])

  // const updateMark = (idx) => {
  //   let arr = marks;
  //   if (arr[idx] === "." && turn === currentPlayerTurn) {
  //     turn ? arr[idx] = "X" : arr[idx] = "O";
  //     setCnt(cnt + 1);
  //     setMarks(arr);
  //     setTurn(!turn);
  //     setCurrentPlayerTurn(!currentPlayerTurn);
  //     const { winner, winnerGrid } = checkWin(marks);
  //     if (winner !== '.') {
  //       setWin(winner);
  //       setWinGrid(winnerGrid);
  //     }
  //   }
  // }

  return (
    <div className='bg-[#1e1e20] w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
      <div className='w-[100%] text-center flex flex-col'><span>{win == '.' ? turn ? "X Turn" : "O Turn" : <span className='text-white text-[4rem]'>{win == 'X' ? "X Won" : "O Won"}</span>}</span><span>{cnt == 9 && win == '.' ? "Draw" : ""}</span></div>
      <div className='w-[20rem] h-[20rem] flex items-center justify-center'>
        <TicTacToeBoard marks={marks} setMarks={setMarks} updateMark={playMove} turn={turn} setTurn={setTurn} win={win} winGrid={winGrid} />
      </div>
    </div>
  )
}

export default Multiplayer