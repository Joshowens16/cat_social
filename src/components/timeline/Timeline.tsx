import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import {} from "../firebase";

const Timeline = () => {
  const [apiRes, setApiRes] = React.useState<string[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [posts, setPosts] = React.useState<string[]>([]);
  const { user } = useSelector((state: RootState) => state);
  const storage = getStorage();
  const fetchFeed = async () => {
    if (user) {
      const config = {
        user: user,
        pageNumber: pageNumber,
      };
      const feed = await axios.post("/api/feed", config);
      // setApiRes(feed.data);
      await queryFirebase(feed.data);
    }
  };
  const queryFirebase = async (refs: any) => {
    const posts: string[] = [];
    refs.map(async (image: string) => {
      const url: string = await getDownloadURL(ref(storage, image));
      posts.push(url);
    });
    console.log(posts);
    setPosts(posts);
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (apiRes.length === 0) return <div>Loading...</div>;
  return (
    <div>
      {/* {apiRes.map((string) => {
        // eslint-disable-next-line react/jsx-key
        return <p>{string}</p>;
      })} */}
    </div>
  );
};

export default Timeline;
