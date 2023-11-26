import { useNavigate, useParams } from "react-router-dom";
import styles from "../NewsArticleFull/NewsArticleFull.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { uid } from "uid";
import Modal from "react-bootstrap/Modal";
import cn from "classnames";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { YMaps, Map, useYMaps, Placemark } from "@pbe/react-yandex-maps";

const ReportFull = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [articleData, setArticleData] = useState({});

  
  const createPlaceMark = (loc) => {
    const location = [loc["latitude"], loc["longitude"]];
    return (
      <Placemark
        geometry={location}
      ></Placemark>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://46.146.211.12:25540/reports/${id}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
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
            backgroundImage:
              articleData?.headerContentId &&
              `url(http://46.146.211.12:25540/content/${articleData?.headerContentId})`,
          }}
        >
          <div className={styles.recipe__data}>
            <div className="flex-wrapper_centered">
              <h1 className={styles.recipePage__title}>
                {articleData?.title || "Обращение"}
              </h1>
            </div>
            <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
              {articleData?.tags &&
                articleData?.tags.map((tag) => (
                  <Chip
                    label={tag}
                    color="primary"
                    variant="outlined"
                    size="small"
                  />
                ))}
            </Stack>
          </div>
        </header>
        <div className={styles.recipePage__main}>
          {articleData?.creationDate && (
            <Typography variant="body2" component="div" color="text.secondary">
              {new Date(articleData.creationDate).toGMTString()}
            </Typography>
          )}
          <div>{articleData?.message}</div>
          {articleData?.location && (
            <Box mt={1} mb={1}>
              <Map
                defaultState={{
                  center: [
                    articleData.location.latitude,
                    articleData.location.longitude,
                  ],
                  zoom: 15,
                }}
                width={300}
                height={300}
              >
                {createPlaceMark(articleData.location)}
              </Map>
            </Box>
          )}
          {articleData?.contentIds &&
            articleData.contentIds.map((x) => {
              return (
                <img
                  width="100%"
                  src={`http://46.146.211.12:25540/content/${x}`}
                ></img>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ReportFull;
