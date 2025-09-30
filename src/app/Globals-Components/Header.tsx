"use client"
import React, { useState } from 'react'


const Header = () => {


    const today = new Date();

    const hour = today.getHours();

    let messageHour = "";

    if (hour < 12) {
        messageHour = "Bom dia"
    } else if (hour < 18) {
        messageHour = "Boa tarde"
    } else {
        messageHour = "Boa noite"
    }


    const [profileOn, setProfileOn] = useState<boolean>(false);


  return (
    <div className=' px-6 flex bg-gray-200 justify-between border-b-2 shadow-2xl py-2 border-gray-300 items-center'>
      <h1 className='font-bold text-3xl text-gray-700'>{messageHour}, André</h1>


      <div className='flex gap-2 items-center'>
        <div>
            <h1 className='font-bold text-'>André Lucas</h1>
            <button onClick={() => setProfileOn(true)} className='underline text-md cursor-pointer hover:text-blue-700 text-blue-500 font-semibold'>Editar Perfil</button>
        </div>
        
        <div className='bg-black h-12 w-12 rounded-full'></div>
      </div>

    </div>
  )
}

export default Header
