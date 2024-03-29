import { publicRequest } from "../Request/RequestMethod";

export const FriendsApi = async (id) => {
  try {
    const friends = await publicRequest.get(`users/friends/${id}`);
    console.log('friendssssapi',friends.data.friends);
    return friends.data.friends;
  } catch (err) {
    console.log("err in friends api", err);
  }
};
export const AddFriendApi = async (userId, requestId ) => {
  try {
    const newFriend = await publicRequest.post(
      `users/addfriend/${userId}`,
      requestId 
    );
    console.log("new friend added");
  } catch (err) {
    console.log("err in addfriends api", err);
  }
};
