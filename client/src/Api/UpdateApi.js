import { publicRequest } from "../Request/RequestMethod"

export const UpdateProfileInfo = async (id,update)=>{
    try{
        const Info = await publicRequest.put(`/updateprofile/${id}`,update)
        console.log('updated profile info',Info.data);
    }catch(err){
        console.log('profile info updatation err',err);
    }
}