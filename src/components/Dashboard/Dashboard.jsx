import styles from './Dashboard.module.css';
import RecipesContainer from '../RecipesContainer/RecipesContainer';
import Recipe from '../Recipe/Recipe';
import ButtonLink from '../ButtonLink/ButtonLink';
import Calendar from 'moedim';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecipes, selectRecipes, selectRecipesStatus } from '../../redux/recipes/recipesSlice';
import { useEffect, useState } from 'react';
import { selectUser } from '../../redux/user/userSlice';
import ProductsTable from '../ProductsTable/ProductsTable';
import { changeDate, fetchProducts, selectDate, selectProducts, selectProductsStatus } from '../../redux/products/productsSlice';
import { dateToString } from '../../utils/converters';

const Dashboard = () => {
  const dispatch = useDispatch();
  const recipes = useSelector(selectRecipes);
  const recipesStatus = useSelector(selectRecipesStatus);
  const user = useSelector(selectUser);
  const productsDate = useSelector(selectDate);
  const products = useSelector(selectProducts);
  const productsStatus = useSelector(selectProductsStatus);
  const [buttonText, setButtonText] = useState('');
  const [date, setDate] = useState(productsDate ? new Date(productsDate) : new Date());
  const [currentProducts, setCurrentProducts] = useState([...products]);

  useEffect(() => {
    if (recipesStatus === 'idle') {
      dispatch(fetchRecipes(user.id));
    } else if (recipesStatus === 'succeeded' && recipes.length === 0) {
      setButtonText('Add your first recipe!');
    } else if (recipesStatus !== 'loading') {
      setButtonText('New recipe');
    }
    if (productsStatus === 'idle') {
      debugger
      dispatch(changeDate(dateToString(date)));
      dispatch(fetchProducts({userId: user.id, date: dateToString(date)}));
    } else if (productsStatus === 'succeeded') {
      setCurrentProducts([...products])
    }
  }, [recipesStatus, productsStatus, products, date, dispatch, user.id, recipes.length]);

  const handleDateChange = (value) => {
    console.log(value);
    console.log(dateToString(value));
    setDate(value);
    dispatch(changeDate(dateToString(value)));
    dispatch(fetchProducts({userId: user.id, date: dateToString(value)}));
  }

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
          <div className={styles.statistics}>
            <h3 className={styles.statistics__header}>Macronutrient targets</h3>
            <div className={cn(styles.statistics__data, styles.macronutrients)}></div>
          </div>
          <Calendar className={cn(styles.statistics, styles.statistics__data)} value={date} onChange={handleDateChange} />
        </section>
        <div className={styles.statistics}>
          <h3 className={styles.statistics__header}>Today`s products</h3>
          <div className={styles.statistics__data}>
            <ProductsTable products={currentProducts} />
          </div>
        </div>
      </main>
  );
}

export default Dashboard;