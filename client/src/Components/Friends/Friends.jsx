import React from "react";
import "../Friends/Friends.css";
import { MdMessage } from "react-icons/md";
import { MdPersonRemove } from "react-icons/md";
import {
  AiOutlineUserAdd,
  AiOutlineUserDelete,
  AiOutlineMessage,
  AiOutlineDelete,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { NewChatApi } from "../../Api/ChatApi";
import { AddFriendApi } from "../../Api/FriendsApi";
const Friends = ({ userId, friends, friendrequests }) => {
  const startChat = async (friendId) => {
    try {
      
      console.log('avdhfvahgd',userId);
      console.log('avdhfvahgd',friendId);
      const newChat = await NewChatApi({userId,friendId})
      console.log('new chat', newChat);
    } catch (err) {
      console.log("Error starting chat:", err);
    }
  };

   const acceptFriendReq = async (requestId)=>{
    console.log('fiddd',requestId);
    await AddFriendApi(userId, { requestId });
   }
  const deleteFriendReq =async (requestId)=>{
    console.log('delete logic');
  }
  return (
    <div className="friends-p">
      <div className="friends-c">
        {friends ? (
          friends.map((friend) => (
            <div className="friend" key={friend._id}>
              <div className="friend-profile-pic">
                <img
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <div className="friend-name">
                <h6>
                  {" "}
                  {friend.firstname} {friend.lastname}{" "}
                </h6>
              </div>
              <div className="friend-icons">
                <NavLink to={"/messages"}>
                  <div className="friend-message" onClick={()=>startChat(friend._id)}>
                    <AiOutlineMessage />
                  </div>
                </NavLink>
                <div className="friend-remove">
                  <AiOutlineUserDelete />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no friends</h2>
        )}
        {friendrequests ? (
          friendrequests.map((request) => (
            <div className="friend" key={request._id}>
              <div className="friend-profile-pic">
                <img
                  src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                  alt=""
                />
              </div>
              <div className="friend-name">
                <h6>
                  {" "}
                  {request.firstname} {request.lastname}{" "}
                </h6>
              </div>
              <div className="friend-icons">
                <div className="friend-message">
                  <AiOutlineUserAdd  onClick={()=>acceptFriendReq(request._id)}/>
                </div>
                <div className="friend-remove">
                  <AiOutlineDelete onClick={()=>deleteFriendReq(request._id)}/>
                </div>
              </div>
            </div>
          ))
        ) : (
          <h2>no friend requests</h2>
        )}
      </div>
    </div>
  );
};

export default Friends;
