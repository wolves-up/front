import { Link } from "react-router-dom";
import NavBarItem from "../NavBarItem/NavBarItem";
import logo from "../../images/logo.svg";
import styles from "./Navbar.module.css";

const NavBar = () => {
  const user = localStorage.getItem('access_token');
  return (
    <div className={styles.sidebar}>
      <Link to="/news">Навигатор чистоты</Link>
      <ul className={styles.nav}>
        <NavBarItem link={"/news"} icon={"overview"} text={"Новости"} />
        {user && (
        <NavBarItem link={"/post"} icon={"settings"} text={"Оставить новость"} />
        )}
        {user && (
        <NavBarItem link={"/reports"} icon={"overview"} text={"Обращения"} />
        )}
        {user && (
          <NavBarItem link={"/report"} icon={"recipes"} text={"Сообщить о проблеме"} />
        )}
        {user && (
        <NavBarItem link={"/map"} icon={"meal"} text={"Карта обращений"} />
        )}
      </ul>
    </div>
  );
};

export default NavBar;
