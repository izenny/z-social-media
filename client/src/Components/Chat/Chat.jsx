// import React, { useEffect, useState } from 'react'
// import '../Chat/Chat.css';
// import { IoMdSend } from 'react-icons/io';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { useParams } from 'react-router-dom';

// import io from 'socket.io-client'
// const socket = io('http://localhost:5002');
// const Chat = ({userId}) => {
//   const {room }= useParams();
  
//   const [messages , setMessages] = useState([]);
//   const [newMessage, setNewMessage]= useState('')
//   useEffect(()=>{
//     socket.emit('join room', room);
//     socket.on('chat message',(msg)=>{
//       setMessages([...messages,msg])
//     });
//     return()=>{
//       socket.off('chat message');
//       socket.disconnect();
//     }
    
//   },[room])
//   const sendMessage = ()=>{
//     if(newMessage.trim()==='') return;
//     socket.emit('chat message', { roomId: room, senderId: userId, content: newMessage });
//     setNewMessage('');
//   }
//   return (
//     <div className='chat-p'>
//       <div className='chat'>
//         <div className='header-chat'>
//           <div className='chat-user-pic'>
//             <img src='https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D' alt='profile-pic' />
//           </div>
//           <div className='chat-user-name'>
//             <h5>name</h5>
//           </div>
//           <div className='chat-header-icon'>
//             <BsThreeDotsVertical />
//           </div>
//         </div>
//         <div className='chat-msgs'>
//           {messages.map((msg, index) => (
//             <div key={index} className={`chat-msg-${msg.sent ? 'send' : 'received'}`}>{msg.message}</div>
//           ))}
//         </div>
//         <div className='footer-chat'>
//           <input
//             type='text'
//             placeholder='Type a message...'
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <IoMdSend className='send-chat-button' onClick={sendMessage} />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chat
// import React, { useEffect, useState } from 'react';
// import '../Chat/Chat.css';
// import { IoMdSend } from 'react-icons/io';
// import { BsThreeDotsVertical } from 'react-icons/bs';
// import { useParams } from 'react-router-dom';
// import io from 'socket.io-client';
// const socket = io('http://localhost:5002');

// const Chat = ({ userId }) => {
//   const { room } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [receiverName, setReceiverName] = useState('');

//   useEffect(() => {
//     socket.emit('join room', room);
//     socket.on('chat message', (msg) => {
//       setMessages([...messages, msg]);
//     });
//     socket.on('participants', (participants) => {
//       const receiver = participants.find((participant) => participant.id !== userId);
//       if (receiver) {
//         setReceiverName(`${receiver.firstname} ${receiver.lastname}`);
//       }
//     });

//     return () => {
//       socket.off('chat message');
//       socket.off('participants');
//       socket.disconnect();
//     };
//   }, [room]);

//   const sendMessage = () => {
//     if (newMessage.trim() === '') return;
//     socket.emit('chat message', { roomId: room, senderId: userId, content: newMessage });
//     setNewMessage('');
//   };
//   console.log("namenamemand",receiverName);
//   return (
//     <div className='chat-p'>
//       <div className='chat'>
//         <div className='header-chat'>
//           <div className='chat-user-pic'>
//             <img src='https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D' alt='profile-pic' />
//           </div>
//           <div className='chat-user-name'>
//             <h5>{receiverName}</h5>
//           </div>
//           <div className='chat-header-icon'>
//             <BsThreeDotsVertical />
//           </div>
//         </div>
//         <div className='chat-msgs'>
//           {messages.map((msg, index) => (
//             <div key={index} className={`chat-msg-${msg.sent ? 'send' : 'received'}`}>{msg.message}</div>
//           ))}
//         </div>
//         <div className='footer-chat'>
//           <input
//             type='text'
//             placeholder='Type a message...'
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
//           />
//           <IoMdSend className='send-chat-button' onClick={sendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;
import React, { useEffect, useState } from 'react';
import '../Chat/Chat.css';
import { IoMdSend } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
const socket = io('http://localhost:5002');

const Chat = ({ userId }) => {
  const {room }= useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [oldmessages, setOldMessages] = useState([]);
  useEffect(() => {
    socket.emit('join room', room);
    socket.on('participants', (participants) => {
      const receiver = participants.find((participant) => participant.id !== userId);
      if (receiver) {
        setReceiverName(`${receiver.firstname} ${receiver.lastname}`);
      }
      console.log('receiverrr',receiver);
    });
    socket.on('oldMessages', (oldmsgs)=>{
      console.log('bvjgfjgvhh',oldmsgs);
      setOldMessages(oldmsgs)
    })
    socket.on('chat message', (msg) => {
      setMessages([...messages, msg]);
      // setMessages((preveMessages)=>[...preveMessages, msg])
    });
    

    return () => {
      // socket.off('chat message');
      // socket.off('participants');
      // socket.disconnect();
    };
  }, [room,messages]);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    socket.emit('chat message', { roomId: room, senderId: userId, content: newMessage });
    setNewMessage('');
  };

  return (
    <div className='chat-p'>
      <div className='chat'>
        <div className='header-chat'>
          <div className='chat-user-pic'>
            <img src='https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D' alt='profile-pic' />
          </div>
          <div className='chat-user-name'>
            <h5>{receiverName}</h5>
          </div>
          <div className='chat-header-icon'>
            <BsThreeDotsVertical />
          </div>
        </div>
        <div className='chat-msgs'>
          {/* {messages.map((msg, index) => (
            <div key={index} className={`chat-msg-${msg.sent ? 'send' : 'received'}`}>{msg.message}</div>
          ))} */}
          {oldmessages.map((msg, index) => (
  <div key={index} className={`chat-msg-${msg.sender === userId ? 'send' : 'received'}`}>
    {msg.content}
  </div>
))}
        </div>
        <div className='footer-chat'>
          <input
            type='text'
            placeholder='Type a message...'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <IoMdSend className='send-chat-button' onClick={sendMessage} />
        </div>
      </div>
    </div>
  );
};

export default Chat;
