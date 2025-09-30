"use client"
import { ArrowRightLeft, ChartPie, ChevronLeft, ChevronRight, HomeIcon, Settings, SidebarClose, SidebarOpen } from 'lucide-react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Home from '../page'
import Link from 'next/link'

const Sidebar = () => {


    const pathname = usePathname();



    const [sidebarOn, setSidebarOn] = useState<boolean>(true);


  return (
    <div>
      {sidebarOn === true ? (
         <div className='w-80 duration-500 border-r-1  h-screen border-gray-300 bg-purple-300/20'>


        <div className='flex items-center justify-between py-1.5 px-4  gap-2 border-b-2 border-gray-300 '>
            <Image src="/logo.png" alt='logo' width={40} height={40} />

            <div className='delay-1000 text-center'>
                <h1 className='font-extrabold text-xl text-purple-900'>YOUR MONEY</h1>
                <h3 className='font-semibold tetx-gray-200'>Software House</h3>
            </div>

            <div >
                <SidebarClose onClick={() => setSidebarOn(!sidebarOn)} className="text-purple-900 cursor-pointer" />
            </div>
            
        </div>

        
          <div className='mt-4'>
        <ul className='px-4 flex flex-col gap-4'>
            <li className={`${pathname === "/" ? "bg-purple-900/60 text-white" : "hover:bg-blue-200/90"} cursor-pointer duration-200 p-2 font-bold rounded-lg `}>
            <Link href="/" className='flex items-center gap-2'>
              <HomeIcon />
                Dashboard</Link>
              
            </li>
            <li  className={`${pathname === "/transacoes" ? "bg-purple-900/60 text-white" : "hover:bg-blue-200/90"} cursor-pointer duration-200 p-2 font-bold rounded-lg `}>
            <Link href="/" className='flex items-center gap-2'>
            <ArrowRightLeft/>
                Transações</Link> 
                
            </li>
            <li  className={`${pathname === "/relatorios" ? "bg-purple-900/60 text-white" : "hover:bg-blue-200/90"} cursor-pointer duration-200 p-2 font-bold rounded-lg `}>
            <Link href="/" className='flex items-center gap-2'>
            <ChartPie /> 
                Relatórios</Link>
                
            </li>
            <li  className={`${pathname === "/configuracoes" ? "bg-purple-900/60 text-white" : "hover:bg-blue-200/90"} cursor-pointer duration-200 p-2 font-bold rounded-lg `}>
            <Link href="/" className='flex items-center gap-2'>
            <Settings />
                Configurações</Link>
                
            </li>
        </ul>
      </div>


      </div>

      ) : (
        <div className='w-20 duration-500 justify-center border-r-1 h-screen border-gray-300 bg-purple-300/20'>

          <div className='flex flex-col gap-2 items-center border-b-2 border-gray-200 py-5'>
      
             <div >
                <SidebarOpen onClick={() => setSidebarOn(!sidebarOn)} className="text-purple-900 cursor-pointer" />
              </div>
          </div>


          <div>
            <ul  className=' items-center flex flex-col gap-8 mt-4 text-purple-800'>
              <li>
                <Link href="/">
                <HomeIcon size={26} />
                </Link>
              </li>
              <li>
                <Link href="/">
                 <ArrowRightLeft size={26}/>
                </Link>
              </li>
              <li>
                <Link href="/">
                 <ChartPie size={26} /> 
                </Link>
              </li>
              <li>
                <Link href="/">
                <Settings size={26} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Sidebar
