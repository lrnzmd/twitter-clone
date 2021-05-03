import React, { useEffect, useState } from "react";
import TweetCard from "./TweetCard";
import ApiUtils from "./ApiUtils";

export default function TweetList({token}) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
  /*  fetch("https://secret-temple-42258.herokuapp.com/tweets/", {
      method: "GET",
      headers: { "Content-Type": "application/json", "Authorization" : `Bearer ${token}`},
    })
      .then((res) => res.json())
      .then((json) => setTweets(json))*/

      ApiUtils("tweets")
        .then((json) => setTweets(json))
        console.log(tweets)
  },[token]);


  return (
    <div>
        {tweets.map((tweetsitem, index)=>{
            <TweetCard tweetsitem={tweetsitem} key={index}/>
        })}

    </div>
  );
}
