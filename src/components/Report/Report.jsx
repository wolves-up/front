import {
  Autocomplete,
  Avatar,
  Box,
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

const Report = ({
  name,
  title,
  date,
  status,
  category,
  tags,
  images,
  message,
}) => {
  const statuses = useMemo(() => ["Новое", "В работе", "Завершено"]);
  const [newStatus, setNewStatus] = useState(statuses[status]);

  const handleStatusChange = (event) => {
    setNewStatus(event.target.value);
    console.log(event.target.value);
    // fetch
  };

  useEffect(() => {console.log(name, title, date, status, category, tags, images, message)}, []);

  return (
    <Card sx={{ width: 300, maxWidth: 345, padding: 2 }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: "red" }}>{name ? name[0] : 'A'}</Avatar>}
        title={name}
        subheader={date}
      />
      <CardContent>
        <Box mb={1}>
          <Chip label={category} color="primary" size="small" />
        </Box>
        <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
          {tags.map((tag) => (
            <Chip label={tag} color="primary" variant="outlined" size="small" />
          ))}
        </Stack>

        <Typography variant="h6" mb={1}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {message}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Autocomplete
          options={statuses.map((item) => ({ label: item }))}
          value={newStatus}
          fullWidth
          onChange={handleStatusChange}
          renderInput={(params) => <TextField {...params} label="Статус" />}
        />
      </CardActions>
    </Card>
  );
};

export default Report;
