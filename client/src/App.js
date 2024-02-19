import Chat from "./Components/Chat/Chat";
import Navbar from "./Components/Navbar/Navbar";
import Notifications from "./Components/Notifications/Notifications";
import Profile from "./Components/Profile/Profile";
import './App.css'
import Home from './Components/Home/Home'
import{BrowserRouter, Route, Routes} from 'react-router-dom'
import Search from "./Components/Search/Search";
import Makepost from "./Components/Post/Makepost";
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="left">
        <Navbar/>
      </div>
      <div className="middle">
        <div className="middle-top">
          <div className="search">
            <Search/>
          </div>
          <div className="makepost">
            <Makepost/>
          </div>
        </div>
        <div className="main">
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/messages" element={<Chat/>}/>
            
            {/* <Route path="settings" element={}/> */}
            {/* <Route path="" element={}/> */}
            
          </Routes>
        </div>
      </div>
      <div className="right">
        <div className="right-p">
          <Routes>
            <Route path="/notifications" element={<Notifications/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
