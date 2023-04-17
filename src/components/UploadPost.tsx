import React, { ChangeEvent, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../store/index";
const UploadPost = () => {
  const [post, setPost] = useState(null);
  const username = useSelector((state: RootState) => state.user.username);
  // console.log(userId);
  const handlePostChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return console.log("File not found");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const imageFile = e.target.files[0] as any;
    // && (e.target.files[0] as any)
    setPost(imageFile);
  };
  const handleImageUpload = () => {
    if (!post) return;
    const imageRef = ref(storage, `images/${v4()}`);
    uploadBytes(imageRef, post).then(() => {
      alert("Image uploaded");
    });
  };
  return (
    <div>
      <input type="file" onChange={handlePostChange} />
      <button onClick={handleImageUpload}>Upload Post</button>
    </div>
  );
};
export default UploadPost;
