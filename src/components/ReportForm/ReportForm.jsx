import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { login } from "../../redux/user/userSlice";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Form from "../Form/Form";
import styles from "../Form/Form.module.css";
import {
  Autocomplete,
  Box,
  Typography,
  TextField,
  Button,
  styled,
  IconButton,
  Snackbar,
} from "@mui/material";
import { UploadFile, Clear } from "@mui/icons-material";
import { Stack } from "react-bootstrap";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ReportForm = () => {
  const tagList = [
    "Водопровод",
    "Газ",
    "Прорыв трубы",
    "Яма",
    "Затопление",
    "Отключение воды",
    "Отключение электичества",
    "Отходы",
  ];

  const serviceList = ["Вода", "Свет", "Газ", "Отопление", "Улица", "Другое"];

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [tags, setTags] = useState([]);
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://46.146.211.12:25540/reports/create", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          message: message,
          content: images,
          tags: tags,
          responsibleServiceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          location: location,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      const jsonRes = await res.json();
      console.log(jsonRes);

      setSnackbarMessage("Обращение отправлено!");
    } catch (err) {
      console.log(err);
      setSnackbarMessage("Ошибка");
    }

    setIsSnackbarOpen(true);
    setLoading(false);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages([
      ...images,
      ...files.filter(
        (file) => !images.map((img) => img.name).includes(file.name)
      ),
    ]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className={styles.form__header}>Опишите проблему</h2>

      <Box mb={2}>
        <TextField
          label="Заголовок"
          variant="outlined"
          required
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Описание"
          variant="outlined"
          multiline
          fullWidth
          required
          minRows={3}
          maxRows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Autocomplete
          disablePortal
          options={serviceList.map((item) => ({ label: item }))}
          fullWidth
          renderInput={(params) => <TextField {...params} label="Категория" />}
          onChange={(e) => setService(e.target.value)}
        />
      </Box>

      <Box mb={2}>
        <Autocomplete
          multiple
          fullWidth
          options={tagList.map((item) => ({ label: item }))}
          getOptionLabel={(option) => option.label}
          filterSelectedOptions
          renderInput={(params) => (
            <TextField {...params} label="Теги" placeholder="Тег" />
          )}
          onChange={(e) => setTags(e.target.value)}
        />
      </Box>

      <Box mb={2}>
        <Button variant="primary" component="label" startIcon={<UploadFile />}>
          Добавить фото
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
          />
        </Button>
        {images.map((img) => (
          <Box>
            <IconButton
              onClick={() =>
                setImages(images.filter((other) => other.name !== img.name))
              }
            >
              <Clear />
            </IconButton>
            <Typography component="span">{img.name}</Typography>
          </Box>
        ))}
      </Box>

      <Button type="submit" variant="contained" fullWidth>
        Отправить
      </Button>

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message={snackbarMessage}
        onClose={() => setIsSnackbarOpen(false)}
      />
    </Form>
  );
};

export default ReportForm;
