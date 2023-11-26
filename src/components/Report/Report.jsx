import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const Report = ({
  userId,
  id,
  name,
  title,
  date,
  status,
  category,
  tags,
  images,
  message,
}) => {
  const [utilityService, setUtilityService] = useState(undefined);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://46.146.211.12:25540/utilities/${category}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      let resJson = await res.json();
      
      setUtilityService(resJson);
    })();
  }, [])

  const statuses = {
    0: "Новый",
    1: "В очереди",
    2: "В работе",
    3: "Переоткрыт",
    4: "Завершен",
    5: "В архиве",
    6: "Удалён",
  };
  const statusToColor = {
    0: "success",
    1: "info",
    2: "secondary",
    3: "primary",
    4: "warning",
    5: "default",
    6: "error",
  };

  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: 300,
        maxWidth: 345,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }}>{name ? name[0] : "A"}</Avatar>
          }
          title={name || `user-${userId.slice(0, 10)}`}
          subheader={date}
        />
        <CardContent>
          {utilityService && (<Box mb={1}><Chip label={utilityService.name} color="primary" size="small" /></Box>)}
          <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
            {tags.map((tag) => (
              <Chip
                label={tag}
                color="primary"
                variant="outlined"
                size="small"
              />
            ))}
          </Stack>

          <Typography variant="h6" mb={1}>
            {title}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {message.length <= 200 ? message : message.substr(0, 197)+'...'}
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Chip
          label={statuses[status]}
          color={statusToColor[status]}
          variant="filled"
        />
        <Button onClick={(e) => navigate(`/reports/${id}`)}>Подробнее</Button>
      </CardActions>
    </Card>
  );
};

export default Report;
