import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { YMaps, Map, useYMaps, Placemark } from '@pbe/react-yandex-maps';

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

  return (
    <div>
        {selectedItem && 
        (<div className={styles.rightSidebar}>
            <div className={styles.reportCard}>
                <h3>{selectedItem.title}</h3>
                <p>{selectedItem.message}</p>
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
        height={800}
        onClick={(e) => {setSelectedItem(undefined)}}
        >
            {placemarks.map(p => createPlaceMark(p))}
        </Map>
    </div>
  );
};

export default ReportsMap;
