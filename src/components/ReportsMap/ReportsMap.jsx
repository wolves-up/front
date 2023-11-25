import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { YMaps, Map, useYMaps, Placemark } from '@pbe/react-yandex-maps';
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
import Report from "../Report/Report";

import styles from './ReportsMap.module.css';

const ReportsMap = () => {
  const [placemarks, setPlacemarks] = useState([]);
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
      const resJson = await res.json();
      console.log(resJson);
      setPlacemarks(resJson.filter(x => x.location));
    })()
  }, [])

  useEffect(() => {
    (async () => {

    })();
  }, [selectedItem])
  
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
        {selectedItem &&
        (<div className={styles.rightSidebar}>
            <div className={styles.reportCard}>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.message}</p>
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
                            <img width="100%" src={`http://46.146.211.12:25540/content/${x}`}></img>
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
        </Map>
    </div>
  );
};

export default ReportsMap;
