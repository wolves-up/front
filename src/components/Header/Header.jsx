import { Link } from "react-router-dom";
import styles from './Header.module.css';
import cn from 'classnames';
import logo from '../../images/logo.svg';
import ButtonLink from "../ButtonLink/ButtonLink";

const Header = ({loginButtonRequired}) => {
  return (
    <header className={cn('container', styles.header)}>
      <Link to={'/'}>
        <img src={logo} alt="My healthy plate logo" />
      </Link>
      {loginButtonRequired && <ButtonLink link={'/login'}>Log In</ButtonLink>}
    </header>
  );
}

export default Header;