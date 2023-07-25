import React from 'react'
import P from "../assets/pvp.png"

const Button = (props) => {
  return (
        <button className='w-[12rem] h-[1.8rem] bg-white flex items-center px-3 justify-around' onClick={() => props.toggle(props.togleOption)} >
            <img className='w-[1.4rem]' src={P}/>
            <span className='text-[#000] w-[10.6rem]'>{props.title}</span>
        </button>
  )
}

export default Button