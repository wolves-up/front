import { Link } from 'react-router-dom';
import { minutesToHoursMinutesString } from '../../utils/converters';
import styles from './Recipe.module.css';

const Recipe = ({id, title, timeInMinutes, difficulty, cover}) => {
  const time = minutesToHoursMinutesString(timeInMinutes);
  return (
    <Link to={`/recipe/${id}`} className={styles.recipe}>
      <div 
        className={styles.recipe__image} 
        style={{
          backgroundImage: cover ? 
          `url(${require(`../RecipeInfo/res/recipe_cover_${cover}.jpg`)})` :
          `url(${require("./res/breakfast.png")})`
        }} 
      />
      <h3 className={styles.recipe__title}>{title}</h3>
      <div className={styles.recipe__info}>
        <div className={styles.recipe__time}>{time}</div>
        <div>
          <img src={require(`./res/difficulty_${difficulty}.svg`)} alt='' />
        </div>
      </div>
    </Link>
  );
}

export default Recipe;