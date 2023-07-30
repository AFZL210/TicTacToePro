import React from 'react';
import '../App.css';

const TicTacToeBoard = (props) => {
    return (
        <div className='w-[100%] h-[100%]' id='tic__board'>
            {props.marks.map((mark, idx) => <div key={idx} style={{backgroundColor: `${props.win!=='.' && props.winGrid.includes(idx)? "yellow":"transparent"}`}} className='w-[100%] h-[100%] cursor-pointer flex justify-center items-center' id='board__cell' onClick={() => props.win=='.' && props.updateMark(idx)}>{mark == "." ? <span></span> : <span className='text-black text-[3rem]'>{mark}</span>}</div>)}
        </div>
    )
}

export default TicTacToeBoard