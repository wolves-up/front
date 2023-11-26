import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import NewsArticle from "../NewsArticle/NewsArticle";

const News = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://46.146.211.12:25540/news/get-all`, {
          method: "GET",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
        },
        });
        let jsonRes = await res.json()
        jsonRes = jsonRes.sort((x,y) => x.createDate < y.createDate ? 1 : -1);
        console.log(jsonRes);
        setNews(jsonRes);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <Stack direction="row" gap={2} flexWrap="wrap">
      {news.map((rep) => (
        <NewsArticle
        name={rep.id}
        title={rep.title ?? "Title Placeholder"}
        message={rep.shortBody}
        category={rep.responsibleServiceId}
        date={rep.createDate}
        status={rep.status}
        tags={rep.tags ?? []}
        cover={rep.headerContentId}
      />
      ))}
    </Stack>
  );
};

export default News;
