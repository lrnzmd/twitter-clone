import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import moment from "moment";
import {
  faHeart,
  faComment,
  faRetweet,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartoutline } from "@fortawesome/free-regular-svg-icons";
import ApiUtils from "./ApiUtils";
import { Button } from "react-bootstrap";

export default function TweetCard({ tweetsitem, key }) {
  const { _id, text, created, updated, tags, creator } = tweetsitem;
  const userId = localStorage.getItem("userId");
  const [like, setLike] = useState(0);
  const [liked, setLiked] = useState([]);
  const [loadingAlreadyLiked, setLoadingAlreadyLiked] = useState(null);

  // Con questo useffect settiamo lo stato iniziale del nostro tweet, e rispondiamo ad eventuali cambiamenti
  useEffect(() => {
    setLike(tweetsitem.like);
    setLiked(tweetsitem.liked);
  }, [tweetsitem]);

  // con find troviamo se nella lista utenti dentro tweetsitem.liked c'è il nostro user ID
  const alreadyLiked = liked.find((users) => {
    return users.id === userId;
  });

  // BUG: se si clicca velocemente partono diverse chiamate e finisce in errore
  // Una soluzione potrebbe essere disabilitare con uno stato il pulsante mentre la chiamata è in carso (in caso mettere un icona di caricamento)
  const triggerLike = () => {
    // Se esiste allora procediamo con unlike, senno con un like
    if (alreadyLiked) {
      unlikeTweet();
      setLoadingAlreadyLiked(false);
    } else {
      likeTweet();
      setLoadingAlreadyLiked(true);
    }
  };

  const likeTweet = () => {
    ApiUtils(`tweets/like/${_id}`, "POST").then((json) => {
      setLike(json.like);
      setLiked(json.liked);
      setLoadingAlreadyLiked(null);
    });
  };

  const unlikeTweet = () => {
    ApiUtils(`tweets/unlike/${_id}`, "POST").then((json) => {
      setLike(json.like);
      setLiked(json.liked);
      setLoadingAlreadyLiked(null);
    });
  };

  const renderIcon = () =>{
      if(loadingAlreadyLiked !== null){
        if(loadingAlreadyLiked){
          return faHeart
        }
        return faHeartoutline
      };
      
      if (alreadyLiked){
        return faHeart
      }
      return faHeartoutline;
  
  }

  return (
    <div className="mb-2 mt-2">
      <Card>
        <Card.Body>
          <div className="tweet-info">
            <p>
              <b>
                {creator.name} {creator.username}
              </b>
              <span className="text-muted">
                {" - "}
                {moment(created).fromNow()}
              </span>
            </p>
          </div>

          <div className="text-left mb-4 mt-2"> {text} </div>

          <div className="tweet-icon-container">
            {/* Non è mai una buona pratica usare onClick su un elemento diverso da button, in questo caso ho racchiuso le icon dentro i bnutton di Bootstrap */}
            <Button
              size="sm"
              onClick={triggerLike}
              disabled={loadingAlreadyLiked !== null}
            >
              <FontAwesomeIcon
                size="xs"
                icon={renderIcon()}
              />{" "}
              {like}
            </Button>
            <Button size="sm" onClick={triggerLike}>
              <FontAwesomeIcon size="xs" icon={faComment} />
            </Button>
            <Button size="sm" onClick={triggerLike}>
              <FontAwesomeIcon size="xs" icon={faRetweet} />
            </Button>
            <Button size="sm" onClick={triggerLike}>
              <FontAwesomeIcon size="xs" icon={faUpload} />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
