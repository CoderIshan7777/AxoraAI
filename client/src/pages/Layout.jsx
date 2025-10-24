import React, {useState} from 'react'
import { Outlet, useNavigate } from "react-router-dom"
import { assets } from '../assets/assets'
import { X, Menu} from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { useUser, SignIn } from '@clerk/clerk-react'


const Layout = () => {

  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  const {user} = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen'>

      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200'>
        <p
          onClick={() => navigate('/')}
          className="cursor-pointer font-extrabold text-2xl sm:text-3xl tracking-widest 
          text-[#8a307f] 
          drop-shadow-[0_0_10px_rgba(138,48,127,0.8)] 
          hover:drop-shadow-[0_0_20px_rgba(138,48,127,1)] 
          transition duration-300"
        >
          AxoraAI
        </p>
        {
          sidebar ? <X onClick={()=> setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' />:
          <Menu onClick={()=> setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden' />
        }
      </nav>  
      <div className='flex-1 w-full flex h-[calc(100vh-64px)]'>
          <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
          <div className='flex-1 bg-[#F5EFE6]'>
            <Outlet />
          </div>
      </div>    
    </div>
  ): (
    <div className='flex items-center justify-center h-screen'>
      <SignIn />
    </div>
  )
}

export default Layout
