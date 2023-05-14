import styles from './Button.module.css';
import cn from 'classnames';

const Button = ({className, onClick, variant, children, disabled}) => {
  const btnClasses = cn(
    className, 
    styles.button, 
    variant?.isPrimary ? styles.button_color_primary : '',
    variant?.isLogout ? styles.button_logout : '',
    variant?.isCRUD ? styles.button_crud : '',
    variant?.isEdit ? styles.button_edit : '',
    variant?.isAccept ? styles.button_accept : '',
    variant?.isRemove ? styles.button_remove : '',
    variant?.isAdd ? styles.button_add : '',
    disabled ? styles.button_disabled : ''
  );
    
  return (
    <button
      className={btnClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;