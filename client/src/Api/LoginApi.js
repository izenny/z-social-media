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
