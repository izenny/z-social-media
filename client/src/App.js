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
import { FriendsApi } from "./Api/FriendsApi";

function App() {
  const userData = useSelector((state) => state.userDetails.userInfo[0]);
  const loggedUserId = userData && userData._id
  const Token = userData && userData.accessToken;
  const [fuserIds, setFuserIds] = useState([])
  useEffect(()=>{
    const fetchingFriendsFunction = async ()=>{
      try{
        const fetchedFriends = await FriendsApi(loggedUserId);
        const Ids = [loggedUserId, ...fetchedFriends];
        setFuserIds(Ids)
        console.log("friends",fetchedFriends);
        console.log("friendss",fuserIds);

      }catch(err){
        console.log('err in fetching friends jsx',err);
      }
    }
    fetchingFriendsFunction();
  },[loggedUserId])
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
                  <Route path="/" element={<Post friendsId={fuserIds}/>} />
                  <Route path="/profile" element={<Profile userId ={loggedUserId} />} >
                    <Route path="*" element={<Post />} />
                  </Route>
                  <Route path="/messages" element={<Chat />} />
                  {/* <Route path="/notifications" element={<Notifications />} /> */}
                </Routes>
              </div>
            </div>
            <div className="right">
              <div className="right-p">
                <Routes>
                  <Route path="/notifications" element={<Notifications />} />
                  <Route path="/messages" element={<Messages />} />
                </Routes>
              </div>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
