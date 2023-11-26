import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { YMaps, Map, useYMaps, Placemark } from '@pbe/react-yandex-maps';
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
import Report from "../Report/Report";

import styles from './ReportsMap.module.css';

const ReportsMap = () => {
  const [placemarks, setPlacemarks] = useState([]);
  const [placemarksNews, setNewsPlacemarks] = useState([]);
  const [selectedItem, setSelectedItem] = useState(undefined);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createPlaceMark = (report) => {
    const location = [report['location']['latitude'], report['location']['longitude']]
    return (
      <Placemark key={report['id']}
        geometry={location}
        onClick={(e) => { 
            console.log(report['id']);
            setSelectedItem(report);
            setCardImages(report.contentIds ?? []);
        }}
        options={
            {'preset': report.isNews ? 'islands#blueDotIcon' : 'islands#brownDotIcon' }
        }
        >
      </Placemark>
    );
  }

  useEffect(() => {
    (async() => {
      /*const user = await fetch(`http://46.146.211.12:25540/users/get-user`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      const userJson = await user.json();*/
    
      const res = await fetch(`http://46.146.211.12:25540/reports/all`, {
        method: "GET",
        /*body: JSON.stringify({
          'userId': userJson["id"]
        }),*/
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      let resJson = await res.json();
      resJson = resJson.map((x) => { x['isNews']=false; return x;}).filter(x => x.location?.latitude);
      console.log(resJson);
      setPlacemarks(resJson);
    })()
  }, [])

  useEffect(() => {
    (async() => {
      const res = await fetch(`http://46.146.211.12:25540/news/get-all`, {
        method: "GET",
        /*body: JSON.stringify({
          'userId': userJson["id"]
        }),*/
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        },
      });
      let resJson = await res.json();
      resJson = resJson.map((x) => { x['isNews']=true; return x;}).filter(x => x.location?.latitude);
      console.log(resJson);
      setNewsPlacemarks(resJson);
    })()
  }, [])

  const [cardImages, setCardImages] = useState([]);

  const statusMap = {
    0: 'Новый',
    1: 'В очереди',
    2: 'В работе',
    3: 'Переоткрыт',
    4: 'Завершен',
    5: 'В архиве',
    6: 'Удалён'
  };

  return (
    <div>
        {/* Новость */}
        {selectedItem?.isNews &&
        (<div className={styles.rightSidebar}>
            <div className={styles.reportCard}>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.shortBody}</p>
                <p>
                <Button onClick={(e) => navigate(`/news/${selectedItem.id}`)}>Подробнее</Button>
                </p>
                <p>Создан: {new Date(selectedItem.createDate).toGMTString()}</p>
                <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
                    {selectedItem.tags.map((tag) => (
                        <Chip label={tag} color="primary"  size="small" />
                    ))}
                </Stack>
                {selectedItem.headerContentId && (<img width="100%" src={`http://46.146.211.12:25540/content/${selectedItem.headerContentId}`} alt=""></img>)}
            </div>
        </div>)}
        {selectedItem && !selectedItem.isNews &&
        (<div className={styles.rightSidebar}>
            <div className={styles.reportCard}>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.message}</p>
                <p>
                <Button onClick={(e) => navigate(`/reports/${selectedItem.id}`)}>Подробнее</Button>
                </p>
                <p>Создан: {new Date(selectedItem.creationDate).toGMTString()}</p>
                <p>Статус: {statusMap[selectedItem.status]}</p>
                <Stack direction="row" flexWrap="wrap" gap={0.5} mb={2}>
                    {selectedItem.tags.map((tag) => (
                        <Chip label={tag} color="primary"  size="small" />
                    ))}
                </Stack>
                {
                    cardImages.map((x) => {
                        return (
                            <img width="100%" src={`http://46.146.211.12:25540/content/${x}`} alt=""></img>
                        );
                    })
                }
            </div>
        </div>)}
        <Map 
        defaultState={
            {center: [56.84, 60.60],
            zoom: 9}
        }
        width={'100%'}
        height={900}
        onClick={(e) => {setSelectedItem(undefined)}}
        >
            {placemarks.map(p => createPlaceMark(p))}
            {placemarksNews.map(p => createPlaceMark(p))}
        </Map>
    </div>
  );
};

export default ReportsMap;
