import { Link } from "react-router-dom";
import styles from './Header.module.css';
import cn from 'classnames';
import logo from '../../images/logo.svg';
import ButtonLink from "../ButtonLink/ButtonLink";
import { Stack } from "@mui/material";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";

const Header = ({loginButtonRequired}) => {
  return (
    <header className={cn("container", styles.header)}>
      <Link to={"/"}>
        <Stack direction="row" gap={1} alignItems="center">
          <ApartmentOutlinedIcon fontSize="large" />{" "}
          <span>Навигатор чистоты</span>
        </Stack>
      </Link>
      {loginButtonRequired && <ButtonLink link={"/login"}>Log In</ButtonLink>}
    </header>
  );
}

export default Header;