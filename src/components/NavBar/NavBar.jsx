import { Link } from "react-router-dom";
import NavBarItem from "../NavBarItem/NavBarItem";
import logo from '../../images/logo.svg'
import styles from './Navbar.module.css';

const NavBar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to="/dashboard"><img src={logo} alt="My healthy plate logo" /></Link>
      <ul className={styles.nav}>
        <NavBarItem 
          link={'/dashboard'}
          icon={'overview'}
          text={'Overview'}
        />
        <NavBarItem 
          link={'/recipes'}
          icon={'recipes'}
          text={'Recipes'}
        />
        <NavBarItem 
          link={'/'}
          icon={'meal'}
          text={'Meal plan'}
        />
        <NavBarItem 
          link={'/settings'}
          icon={'settings'}
          text={'Settings'}
        />
      </ul>
    </div>
  );
}

export default NavBar;