import React,{ useState } from 'react'
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'

const HomePage = () => {

    const [selectedUser, setSelectedUser] = useState(false);

  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div  className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-full grid grid-cols-1 relative ${
    selectedUser
      ? 'md:[grid-template-columns:1fr_1.5fr_1fr] xl:[grid-template-columns:1fr_2fr_1fr]'
      : 'md:grid-cols-2'
  }`}>
        <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} /> 
        <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
        <RightSidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

        </div>
    </div>
  )
}

export default HomePage
