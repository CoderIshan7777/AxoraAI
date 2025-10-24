import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk,UserButton, useUser } from '@clerk/clerk-react'


const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useUser() 
    const {openSignIn} = useClerk()

    return (
        <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>
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
            user ? <UserButton />:( <button onClick={openSignIn} className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-indigo-600 text-white px-10 py-2.5">
            Get started <ArrowRight className="w-4 h-4" />
            </button>)
        }

        </div>
    )
}

export default Navbar
