import { publicRequest } from "../Request/RequestMethod";

export const ProfileData = async (userId) => {
  try {
    const ProfileDataFetched = await publicRequest.get(`users/${userId}`);
    console.log("profile data", ProfileDataFetched.data);
    return ProfileDataFetched.data;
  } catch (err) {
    console.log(err);
  }
};
