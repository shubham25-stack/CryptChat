import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData } from '../assets/assets';

const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const currentUserId = '680f50e4f10f3cd28382ecf9'; // your user's ID
  const scrollEnd = useRef()
  useEffect(() =>{
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  },[])
  return selectedUser ? (
    <div className='h-full overflow-hidden relative backdrop-blur-lg flex flex-col'>
      {/* Header */}
      <div className='flex items-center justify-between py-3 px-4 border-b border-stone-500'>
        {/* Left side */}
        <div className='flex items-center gap-3'>
          <img src={assets.profile_martin} alt="" className='w-8 rounded-full' />
          <p className='text-white flex items-center gap-2'>
            Martin Johnson
            <span className='w-2 h-2 rounded-full bg-green-500'></span>
          </p>
          <img
            onClick={() => setSelectedUser(null)}
            src={assets.arrow_icon}
            alt="Back"
            className='md:hidden max-w-7 cursor-pointer'
          />
        </div>

        {/* Right side */}
        <img
          src={assets.help_icon}
          alt="Help"
          className='max-md:hidden max-w-5 cursor-pointer'
        />
      </div>

      {/* Chat Content */}
      <div className='flex-1 overflow-y-scroll p-3 space-y-4'>
        {messagesDummyData.map((msg, index) => {
          const isSender = msg.senderId === currentUserId;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Message */}
              {msg.image ? (
                <img
                  src={msg.image}
                  alt=''
                  className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8'
                />
              ) : (
                <p
                  className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all text-white ${
                    isSender
                      ? 'bg-violet-500/30 rounded-br-none'
                      : 'bg-gray-800/30 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </p>
              )}

              {/* Avatar and Time */}
              <div className="text-center text-xs text-gray-500">
                <img
                  src={isSender ? assets.avatar_icon : assets.profile_martin}
                  alt=""
                  className='w-7 rounded-full mb-1'
                />
                <p>{msg.createdAt}</p>
              </div>
            </div>
          );
        })}
        <div ref={scrollEnd}>

        </div>
      </div>
    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden h-full w-full'>
      <img src={assets.logo_icon} alt="" className='max-w-16' />
      <p className='text-lg font-medium text-white'>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;
