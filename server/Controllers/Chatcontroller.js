const Chat = require("../Modals/Chatschema");
const uuid = require("uuid")
const User = require('../Modals/Userschema')
exports.joinRoom = async (socket, room)=>{
  try {
    socket.join(room);
    const chat = await Chat.findOne({ room: room });
    if (!chat) {
      console.log('Chat not found for room:', room);
      return [];
    }
    const participantIds = chat.participants;
    const participants = await User.find({ _id: { $in: participantIds } }, 'firstname lastname');
    const participantData = participants.map(participant => ({
      id: participant._id,
      firstname: participant.firstname,
      lastname: participant.lastname,
    }));
    console.log('Emitting participants:', participantData);
    socket.emit('participants', participantData);

    const messages = chat.messages;
    console.log('Emitting old messages:', messages);
    socket.emit('oldMessages', messages);
  } catch (err) {
    console.log('Error joining room:', err);
    return [];
  }
}

exports.sendMessage = async (io, socket, data) => {
  try {
    const { roomId, senderId, content } = data;
    const chat = await Chat.findOne({ room: roomId });
    if (!chat) {
      console.log('Chat not found for room:', roomId);
      return;
    }
    const newMessage = {
      sender: senderId,
      content: content,
    };
    chat.messages.push(newMessage);
    await chat.save();

    console.log('Emitting chat message:', newMessage);
    io.to(roomId).emit('chat message', newMessage);
  } catch (err) {
    console.log('Error sending message:', err);
  }
};
exports.fetchMessages = async (socket, room) => {
  try {
    const chat = await Chat.findOne({ room: room });
    if (!chat) {
      console.log('Chat not found for room:', room);
      return [];
    }
    const messages = chat.messages;
    console.log('Fetched messages:', messages);
    socket.emit('oldMessages', messages);
  } catch (err) {
    console.log('Error fetching messages:', err);
    return [];
  }
};
exports.disconnect = (socket) => {
  console.log("User disconnected : ", socket.id);
};
// create new chat

exports.NewChat = async (req, res)=>{
  const {userId, friendId} = req.body
  try{
    const chat = await Chat.findOne({
      participants:{$all : [userId,friendId] }
    })
    if(!chat){
      const roomId = uuid.v4()
      console.log('room id',roomId)
      const newChat = new Chat({
        room:roomId,
        participants:[userId,friendId],
      })
      await newChat.save()
      res.status(200).json(newChat)
    }else{
      res.status(200).json(chat)
    }
  }catch(err){
    console.log('got error when creating new chat ',err);
    res.status(500).json({ message: "crte chat Error" });
  }
}

// exports.getChats = async (req, res) => {
//   try {
//     const userId = req.params.userId;
//     console.log('user iiiiidd', userId);
//     const chats = await Chat.find({
//       participants: userId
//     })
//       .populate("participants", "firstname lastname")
//       .populate({
//         path: 'messages',
//         options: { sort: { timestamp: -1 }, limit: 1 },
//         populate: { path: 'sender', select: 'firstname lastname' }
//       });

//     const formattedChats = chats.map(chat => {
//       const lastMessage = chat.messages.length > 0 ? {
//         sender: chat.messages[0].sender.firstname + ' ' + chat.messages[0].sender.lastname,
//         content: chat.messages[0].content,
//         timestamp: chat.messages[0].timestamp,
//         id : chat._id,
//       } : null;

//       return {
//         participants: chat.participants,
//         room: chat.room,
//         lastMessage: lastMessage,
//         id : chat._id,
        

//       };
//     });
//     console.log(formattedChats);
//     res.status(200).json(formattedChats);
//   } catch (err) {
//     console.log('got error when fetching chats', err);
//     res.status(500).json({ message: "create chat Error" });
//   }
// }
exports.getChats = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('user id:', userId);
    const chats = await Chat.find({
      participants: userId
    })
      .populate("participants", "firstname lastname")
      .populate({
        path: 'messages',
        options: { sort: { timestamp: -1 }, limit: 1 }, // Sort messages by timestamp and limit to 1
        populate: { path: 'sender', select: 'firstname lastname' }
      });

    const formattedChats = chats.map(chat => {
      const lastMessage = chat.messages.length > 0 ? {
        sender: chat.messages[0].sender.firstname + ' ' + chat.messages[0].sender.lastname,
        content: chat.messages[0].content,
        timestamp: chat.messages[0].timestamp,
        id: chat.messages[0]._id, // Assuming this is the message id
      } : null;

      return {
        participants: chat.participants,
        room: chat.room,
        lastMessage: lastMessage,
        id: chat._id,
      };
    });

    console.log('formatted chats:', formattedChats);
    res.status(200).json(formattedChats);
  } catch (err) {
    console.log('error fetching chats:', err);
    res.status(500).json({ message: "Error fetching chats" });
  }
}
