import { Link } from "react-router-dom";
import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({className, link, onClick, isPrimary, children}) => {
  const btnClasses = cn(
    className, 
    styles.button, 
    isPrimary ? styles.button_color_primary : '');
  return (
    link ? 
    <Link 
      to={link} 
      className={btnClasses}
    >
      {children}
    </Link> :
    <button
      className={btnClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;