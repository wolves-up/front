import { redirect, useNavigate, useParams } from "react-router-dom";
import { minutesToHoursMinutesString } from "../../utils/converters";
import EditableListItem from "../EditableListItem/EditableListItem";
import styles from "./NewsArticle.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteRecipe,
  selectRecipes,
  updateRecipe,
} from "../../redux/recipes/recipesSlice";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { uid } from "uid";
import Modal from "react-bootstrap/Modal";
import cn from "classnames";
import { storage } from "../../firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Typography } from "@mui/material";

const NewsArticle = ({
  name,
  title,
  date,
  status,
  category,
  tags,
  images,
  message,
  cover,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(cover);
  return (
    <>
      <div className={styles.recipePage}>
        <header
          className={styles.recipePage__header}
          style={{
            backgroundImage: cover && `url(http://46.146.211.12:25540/content/${cover})`,
          }}
        >
          <div className={styles.recipe__data}>
            <div className="flex-wrapper_centered">
              <h1 className={styles.recipePage__title}
                style={{
                  overflow:'hidden'
                }}>{title}</h1>
            </div>
          </div>
        </header>
        <div className={styles.recipePage__main}>
          {date && (
            <Typography variant="body2" component="div" color="text.secondary">
              {new Date(date).toGMTString()}
            </Typography>
          )}
          <div>{message}</div>
        </div>
        <div 
          style={{
            paddingBottom: 10,
            paddingLeft: 20
          }}
          
        >
          <Button className="ToNews" onClick={(e) => navigate(`/news/${name}`)}>
            Перейти к полной новости
          </Button>
        </div>
      </div>
    </>
  );
};

export default NewsArticle;
