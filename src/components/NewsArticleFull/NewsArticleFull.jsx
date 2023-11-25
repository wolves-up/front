import { useNavigate, useParams } from "react-router-dom";
import styles from "./NewsArticleFull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { uid } from "uid";
import Modal from "react-bootstrap/Modal";
import cn from "classnames";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Typography } from "@mui/material";

const NewsArticleFull = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://46.146.211.12:25540/news/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        });
        const jsonRes = await res.json();
        console.log(jsonRes);
        setArticleData(jsonRes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id]);
  
  return (
    <>
      <div className={styles.recipePage}>
        <header
          className={styles.recipePage__header}
          style={{
            backgroundImage: articleData?.headerContentId && `url(http://46.146.211.12:25540/content/${articleData?.headerContentId})`,
          }}
        >
          <div className={styles.recipe__data}>
            <div className="flex-wrapper_centered">
              <h1 className={styles.recipePage__title}>{articleData?.title}</h1>
            </div>
          </div>
        </header>
        <div className={styles.recipePage__main}>
          {articleData?.createDate && (
            <Typography variant="body2" component="div" color="text.secondary">
              {new Date(articleData.createDate).toGMTString()}
            </Typography>
          )}
          <div>{articleData?.shortBody}</div>
          <div>{articleData?.body}</div>

          {
            articleData?.contentIds &&
            articleData.contentIds.map((x) => {
                return (
                    <img width="100%" src={`http://46.146.211.12:25540/content/${x}`}></img>
                );
            })
          }
        </div>
      </div>
    </>
  );
};

export default NewsArticleFull;
