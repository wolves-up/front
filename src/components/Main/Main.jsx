import ButtonLink from "../ButtonLink/ButtonLink";
import styles from './Main.module.css';

const Main = () => {
  return (
      <div className={styles.main}>
        <h1 className={styles.main__header}>
          Healthy plate - 
          <br />
          better life
        </h1>
        <div>
          Plan your diet. Achieve nutrients goals. Make own recipes.
        </div>
        <ButtonLink
          className={styles.main__button}
          link='/signup'
          variant={{isPrimary: true}}
        >
          Join us!
        </ButtonLink>
      </div>
  );
}

export default Main;