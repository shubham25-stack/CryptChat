import React from 'react'
import assets, { userDummyData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ selectedUser, setSelectedUser }) => {
  const navigate = useNavigate();
  return (
    <div className={`bg-white/10 h-full p-5 rounded-r-xl overflow-y-scroll text-white ${selectedUser ? "max-md:hidden" : ''}`}>
      {/* Top Section */}
      <div className='pb-5'>
        <div className='flex justify-between items-center'>
          <img src={assets.logo} alt="logo" className='max-w-40' />
          <div className="relative py-2 group">
            <img src={assets.menu_icon} alt="menu_icon" className='max-h-5 cursor-pointer' />
            <div className='absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#1f1a17] border border-orange-500/40 text-gray-100 hidden group-hover:block'>
              <p onClick={() => navigate('/profile')} className='cursor-pointer text-sm hover:text-orange-400'>Edit Profile</p>
              <hr className='my-2 border-t border-orange-500/40' />
              <p className='cursor-pointer text-sm hover:text-orange-400'>Logout</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className='bg-white/10 rounded-full flex items-center gap-2 py-3 px-4 mt-5 border border-orange-500/30'>
          <img src={assets.search_icon} alt="Search" className='w-3' />
          <input
            type="text"
            className='bg-transparent border-none outline-none text-white text-xs placeholder-gray-400 flex-1'
            placeholder='Search User...'
          />
        </div>
      </div>

      {/* User List */}
      <div className='flex flex-col'>
        {userDummyData.map((user, index) => (
          <div
            onClick={() => { setSelectedUser(user) }}
            key={index}
            className={`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm 
              ${selectedUser?._id === user._id ? 'bg-gradient-to-r from-orange-700/50 to-orange-500/30' : 'hover:bg-white/5'}
            `}
          >
            <img src={user?.profilePic || assets.avatar_icon} alt="" className='w-[35px] aspect-[1/1] rounded-full' />
            <div className='flex flex-col leading-5'>
              <p>{user.fullName}</p>
              {index < 3
                ? <span className='text-green-400 text-xs'>Online</span>
                : <span className='text-neutral-400 text-xs'>Offline</span>
              }
            </div>

            {/* Unread messages badge */}
            {index > 2 && (
              <p className='absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-gradient-to-r from-orange-600 to-orange-500'>
                {index}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
