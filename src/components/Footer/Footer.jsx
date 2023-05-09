import styles from './Footer.module.css';
import cn from 'classnames';

const Footer = () => {
  return (
    <footer className={cn(styles.footer, "container")}>
      <div className={styles.copyright}>Copyright &copy; 2023</div>
    </footer>
  );
}

export default Footer;