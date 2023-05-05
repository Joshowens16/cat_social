import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Timeline = () => {
  const [apiRes, setApiRes] = useState<any>([]);
  const { user } = useSelector((state: RootState) => state);
  const fetchFeed = async () => {
    if (user) {
      console.log("hit inside useEffect");
      const feed = await axios.get("/api/feed", user as any);
      setApiRes(feed.data);
      console.log(feed.data);
      console.log(apiRes);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
  if (apiRes.length === 0) return <div>Loading...</div>;
  return (
    <div>
      {apiRes.map((user: any) => (
        <p key={user.id}>{user.followeeUsername}</p>
      ))}
    </div>
  );
};

export default Timeline;
