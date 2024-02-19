import React from 'react'
import '../Chat/Chat.css';
import { IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
const Chat = () => {
  return (
    <div className='chat-p'>
      <div className='chat'>
        <div className='header-chat'>
          <div className='chat-user-pic'>
            <img src='https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D' alt='profile-pic' />
          </div>
          <div className='chat-user-name'>
            <h5>name</h5>
          </div>
          <div className='chat-header-icon'>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className='chat-msgs'>
          
          <div className="chat-msg-received">hello there!</div>

          <div className="chat-msg-send">hi vcjgcfgcgfcgfcgcfcgc Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat laudantium culpa accusantium velit eos numquam voluptates harum unde doloremque eveniet. Ducimus, quasi? Repellendus vero quaerat, voluptatum doloremque ipsum veritatis odit.im hererererereererer</div>
          
        </div>
        <div className='footer-chat'>
          <input type='text' placeholder='Type a message...' />
          <IoMdSend className='send-chat-button' />
        </div>
      </div>
    </div>
  )
}

export default Chat
