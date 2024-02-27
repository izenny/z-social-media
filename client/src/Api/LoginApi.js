import { publicRequest } from "../Request/RequestMethod";
import { userActive } from "../Redux/Userredux";
export const LoginData = async (Dispatch, login) => {
  try {
    console.log("first login check");
    const res = await publicRequest.post("users/login", login);
    Dispatch(userActive(res.data));
    console.log("final login check", res.data);
  } catch (err) {
    console.log("login error", err);
  }
};

export const resetPassEmail = async(email)=>{
  try{
    const Email = await publicRequest.post('users/resetpassword',email)
    console.log('email send',Email.data);
  }catch(err){
    console.log('email send err',err);
  }
}

export const newPasswordApi = async(emailpasstoken)=>{
  try{
    const pass = await publicRequest.post('users/newpassword',emailpasstoken);
    console.log('password reseted',pass.data);
  }catch(err){
    console.log('err in password reset',err);
  }
}
