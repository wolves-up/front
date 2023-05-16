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
    } else if (status !== 'loading') {
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
              cover={recipe.cover}
            />
            ))
          }
        </RecipesContainer>
        <section class="flex-wrapper">
          <div class="statistics">
            <h3 class="statistics__header">Macronutrient targets</h3>
            <div class="statistics__data macronutrients"></div>
          </div>
          <div class="statistics">
            <h3 class="statistics__header">Today`s meal plan</h3>
            <div class="statistics__data meal-plan">
              <ul class="meals-list">
                <li class="meals-list__item">
                  <div class="meal__title"> Meal #1</div>
                  <ul class="meal__products">
                    <li class="products__item">Oatmeal with bananas and strawberries</li>
                    <li class="products__item">Green tea</li>
                  </ul>
                </li>
                <li class="meals-list__item">
                  <div class="meal__title"> Meal #2</div>
                  <ul class="meal__products">
                    <li class="products__item">Soup</li>
                    <li class="products__item">Spaghetti</li>
                    <li class="products__item">Falafels</li>
                    <li class="products__item">Green tea</li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
          <div id="calendar"></div>
        </section>
        <div class="statistics">
          <h3 class="statistics__header">Today`s products</h3>
          <div class="statistics__data products">
            <table>
              <tr class="products-table__header">
                <th class="column-title column-data">#</th>
                <th class="column-title column-data">product</th>
                <th class="column-title column-data">count (g)</th>
                <th class="column-title column-data">proteins (g)</th>
                <th class="column-title column-data">fats (g)</th>
                <th class="column-title column-data">carbohydrates (g)</th>
                <th class="column-title column-data">energy (kcal)</th>
              </tr>
              <tr class="products-table__row">
                <td class="column-data"><div class="column-data_number">1</div></td>
                <td class="column-data column-data_product">Apple</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
              </tr>
              <tr class="products-table__row">
                <td class="column-data"><div class="column-data_number">1</div></td>
                <td class="column-data column-data_product">Apple</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
                <td class="column-data">100</td>
              </tr>
            </table>
            <button class="button button_add"></button>
          </div>
        </div>
      </main>
  );
}

export default Dashboard;