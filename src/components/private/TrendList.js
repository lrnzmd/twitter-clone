import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import ApiUtils from "./ApiUtils";
import _ from "lodash";

const TrendList = () => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTweets();
  }, []);

  const fetchTweets = () => {
    ApiUtils("tweets/feed").then((json) => {
      processTags(json);
    });
  };
  const processTags = (json) => {
    const tagList = [];
    json.map((tweetItem) => {
      if (tweetItem.tags.length > 0) {
        for (let i = 0; i < tweetItem.tags.length; i++) {
          tagList.push(tweetItem.tags[i]);
        }
      }
    });

    const newTagList = _.countBy(tagList);

    const newArray = Object.keys(newTagList).map((key) => {
      return { id: key, name: key, count: newTagList[key] };
    });
    setTags(newArray);
  };
  return (
    <div>
      <ListGroup>
        {tags.map((tagItem) => (
          <ListGroup.Item key={tagItem.id}>
            {tagItem.name} {tagItem.count}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};
export default TrendList;
