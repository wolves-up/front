import { Link } from "react-router-dom";
import styles from './Header.module.css';
import cn from 'classnames';
import logo from '../../images/logo.svg';
import ButtonLink from "../ButtonLink/ButtonLink";

const Header = ({loginButtonRequired}) => {
  return (
    <header className={cn('container', styles.header)}>
      <Link to={'/'}>
        Навигатор чистоты
      </Link>
      {loginButtonRequired && <ButtonLink link={'/login'}>Log In</ButtonLink>}
    </header>
  );
}

export default Header;