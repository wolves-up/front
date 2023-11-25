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
import { YMaps, Map, useYMaps, Placemark } from '@pbe/react-yandex-maps';

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

const NewsArticleForm = () => {
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

  const tagOptions = tagList.map((item) => ({ label: item }));

  const [title, setTitle] = useState("");
  const [service, setService] = useState({'label':'Выберите службу'});
  const [shortBody, setShortBody] = useState("");
  const [body, setBody] = useState("");
  
  const [headerImage, setHeaderImage] = useState(undefined);
  const [images, setImages] = useState([]);
  const [tags, setTags] = useState([]);

  const [loading, setLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [placemark, setPlacemark] = useState([0,0]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const imgs = await Promise.all(images.map(async i => {
        console.log(i);
        const data = await i.arrayBuffer()
        const res = await fetch("http://46.146.211.12:25540/content", {
          method: "POST",
          body: data,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-type": "application/octet-stream",
          },
        });
        const uploadId = await res.json();
        console.log(uploadId);
        return uploadId;
      }));
      const headerImageId = headerImage && await (async i => {
        console.log(i);
        const data = await i.arrayBuffer()
        const res = await fetch("http://46.146.211.12:25540/content", {
          method: "POST",
          body: data,
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`,
            "Content-type": "application/octet-stream",
          },
        });
        const uploadId = await res.json();
        console.log(uploadId);
        return uploadId;
      })(headerImage);

      const requestBody = {
        title: title,
        body: body,
        shortBody: shortBody,

        responsibleServiceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        tags: tags ? tags.map(x => x.label) : [],
        bodyContentIds: imgs ? imgs : [],
        headerContentId: headerImageId ?? undefined,

      };
      if(placemark && placemark[0] > 0) {
        requestBody.location = {
          latitude: placemark[0],
          longitude: placemark[1],
        };
      }
      console.log(requestBody);
      const res = await fetch("http://46.146.211.12:25540/news", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      const jsonRes = await res.json();
      console.log(jsonRes);

      setSnackbarMessage("Новость оставлена!");
      navigate('/news');
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

  const handleHeaderImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setHeaderImage(files[0]);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className={styles.form__header}>Создать новость</h2>

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
          label="Короткий текст"
          variant="outlined"
          multiline
          fullWidth
          required
          minRows={3}
          maxRows={3}
          value={shortBody}
          onChange={(e) => setShortBody(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          label="Текст"
          variant="outlined"
          multiline
          fullWidth
          required
          minRows={3}
          maxRows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <Autocomplete
          disablePortal
          options={serviceList.map((item) => ({ label: item }))}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue ={(option, value) => { return option.label === value.label}}
          fullWidth
          value={service}
          renderInput={(params) => <TextField {...params} label="Категория" />}
          onChange={(e, v) => setService(v)}
        />
      </Box>

      <Box mb={2}>
        <Autocomplete
          multiple
          fullWidth
          options={tagOptions}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue ={(option, value) => { return option.label === value.label}}
          filterSelectedOptions
          values={tags}
          renderInput={(params) => (
            <TextField {...params} label="Теги" placeholder="Тег" />
          )}
          onChange={(event, values) => setTags(values)}
        />
      </Box>

      <Box mb={2}>
        <Button variant="primary" component="label" startIcon={<UploadFile />}>
          Добавить обложку
          <VisuallyHiddenInput
            type="file"
            accept="image/*"
            onChange={handleHeaderImageUpload}
          />
        </Button>
        {headerImage && (
          <Box>
            <IconButton
              onClick={() =>
                setHeaderImage({})
              }
            >
              <Clear />
            </IconButton>
            <Typography component="span">{headerImage.name}</Typography>
          </Box>
        )}
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

      <Map 
        defaultState={
          {center: [56.84, 60.60],
          zoom: 9}
        }
        width={450}
        height={450}
        onClick={(e) => {
          const coords = e.get('coords');
          setPlacemark(coords);
          console.log(coords);
        }}>
          <Placemark key={'Test'}
            geometry={placemark}>
          </Placemark>
      </Map>

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

export default NewsArticleForm;
