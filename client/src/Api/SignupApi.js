import axios from "axios";
import { publicRequest } from "../Request/RequestMethod";

export const SignUpData = async (signup) => {
  console.log("signup data check one ", signup);
  try {
    console.log("signup data check one ", signup);
    // const res = await axios.post('http://localhost:5001/users',signup)
    const res = await publicRequest.post("users", signup);
    console.log("final sigup data check", res);
  } catch (err) {
    console.log("signup data err", err);
  }
};
