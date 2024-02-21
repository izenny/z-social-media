import React, { useEffect, useState } from "react";
import "../Messages/Messages.css";
import { ChatDataApi } from "../../Api/ChatApi";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Messages = () => {
  const [chatmsg, setChatmsg] = useState([]);

  const userData = useSelector((state) => state.userDetails.userInfo[0]);
  if (userData) {
    var userId = userData._id;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("useriddddddd", userId);
        const chatdata = await ChatDataApi(userId);
        setChatmsg(chatdata);
      } catch (err) {
        console.log("Error fetching chat data:", err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="messages-c">
      {chatmsg ? (
        chatmsg.map((msg) => {
          var receiver = msg.participants.find((p) => p._id !== userId);

          return (
            <NavLink to={`/messages/${msg.room}`}  style={{ textDecoration: 'none', color: 'inherit' ,cursor:'pointer'}}>
              <div className="messages-c-msg" key={msg.id}>
                <div className="message-user-pic">
                  <img
                    src="https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
                    alt="profile-pic"
                  />
                </div>
                <div className="message-content-msg">
                  <div>
                    <p className="message-sender-name">
                      {" "}
                      {receiver.firstname} {receiver.lastname}
                    </p>
                    <p className="message-text-msg">
                      {msg.lastMessage
                        ? msg.lastMessage.content
                        : "start texting"}
                    </p>
                  </div>
                  <div className="message-time-msg">
                    <p>{msg.timestamp}</p>
                  </div>
                </div>
              </div>
            </NavLink>
          );
        })
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};

export default Messages;
