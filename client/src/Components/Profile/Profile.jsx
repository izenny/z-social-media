import React from 'react'
import '../Profile/Profile.css'
import { FaUserFriends , FaEdit} from "react-icons/fa";
import { BsPostcardHeart } from "react-icons/bs";
const Profile = () => {
  return (
    <div className='profile-p'> 
      <div className="profile-c">
        <div className="header-img">
            <img src="https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
            {/* <FaEdit className='edit-icon'/> */}
        </div>
        <div className="profile-img">
            <img src="https://images.unsplash.com/photo-1594751543129-6701ad444259?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGFyayUyMHByb2ZpbGV8ZW58MHx8MHx8fDA%3D" alt="" />
            {/* <FaEdit className='edit-icon'/> */}
        </div>
        <div className="user-name">
            <h2>name</h2>
        </div>
        <div className="user-profile-icons">
            <div className="user-friends">
                <FaUserFriends className='profile-icon'/>
                <span className='profile-count'>28 friends</span>
            </div>
            <div className="user-posts">
                <BsPostcardHeart className='profile-icon'/>
                <span className='profile-count'>28 posts</span>
            </div>
        </div>
        <div className="user-profile">

        </div>
      </div>
    </div>
  )
}

export default Profile
