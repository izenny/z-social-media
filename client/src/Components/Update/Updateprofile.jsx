import React, { useEffect, useState } from "react";
import { UpdateProfileInfo } from "../../Api/UpdateApi";
import { useParams } from "react-router-dom";
import './Updateprofile.css'
import { ProfileData } from "../../Api/ProfileApi";
const Updateprofile = () => {
  const userId = useParams()
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [Email, setEmail] = useState("");
  const [Dob, setDob] = useState("");
  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const ProfileDataFunction = async () => {
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
    console.log(Firstname, Lastname, Email, Dob);
    UpdateProfileInfo(userId,{Firstname,Lastname,Email,Dob})
  };
  return (
    <div className="update-profile-p">
      <div className="update-profile-c">
        <form action="">
          <label>
            Firstname
            <input
              type="text"
              placeholder={profileInfo && profileInfo.Firstname}
              value={Firstname}
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
              placeholder={profileInfo && profileInfo.Lastname}
              value={Lastname}
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
              placeholder={profileInfo && profileInfo.Email}
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>{" "}
          <br />
          <label>
            DOB
            <input
              type="date"
              placeholder={profileInfo && profileInfo.DOB}
              value={Dob}
              onChange={(e) => {
                setDob(e.target.value);
              }}
            />
          </label>{" "}
          <br />
          <button onClick={SubmitProfileData}>Update</button>
        </form>
      </div>
    </div>
  );
};

export default Updateprofile;
