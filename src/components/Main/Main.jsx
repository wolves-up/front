import Button from "../Button/Button";
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
        <Button
          className={styles.main__button}
          link='/signup'
          isPrimary={true}
        >
          Join us!
        </Button>
      </div>
  );
}

export default Main;