
import { publicRequest } from "../Request/RequestMethod";

export const ChatDataApi =async (userId)=>{
    try{
        console.log('useriddddddddddddddddddd',userId);
        const chats = await publicRequest.get(`chat/getchat/${userId}`)
        console.log('chatsss',chats.data);
        return chats.data
    }catch(err){
        console.log('error in fetching chat');
    }
}
export const NewChatApi = async (ids)=>{
    try{
        console.log('avdhfvahgd',ids);
        const newChat = await publicRequest.post('chat/newchat',ids)
        console.log('new chat in api',newChat);
        return newChat
    }catch(err){
        console.log('error in new chat');
    }
}