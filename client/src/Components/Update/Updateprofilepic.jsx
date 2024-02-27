import React, { useState } from "react";
import { uploadProfilePic } from "../../Api/UpdateApi";
import { useParams } from "react-router-dom";

const Updateprofilepic = () => {
    const { userId } = useParams();
    console.log('idddddd',userId);
    const [file , setFile] = useState(null)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const handleUpload = async () => {
        if (!file) {
          alert("Please select a file");
          return;
        }
    
        const result = await uploadProfilePic(userId,file);
    
        if (result.success) {
          alert("Image uploaded successfully");
        } else {
          alert("Failed to upload image");
        }
      };
  return (
    <div>
      <h2>Update Profile Picture</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  );
};

export default Updateprofilepic;
