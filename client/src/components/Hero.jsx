import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const Hero = () => {
    const navigate = useNavigate()
    const vantaRef = useRef(null)
    const vantaEffect = useRef(null)

    useEffect(() => {
        // Load scripts from CDN
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = src
                script.onload = resolve
                script.onerror = reject
                document.head.appendChild(script)
            })
        }

        const initVanta = async () => {
            try {
                // Load Three.js first
                if (!window.THREE) {
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js')
                }
                
                // Then load Vanta Clouds
                if (!window.VANTA) {
                    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.clouds.min.js')
                }

                // Initialize Vanta effect
                if (window.VANTA && !vantaEffect.current) {
                    vantaEffect.current = window.VANTA.CLOUDS({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        skyColor: 0x68b8d7,
                        cloudColor: 0xadc1de,
                        cloudShadowColor: 0x183550,
                        sunColor: 0xff9919,
                        sunGlareColor: 0xff6633,
                        sunlightColor: 0xff9933,
                        speed: 1.5
                    })
                }
            } catch (error) {
                console.error('Failed to load Vanta:', error)
            }
        }

        initVanta()

        // Cleanup
        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy()
            }
        }
    }, [])

    return (
        <div 
            ref={vantaRef}
            className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full
            justify-center min-h-screen'
        >
            <div className='text-center mb-6 relative z-10'>
                <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl
                font-semibold mx-auto leading-[1.2]'>
                    Unleash your creativity <br /> with <span className='text-[#8a307f]'>AI magic</span>
                </h1>
                <p className='mt-4 text-gray-700'>
                    Transform your content creation with our suite of premium AI tools.
                    Write articles, generate images, and enhance your workflow.
                </p>
            </div>
            
            <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs relative z-10'>
                <button 
                    onClick={() => navigate('/ai')} 
                    className='bg-[#8a307f] text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition cursor-pointer'
                >
                    Start creating now
                </button>
                <button className='bg-white px-10 py-3 rounded-lg border border-gray-300
                hover:scale-105 active:scale-95 transition cursor-pointer'>
                    Watch demo
                </button>
            </div>
            
            <div className='flex items-center gap-4 mt-8 mx-auto text-gray-600 relative z-10'>
                <img src={assets.user_group} alt="" className='h-8'/> 
                Trusted by 10k+ people
            </div>
        </div>
    )
}

export default Hero