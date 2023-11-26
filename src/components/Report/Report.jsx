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
          title={name}
          subheader={date}
        />
        <CardContent>
          <Box mb={1}>
            <Chip label={category} color="primary" size="small" />
          </Box>
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
            {message}
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
