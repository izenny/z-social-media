import React, { useEffect, useState } from "react";
import { UpdateProfileInfo } from "../../Api/UpdateApi";
import { useParams } from "react-router-dom";
import './Updateprofile.css'
import { ProfileData } from "../../Api/ProfileApi";
const Updateprofile = () => {
  const {userId} = useParams()
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  // const [Dob, setDob] = useState("");
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const ProfileDataFunction = async () => {
      console.log('iiiiiiiii',userId);
      try {
        const fetchedProfileData = await ProfileData(userId);
        setProfileInfo(fetchedProfileData);
        console.log(fetchedProfileData);
      } catch (err) {
        console.log("err prfilee", err);
      }
    };
    ProfileDataFunction();
  }, [userId]);
  const SubmitProfileData = () => {
    console.log(firstname, lastname, email);
    UpdateProfileInfo(userId,{firstname,lastname,email})
  };
  return (
    <div className="update-profile-p">
      <div className="update-profile-c">
        <form >
          <label>
            Firstname
            <input
              type="text"
              placeholder={profileInfo && profileInfo.firstname}
              value={firstname}
              onChange={(e) => {
                setFirstname(e.target.value);
              }}
            />
          </label>{" "}
          <br />
          <label>
            Lastname
            <input
              type="text"
              placeholder={profileInfo && profileInfo.lastname}
              value={lastname}
              onChange={(e) => {
                setLastname(e.target.value);
              }}
            />
          </label>{" "}
          <br />
          <label>
            Email
            <input
              type="email"
              placeholder={profileInfo && profileInfo.email}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>{" "}
          <br />
          {/* <label>
            DOB
            <input
              type="date"
              placeholder={profileInfo && profileInfo.dob}
              value={Dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </label>{" "}
          <br /> */}
          <button onClick={SubmitProfileData}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
