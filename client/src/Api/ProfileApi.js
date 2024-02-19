import { publicRequest } from "../Request/RequestMethod";

export const ProfileData = async (id) => {
  try {
    const ProfileDataFetched = await publicRequest.get(`users/${id}`);
    console.log("profile data", ProfileDataFetched.data);
    return ProfileDataFetched.data;
  } catch (err) {
    console.log(err);
  }
};
