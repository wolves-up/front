import styles from './RecipesContainer.module.css';

const RecipesContainer = ({children}) => {
  return (
    <section className={styles.recipes}>
      {children}
    </section>
  );
}

export default RecipesContainer;