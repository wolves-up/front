import { useNavigate, useParams } from "react-router-dom";
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

const NewsArticle = () => {
  const { id } = useParams();
  const recipes = useSelector(selectRecipes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recipes.map((r) => r.id).includes(id)) {
      navigate("/not_found", { replace: true });
    }
  });

  const { title, cover, date, content, comments } = recipes.find(
    (r) => r.id === id
  ) || {
    title: "",
    cover: "",
    date: null,
    content: "",
    comments: [],
  };

  return (
    <>
      <div className={styles.recipePage}>
        <header
          className={styles.recipePage__header}
          style={{
            backgroundImage: cover !== "" && `url(${cover})`,
          }}
        >
          <div className={styles.recipe__data}>
            <div className="flex-wrapper_centered">
              <h1 className={styles.recipePage__title}>{title}</h1>
            </div>
          </div>
        </header>
        <div className={styles.recipePage__main}>
          {date && (
            <Typography variant="body2" component="div" color="text.secondary">
              {date}
            </Typography>
          )}
          <div>{content}</div>
        </div>
      </div>
      <Typography variant="h2">Комментарии</Typography>
    </>
  );
};

export default NewsArticle;
