import React, { ChangeEvent, useState } from "react";
import { storage } from "../firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index";
import { GrAdd } from "react-icons/gr";

import "./uploadPost.css";
import axios from "axios";
type UploadPostProps = {
  setPostSuccess: (value: boolean) => void;
};
const UploadPost = (props: UploadPostProps) => {
  const [post, setPost] = useState<any>(null);
  const [description, setDescription] = useState<any>("");
  const { user } = useSelector((state: RootState) => state);

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
  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };
  const handleImageUpload = async () => {
    if (!post) return;
    const imageRef = ref(storage, `${user.id}/${v4()}`) as any;
    console.log(imageRef);
    await uploadBytes(imageRef, post);
    // IMAGE REFERENCE FOR DATABASE
    const imageReference = imageRef._location.path_;

    // DESCRIPTION FOR DATABASE
    const descriptionDB = description;

    // USERID for DATABASE is brought in from redux
    // Creating Body
    const body = {
      imageReference: imageReference,
      user: user,
      description: descriptionDB,
    };
    // Hitting API route to create post

    const response = await axios.post("/api/posts", body);
    props.setPostSuccess(true);
  };
  return (
    <div className="uploadContainer">
      <h1>Create a new post</h1>
      <label htmlFor="myFileUpload" className="custom-file-upload">
        {!post ? (
          <>
            <>
              <GrAdd />
            </>
            <p>Upload your photo (JPEG)</p>
          </>
        ) : (
          post.name
        )}
      </label>
      <input
        type="file"
        accept="image/jpeg"
        id="myFileUpload"
        onChange={handlePostChange}
      />
      <label htmlFor="postDescription">Add your description (optional)</label>
      <textarea
        onChange={handleDescChange}
        value={description}
        id="postDescription"
      ></textarea>
      <button onClick={handleImageUpload}>Upload Post</button>
    </div>
  );
};
export default UploadPost;
