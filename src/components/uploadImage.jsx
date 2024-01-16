import { useState } from "react";
import axios from "axios";

const ImageUploader = () => {

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

    
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

    
  const handleUpload = async () => {
    if (!selectedFile || uploading) {
      return;
    }

    try {
      setUploading(true);

      // Use FormData to send the file
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Make the POST request to the server
      const response = await axios.post(
        "https://squid-app-doa5g.ondigitalocean.app/api/image/convert/to/jpeg",
        formData
      );

      console.log("Upload successful:", response.data);

      // Reset state after successful upload
      setSelectedFile(null);

        alert("Upload successful!");
        
      window.location.reload();
    
    } catch (error) {
    
        console.error("Upload failed:", error);
    
        alert("Upload failed!");

      // Clear the selectedFile state to avoid carrying over the previous image
     
        setSelectedFile(null);
    
    } finally {
    
        setUploading(false);
    }
  };

  return (
    <div>
      <h5 className="border rounded-2 p-2 mb-2 text-success">
        Upload Raw Image
      </h5>
      <input type="file" accept="*" onChange={handleFileChange} />
      <button
        className="w-100 mt-2"
        onClick={handleUpload}
        disabled={!selectedFile || uploading}
      >
        Upload
      </button>
      <hr />
    </div>
  );
};

export default ImageUploader;
