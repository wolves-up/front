import { useNavigate } from 'react-router-dom';
import EditableListItem from '../EditableListItem/EditableListItem';
import styles from '../RecipeInfo/RecipeInfo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Button from '../Button/Button';
import { uid } from 'uid';
import { addRecipe } from '../../redux/recipes/recipesSlice';
import cn from 'classnames';
import { selectUser } from '../../redux/user/userSlice';

const AddRecipe = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentTitle, setCurrentTitle] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState(1);
  const [currentIngredients, setCurrentIngredients] = useState([]);
  const [currentSteps, setCurrentSteps] = useState([]);
  const [currentCover, setCurrentCover] = useState(null);

  const user = useSelector(selectUser);

  const handleTitleChange = (event) => {
    setCurrentTitle(event.target.value);
  }

  const handleTimeChange = (event) => {
    setCurrentTime(parseInt(event.target.value));
  }

  const handleDifficultyChange = (event) => {
    setCurrentDifficulty(parseInt(event.target.value));
  }

  const handleRemoveIngredientClick = (index) => {
    const updatedIngredients = [
      ...currentIngredients.slice(0, index),
      ...currentIngredients.slice(index + 1)];
    setCurrentIngredients(updatedIngredients);  
  }

  const handleAddIngredientClick = () => {
    if (currentIngredients.at(-1)?.value !== '') {
      setCurrentIngredients([...currentIngredients, {id: uid(), value: ''}]);
    }
  }

  const handleIngredientChange = (index, item) => {
    setCurrentIngredients([
      ...currentIngredients.slice(0, index),
      item,
      ...currentIngredients.slice(index+1)
    ]);
  }

  const handleRemoveStepClick = (index) => {
    const updatedSteps = [
      ...currentSteps.slice(0, index),
      ...currentSteps.slice(index + 1)];
    setCurrentSteps(updatedSteps);   
  }

  const handleAddStepClick = () => {
    if (currentSteps.at(-1)?.value !== '') {
      setCurrentSteps([...currentSteps, {id: uid(), value: ''}]);
    }
  }

  const handleStepChange = (index, item) => {
    setCurrentSteps([
      ...currentSteps.slice(0, index),
      item,
      ...currentSteps.slice(index+1)
    ]);
  }

  const handleSaveClick = () => {
    dispatch(addRecipe({
      userId: user.id,
      title: currentTitle,
      time: currentTime,
      difficulty: currentDifficulty,
      ingredients: currentIngredients,
      steps: currentSteps,
      cover: currentCover
    }));
    navigate(-1);
  }

  const handleChangeCoverClick = () => {
    let randomCover = currentCover;
    const coversCount = 10;
    while (randomCover === currentCover) {
      randomCover = Math.floor(Math.random() * coversCount) + 1
    }
    setCurrentCover(randomCover);
  }

  return (
    <div className={styles.recipePage}>
      <header 
        className={styles.recipePage__header}
        style={{
          backgroundImage: currentCover && `url(${require(`../RecipeInfo/res/recipe_cover_${currentCover}.jpg`)})`
        }}
      >
        <div className={styles.recipe__data}>
          <input 
            type='text' 
            className={cn(styles.recipePage__title, styles.input)} 
            value={currentTitle} 
            onChange={handleTitleChange}
            placeholder='Recipe title'
          />
          <div className={styles.recipePage__time}>
            Time (in minutes):
          </div>
          <input 
            type='number' 
            className={cn(styles.recipe__time, styles.input, styles.input_time)} 
            value={currentTime} 
            onChange={handleTimeChange} 
            min={0} 
            max={5000}
          />
          <div className={styles.recipePage__difficulty}>
            Difficulty:
            <select 
              className={styles.difficulty__value}
              value={currentDifficulty}
              onChange={handleDifficultyChange}
            >
              <option value={1}>easy</option>
              <option value={2}>medium</option>
              <option value={3}>hard</option>
            </select>        
          </div>

          <Button className={styles.button_changeCover} onClick={handleChangeCoverClick}>Change cover</Button>
        </div>         
      </header>
      <div className={styles.recipePage__main}>
        <div className="flex-wrapper">
          <h2 className={styles.section__header}>Ingredients</h2>        
          <Button 
            className={styles.button_add} 
            onClick={handleAddIngredientClick} 
            variant={{isCRUD: true, isAdd: true}} 
          />
        </div>
        <ul>
          {
            currentIngredients.map((item, index) => (
            <EditableListItem 
              key={item.id} 
              id={item.id}
              initialValue={item.value} 
              index={index}
              removeAction={handleRemoveIngredientClick} 
              changeAction={handleIngredientChange}
              isEditing
            /> 
            ))
          }
        </ul>

        <div className="flex-wrapper">
          <h2 className={styles.section__header}>Steps</h2>
          <Button 
            className={styles.button_add} 
            onClick={handleAddStepClick} 
            variant={{isCRUD: true, isAdd: true}} 
          />
        </div>
        <ol>
          {
            currentSteps.map((item, index) => (
            <EditableListItem 
              key={item.id} 
              id={item.id}
              initialValue={item.value} 
              index={index} 
              removeAction={handleRemoveStepClick} 
              changeAction={handleStepChange}
              isEditing
            /> 
            ))
          }
        </ol>
        <Button onClick={handleSaveClick}>Save</Button>
      </div>
    </div>
  );
}

export default AddRecipe;