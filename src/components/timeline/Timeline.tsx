import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { ref, getStorage, getDownloadURL } from "firebase/storage";
import {} from "../firebase";
import "./timeline.css";
const Timeline = () => {
  const [apiRes, setApiRes] = React.useState<string[]>([]);
  const [pageNumber, setPageNumber] = React.useState<number>(1);
  const [posts, setPosts] = useState<any[]>([]);
  const { user } = useSelector((state: RootState) => state);
  const storage = getStorage();
  const fetchFeed = async () => {
    // const locallyStoredFeed = JSON.parse(localStorage.feed);
    // if (locallyStoredFeed) {
    //   setPosts(locallyStoredFeed);
    //   return;
    // }
    if (user) {
      const config = {
        user: user,
        pageNumber: pageNumber,
      };
      const res = await axios.post("/api/feed", config);
      await queryFirebase(res.data);
    }
  };
  const queryFirebase = async (refs: any) => {
    const posts: string[] = [];
    const promises = refs.map(async (image: any) => {
      const url: string = await getDownloadURL(ref(storage, image.imageRef));
      // eventually we want the username, likes and comments on here as well...
      return { url: url, desc: image.description };
    });
    const urls = await Promise.all(promises);
    console.log(urls);
    setPosts(urls);
    localStorage.setItem("feed", JSON.stringify(urls));
  };
  useEffect(() => {
    fetchFeed();
  }, []);
  if (posts.length === 0) return <div>Loading...</div>;
  return (
    <div className="timelineContainer">
      <div className="images">
        {posts.map((post) => {
          return (
            // eslint-disable-next-line react/jsx-key
            <div>
              <img src={post.url} alt="" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
