import React from 'react'

const Input = (props) => {
    return (
        <input className='bg-white w-[12rem] h-[1.8rem] text-black' placeholder={props.placeholder} type={props.type} value={props.value} onChange={(e) => props.setValue(e.target.value)} />
    )
}

export default Input