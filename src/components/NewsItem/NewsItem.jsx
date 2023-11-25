import { Card } from "@mui/material";
import { Link } from "react-router-dom";

const NewsItem = ({ id, title, content, image }) => {
  return (
    <Link to={`/news/${id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia component="img" height="140" image={image} alt={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default NewsItem;
