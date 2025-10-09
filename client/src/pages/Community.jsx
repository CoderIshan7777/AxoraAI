import { useAuth, useUser } from '@clerk/clerk-react'
import React, { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Community = () => {
  const [creations, setCreations] = useState([])
  const { user } = useUser()
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get(
        'http://localhost:3000/api/user/get-published-creations',
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
    setLoading(false)
  }

  const imageLikeToggle = async (id) => {
    try {
      // Fixed: Pass id as query parameter or use POST with body
      const { data } = await axios.post(
        'http://localhost:3000/api/user/toggle-like-creations',
        { id }, // Send id in request body
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchCreations()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user) {
      fetchCreations()
    }
  }, [user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span className='w-10 h-10 my-1 rounded-full border-3 border-primary border-t-transparent animate-spin'></span>
      </div>
    )
  }

  return (
    <div className="bg-[#E8DFCA] h-full w-full  overflow-y-scroll p-3">
      <h2 className="text-2xl font-bold mb-4">Creations</h2>
      {creations.length === 0 ? (
        <p className="text-gray-500 text-center py-8">No creations yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {creations.map((creation, index) => (
            <div key={index} className="relative group">
              <img
                src={creation.content}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute bottom-0 top-0 right-0 left-0 flex gap-2
                items-end justify-end group-hover:justify-between p-3
                group-hover:bg-gradient-to-b from-transparent to-black/80 text-white
                rounded-lg">
                <p className="text-sm hidden group-hover:block">{creation.prompt}</p>
                <div className="flex gap-1 items-center">
                  <p>{creation.likes.length}</p>
                  <Heart
                    onClick={() => imageLikeToggle(creation._id || creation.id)}
                    className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                      user && creation.likes.includes(user.id)
                        ? 'fill-red-500 text-red-600'
                        : 'text-white'
                    }`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Community