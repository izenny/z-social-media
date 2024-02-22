import React, { useEffect, useState } from 'react'
import Post from '../Post/Post'
import { FriendsApi } from '../../Api/FriendsApi'

const Home = ({ userId }) => {
  const [fuserIds, setFuserIds] = useState([])
  useEffect(()=>{
    const fetchingFriendsFunction = async ()=>{
      try{
        const fetchedFriends = await FriendsApi( userId );
        const Ids = [ userId , ...fetchedFriends];
         setFuserIds(Ids)
        console.log("friends",fetchedFriends);
        console.log("friendss",fuserIds);

      }catch(err){
        console.log('err in fetching friends jsx',err);
      }
    }
    fetchingFriendsFunction();
    console.log("friendssssssss",fuserIds);
  },[userId])
  return (
    <div>
      <Post friendsId={fuserIds} />
      {console.log('helololo',fuserIds)}
    </div>
  )
}

export default Home
