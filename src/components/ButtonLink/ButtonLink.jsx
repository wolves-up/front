import { Link } from 'react-router-dom';
import styles from '../Button/Button.module.css';
import cn from 'classnames';

const ButtonLink = ({className, link, variant, children}) => {
  const btnClasses = cn(
    className, 
    styles.button, 
    variant?.isPrimary ? styles.button_color_primary : '',
    variant?.addRecipe ? styles.button_addRecipe : ''
    );

  return (
    <Link 
      to={link} 
      className={btnClasses}
    >
      {children}
    </Link>
  );
}

export default ButtonLink;