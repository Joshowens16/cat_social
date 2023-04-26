import React, { ChangeEvent, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { GrAdd } from "react-icons/gr";

import "./uploadPost.css";
const UploadPost = () => {
  const [post, setPost] = useState(null);
  const username = useSelector((state: RootState) => state.user.username);
  const userID = useSelector((state: RootState) => state.user.id);

  // console.log(userId);
  const handlePostChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return console.log("File not found");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageFile = e.target.files[0] as any;
    if (imageFile.type !== "image/jpeg") {
      alert("Photos must be in JPEG format");
      return;
    }
    // && (e.target.files[0] as any)
    setPost(imageFile);
  };
  const handleImageUpload = () => {
    if (!post) return;
    const imageRef = ref(storage, `${userID}/${v4()}`);
    uploadBytes(imageRef, post).then(() => {
      alert("Image uploaded");
    });
  };
  return (
    <div className="uploadContainer">
      <h1>Create a new post</h1>
      <label htmlFor="myFileUpload" className="custom-file-upload">
        <>
          <GrAdd />
        </>
        <p>Upload your photo (JPEG)</p>
      </label>
      <input
        type="file"
        accept="image/jpeg"
        id="myFileUpload"
        onChange={handlePostChange}
      />
      <label htmlFor="postDescription">Add your description (optional)</label>
      <textarea id="postDescription"></textarea>
      <button onClick={handleImageUpload}>Upload Post</button>
    </div>
  );
};
export default UploadPost;