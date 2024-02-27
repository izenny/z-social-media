import { publicRequest } from "../Request/RequestMethod";

export const UpdateProfileInfo = async (id, update) => {
  try {
    const Info = await publicRequest.put(`users/updateprofile/${id}`, update);
    console.log("updated profile info", Info.data);
  } catch (err) {
    console.log("profile info updatation err", err);
  }
};

export const uploadProfilePic = async (id,file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    await publicRequest.post(`users/newProfilePic/${id}`,formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        },
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return { success: false, error: "Failed to upload image" };
  }
};
