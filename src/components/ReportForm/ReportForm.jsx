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

  const [serviceList, setPlacemarks] = useState([]);

  useEffect(() => {
    (async() => {
      const res = await fetch(`http://46.146.211.12:25540/utilities`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      const resJson = await res.json();
      console.log(res);
      setPlacemarks(resJson);
    })()
  }, []);

  const tagOptions = tagList.map((item) => ({ label: item }));

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState({'label':'Выберите службу'});
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [placemark, setPlacemark] = useState([0,0]);
  const [responsibleServiceId, setResponsibleServiceId] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading)
      return;
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

      const body = {
        title: title,
        message: message,
        responsibleServiceId: (responsibleServiceId ?? "") === "" ? undefined : responsibleServiceId,
        tags: tags ? tags.map(x => x.label) : [],
        contentIds: imgs ? imgs : [],
      };
      if(placemark && placemark[0] > 0) {
        body.location = {
          latitude: placemark[0],
          longitude: placemark[1],
        };
      }
      console.log(body);
      const res = await fetch("http://46.146.211.12:25540/reports/create", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });

      const jsonRes = await res.json();
      console.log(jsonRes);

      setSnackbarMessage("Обращение отправлено!");
      navigate('/map');
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
          inputProps={{ maxLength: 100 }}
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
          inputProps={{ maxLength: 400 }}
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
          options={serviceList.map((item) => ({ label: item.name, id: item.id}))}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue ={(option, value) => { return option.label === value.label}}
          fullWidth
          value={service}
          renderInput={(params) => <TextField {...params} label="Категория" />}
          onChange={(e, v) => {
            if (v != null && v != undefined)
            {
              setService(v); 
              setResponsibleServiceId(v.id)
            }
          } }
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

export default ReportForm;
