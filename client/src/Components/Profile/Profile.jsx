import React, { useEffect, useState } from "react";
import "../Profile/Profile.css";
import { FaUserFriends, FaEdit } from "react-icons/fa";
import { BsPostcardHeart } from "react-icons/bs";
import { Link, Route, Routes } from "react-router-dom";
import Post from "../Post/Post";

import { ProfileData } from "../../Api/ProfileApi";
import Friends from "../Friends/Friends";

const Profile = ({ userId }) => {
  const [profileInfo, setProfileInfo] = useState(null);
  useEffect(() => {
    const ProfileDataFunction = async () => {
      try {
        const fetchedProfileData = await ProfileData(userId);
        setProfileInfo(fetchedProfileData);
        console.log(fetchedProfileData);
      } catch (err) {
        console.log("err prfilee", err);
      }
    };
    ProfileDataFunction();
  }, [userId]);
  return (
    <div className="profile-p">
      <div className="profile-c">
        {profileInfo ? (
          <>
            <div className="header-img">
              <img src={`../images/${profileInfo.headerImage}`} alt="" />
            </div>
            <div className="profile-img">
              <img
                src={`../images/${profileInfo.profilePic}`}
                alt="profile pic"
              />
            </div>
            <div className="user-name">
              <h2>{profileInfo.firstname} {profileInfo.lastname}</h2>
            </div>
            <div className="user-profile-icons">
              <Link
                to={"/profile/friends"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <div className="user-friends">
                  <FaUserFriends className="profile-icon" />
                  <span className="profile-count">
                    {profileInfo.friends.length} friends
                  </span>
                </div>
              </Link>
              <Link
                to={"/profile/post"}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                <div className="user-posts">
                  <BsPostcardHeart className="profile-icon" />
                  <span className="profile-count">
                    {profileInfo.posts.length} posts
                  </span>
                </div>
              </Link>
            </div>
            <div className="user-profile">
              <Routes>
                <Route path="post" element={<Post friendsId={[userId]} />} />
                <Route
                  path="friends"
                  element={
                    <Friends
                      userId={userId}
                      friends={profileInfo.friends}
                      friendrequests={profileInfo.friendrequest}
                    />
                  }
                />
              </Routes>
            </div>
          </>
        ) : (
          <h2>Loading profile....</h2>
        )}
      </div>
    </div>
  );
};

export default Profile;
