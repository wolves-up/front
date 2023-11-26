import styles from './NewsForm.module.css';

const NewsForm = ({children, onSubmit}) => {
  return (
  <form 
    className={styles.form}
    onSubmit={onSubmit}
  >
    {children}
  </form>
  );
}

export default NewsForm;