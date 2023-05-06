import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  get,
  ref,
  set,
  child,
  onValue,
  onDisconnect,
  update,
} from "firebase/database";

const Timeline = () => {
  const [apiRes, setApiRes] = React.useState<string[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [posts, setPosts] = React.useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state);
  const fetchFeed = async () => {
    if (user) {
      const config = {
        user: user,
        pageNumber: pageNumber,
      };
      const feed = await axios.post("/api/feed", config);
      setApiRes(feed.data);
    }
    await queryFirebase(apiRes);
  };
  const queryFirebase = async (refs: any) => {
    const updatedPosts: any = [];
    refs.map(async (ref: any) => {
      const post: any = (await get(ref)) as any;
      updatedPosts.push(post);
    });
    console.log("hello");
    console.log(updatedPosts);
    setPosts(updatedPosts);
  };
  console.log(apiRes);
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
