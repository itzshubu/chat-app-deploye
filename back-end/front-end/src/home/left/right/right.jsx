import React from 'react'
import Chatuser from './Chatuser'
import Messages from './messages'
import  SendMessage from "./sendmessage"

const  right = () => {
  return (
    <div className='bg-slate-900 sm:w-[70%] text-white'>
      <Chatuser/>
      <Messages/>
      <SendMessage/>
    </div>
  )
}

export default  right