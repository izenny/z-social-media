import { publicRequest } from "../Request/RequestMethod";

export const usersData = async () => {
  try {
    const usersdetails = await publicRequest.get("users");
    console.log("usersss", usersdetails);
    return usersdetails.data;
  } catch (err) {
    console.log("users error", err);
  }
};
export const friedRequest = async (userId, FrireqId) => {
  try {
    const usersreq = await publicRequest.put(
      `users/friendreq/${userId}?friendreqId=${FrireqId}`
    );
    console.log("usersss req", usersreq);
  } catch (err) {
    console.log("users req error", err);
  }
};
// export const friedRequestGet = async(userId)=>{
//     try{
//         const requestf = await publicRequest.get(`users/friendreq/${userId}`)
//         console.log('req',requestf.data);
//         return requestf.data
//     }catch(err){
//         console.log('err fetching req',err);
//     }
// }
export const SearchApi = async (searchText) => {
  try {
    const search = await publicRequest.get(`users/search/${searchText}`);
    console.log("search data in api", search.data);
    return search.data;
  } catch (err) {
    console.log("search errorr in jsx");
  }
};
