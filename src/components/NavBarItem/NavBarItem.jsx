import { NavLink } from "react-router-dom";
import styles from './NavBarItem.module.css';
import cn from 'classnames';

const NavBarItem = ({link, icon, text}) => {
  return (
    <li className={styles.li}>
      <NavLink 
        to={link} 
        className={({isActive}) => {
          return isActive ? cn(styles.nav__item, styles.nav__item_active) : styles.nav__item;
        }}
      >
        {({ isActive }) => (
          <>
          <div className={styles.iconWrapper}>
            <img src={require(`./res/${icon}-${isActive ? 'light' : 'dark'}.svg`)} alt="" />
          </div>          
          {text}
          </>
        )
        }
      </NavLink>
    </li>
  );
}

export default NavBarItem;