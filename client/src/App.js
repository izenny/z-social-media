import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Profile from "./Components/Profile/Profile";
import Chat from "./Components/Chat/Chat";
import Notifications from "./Components/Notifications/Notifications";
import Search from "./Components/Search/Search";
import Makepost from "./Components/Post/Makepost";
import SignUp from "./Account/Signup";
import Login from "./Account/Login";
import "./App.css";
import Post from "./Components/Post/Post";
import Messages from "./Components/Messages/Messages";

import Friends from "./Components/Friends/Friends";
import Settings from "./Components/Settings/Settings";
import Updateprofile from "./Components/Update/Updateprofile";
import Searchresults from "./Components/Search/Searchresults";

import Email from "./Account/Email";
import Changepassword from "./Components/Password/Changepassword";
import Updateprofilepic from "./Components/Update/Updateprofilepic";
import { UpdateProfileInfo } from "./Api/UpdateApi";

function App() {
  const userData = useSelector((state) => state.userDetails.userInfo[0]);
  const loggedUserId = userData && userData._id;
  const Token = userData && userData.accessToken;

  return (
    <BrowserRouter>
      <div className="App">
        {Token ? (
          <>
            <div className="left">
              <Navbar />
            </div>
            <div className="middle">
              <div className="middle-top">
                <div className="search">
                  <Search />
                </div>
                <div className="makepost">
                  <Makepost />
                </div>
              </div>
              <div className="main">
                <Routes>
                  <Route path="/" element={<Home userId={loggedUserId} />} />

                  <Route
                    path="/profile"
                    element={<Profile userId={loggedUserId} />}
                  >
                    <Route path="/profile/post" element={<Post />} />
                    <Route path="/profile/friends" element={<Friends />} />
                  </Route>

                  <Route
                    path="/messages/:room"
                    element={<Chat userId={loggedUserId} />}
                  />
                  <Route path="/settings" element={<Settings userId={loggedUserId} />} />
                  <Route
                    path="/settings/updateProfile"
                    element={<Updateprofile />}
                  />
                  <Route
                    path="/searchresults/:searchresults"
                    element={<Searchresults />}
                  />
                  <Route path="settings/updateProfile/:userId" element = {<Updateprofile/>}/>

                  <Route path="settings/UploadPrfilePic/:userId" element = {<Updateprofilepic/>}/>
                </Routes>
              </div>
            </div>
            <div className="right">
              <div className="right-p">
                <Routes>
                  <Route
                    path="/notifications"
                    element={<Notifications userId={loggedUserId} />}
                  />
                  <Route path="/messages/*" element={<Messages />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgotpassword" element={<Email />} />
            <Route path="/reset-password" element={<Changepassword/>}/>
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
