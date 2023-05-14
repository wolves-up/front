import styles from './Dashboard.module.css';
import RecipesContainer from '../RecipesContainer/RecipesContainer';
import Recipe from '../Recipe/Recipe';
import ButtonLink from '../ButtonLink/ButtonLink';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, selectRecipes, selectRecipesStatus } from '../../redux/recipes/recipesSlice';
import { useEffect, useState } from 'react';
import { selectUser } from '../../redux/user/userSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const status = useSelector(selectRecipesStatus);
  const user = useSelector(selectUser);
  const [buttonText, setButtonText] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRecipes(user.id));
    } else if (status === 'succeeded' && recipes.length === 0) {
      setButtonText('Add your first recipe!');
    } else {
      setButtonText('New recipe');
    }
  }, [status, dispatch, user.id, recipes.length]);

  return (
      <main>
        <RecipesContainer>
          <ButtonLink link={'/add_recipe'} variant={{addRecipe: true}}>
            {buttonText}
          </ButtonLink>
          {
            recipes.slice(0, 2).map(recipe => (
            <Recipe 
              key={recipe.id} 
              id={recipe.id}
              title={recipe.title}
              difficulty={recipe.difficulty}
              timeInMinutes={recipe.time}
            />
            ))
          }
        </RecipesContainer>
        
      </main>
  );
}

export default Dashboard;