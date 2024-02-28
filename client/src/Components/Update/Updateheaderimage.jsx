import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { uploadHeaderPic } from '../../Api/UpdateApi';

const Updateheaderimage = () => {
    const { userId } = useParams();
    const [file , setFile] = useState(null)
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
      };
      const handleUpload = async () => {
        if (!file) {
          alert("Please select a file");
          return;
        }
    
        const result = await uploadHeaderPic(userId,file);
    
        if (result.success) {
          alert("Image uploaded successfully");
        } else {
          alert("Failed to upload image");
        }
      };
  return (
    <div>
      <h2>Update Header Image</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!file}>
        Upload
      </button>
    </div>
  )
}

export default Updateheaderimage
