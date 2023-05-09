import { Link } from "react-router-dom";
import styles from './Header.module.css';
import Button from "../Button/Button";
import cn from 'classnames';
import logo from '../../images/logo.svg';

const Header = ({loginButtonRequired}) => {
  return (
    <header className={cn('container', styles.header)}>
      <Link to={'/'}>
        <img src={logo} alt="My healthy plate logo" />
      </Link>
      {loginButtonRequired && <Button link={'/login'} isPrimary={false}>Log In</Button>}
    </header>
  );
}

export default Header;