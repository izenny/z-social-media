import { publicRequest } from "../Request/RequestMethod";

export const UpdateProfileInfo = async (userId, update) => {
  try {
    console.log('update info',update);
    const Info = await publicRequest.put(`users/updateprofile/${userId}`, update);
    console.log("updated profile info", Info.data);
  } catch (err) {
    console.log("profile info updatation err", err);
  }
};

export const uploadProfilePic = async (userId,file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    await publicRequest.post(`users/newProfilePic/${userId}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        },
    });
    return { success: true };
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
};
