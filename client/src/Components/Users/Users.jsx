import React, { useState } from "react";
import "./Users.css";
import { AiOutlineUserAdd, AiOutlineUserDelete } from "react-icons/ai";
const Users = ({searchResults}) => {
  const [added, setAdded] = useState(false);

  const addFunction = () => {
    setAdded(!added);
  };
  return (
    <div>
      {searchResults ? (searchResults.map((user)=>(
         <div className="user-page"  key={user._id}>
         <div className="user-info">
           <div className="user-avatar">
             <img
               src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
               alt=""
             />
           </div>
           <div className="user-title">{user.firstname} {user.lastname}</div>
           <div className="user-subtitle">CEO &amp; Co-Founder</div>
           <div className="user-add-button" >
             <button className="user-add-b" onClick={()=>addFunction(user._id)}>
               <span className="user-span-add">
                 {added ? (
                   <AiOutlineUserDelete className="user-icon-add" />
                 ) : (
                   <AiOutlineUserAdd className="user-icon-add" />
                 )}
               </span>
               <p className="user-text-add">{added ? "Added" : "Add Friend"}</p>
             </button>
           </div>
         </div>
         </div>
      ))):(<h2>no users </h2>)}
     
      
    </div>
  );
};

export default Users;
