import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import styles from './ProductsTableRow.module.css';
import cn from'classnames';
import { requestString } from '../../fdcConfig';
import { useDebounce } from 'use-debounce';
import { kjToKcal, rounded } from '../../utils/converters';

const ProductsTableRow = ({
  data, index, isHeader, isForm, 
  handleCancelProductAdding, handleAcceptClick, handleRemoveClick}) => {

  const tdClasses = cn(styles.td, isHeader ? styles.td_header : '');
  const [title, setTitle] = useState('');
  const [debouncedTitle] = useDebounce(title, 500);
  const [searchProducts, setSearchProducts] = useState([]);
  const [productToAdd, setProductToAdd] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const defaults = {
    count: 0,
    proteins: 0,
    fats: 0,
    carbohydrates: 0,
    energy: 0
  }

  const [count, setCount] = useState(defaults.count);
  const [proteins, setProteins] = useState(defaults.proteins);
  const [fats, setFats] = useState(defaults.fats);
  const [carbohydrates, setCarbohydrates] = useState(defaults.carbohydrates);
  const [energy, setEnergy] = useState(defaults.energy);

  let row;

  useEffect(() => {
    if (debouncedTitle) {
      const getProducts = async () => {
        const response = await fetch(requestString(debouncedTitle));
        const products = await response.json();
        setSearchProducts(
          products.foods
          .filter(p => p.dataType ===	"Survey (FNDDS)")
          .sort(p => p.description.toLowerCase().startsWith(debouncedTitle.toLowerCase()) ? -1 : 1)
          .slice(0, 10)
        );
      }
      getProducts();
    }
  }, [debouncedTitle]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setProductToAdd(null);
    setValues(defaults);
  }

  const getNutrient = (product, nutrientName) => {
    const nutrient = product.foodNutrients.find(fn => fn.nutrientName === nutrientName);
    if (nutrientName === "Energy" && nutrient?.unitName === "kJ") {
      return kjToKcal(nutrient.value);
    }
    return nutrient?.value || 0;
  }

  const handleChooseProduct = (item) => {
    setProductToAdd(item);
    setTitle(item.description);
    const weight = item.foodMeasures[0].gramWeight;
    setValues({
      count: weight,
      proteins: weight * getNutrient(item, 'Protein') / 100,
      fats: weight * getNutrient(item, 'Total lipid (fat)') / 100,
      carbohydrates: weight * getNutrient(item, 'Carbohydrate, by difference') / 100,
      energy: weight * getNutrient(item, 'Energy') / 100,
    })
    setShowSearchResults(false);
  }

  const handleCountChange = (event) => {
    if (event.target.value.length < 5) {
      const weight = event.target.value === '' ? 0 : parseInt(event.target.value);
      setCount(weight);
      if (productToAdd) {
        setValues({
          count: weight,
          proteins: weight * getNutrient(productToAdd, 'Protein') / 100,
          fats: weight * getNutrient(productToAdd, 'Total lipid (fat)') / 100, 
          carbohydrates: weight * getNutrient(productToAdd, 'Carbohydrate, by difference') / 100, 
          energy: weight * getNutrient(productToAdd, 'Energy') / 100, 
        })
      }
    }
  }

  const setValues = (values) => {
    setCount(values.count);
    setProteins(rounded(values.proteins, 2));
    setFats(rounded(values.fats, 2));
    setCarbohydrates(rounded(values.carbohydrates, 2));
    setEnergy(rounded(values.energy, 2));
  }

  if (isForm) {
    row = (
      <tr>
        <td className={tdClasses}>
          <div className={styles.td_number}>{index + 1}</div>
        </td>
        <td className={tdClasses}>
          <input 
            type='text' 
            className={styles.input} 
            value={title} 
            onChange={handleTitleChange}
            onFocus={() => setShowSearchResults(true)}
          /> 
          <Button 
            className={styles.button_accept}
            variant={{isCRUD: true, isAccept: true}} 
            onClick={() => productToAdd && handleAcceptClick({
              title, count, proteins, fats, carbohydrates, energy
            })}
          />
          {
            searchProducts.length > 0 && showSearchResults &&
            <ul className={styles.searchResults}>
              {searchProducts.map(item => 
                <li className={styles.searchResults__item} onClick={() => handleChooseProduct(item)}>
                  {item.description}
                </li>
              )}
            </ul>
          }
        </td>
        <td className={tdClasses}>
          <input 
            type='number' 
            min={0} 
            max={9999} 
            className={cn(styles.input, styles.input_number)} 
            value={count} 
            onChange={handleCountChange} 
          />
        </td>
        <td className={tdClasses}>{proteins}</td>
        <td className={tdClasses}>{fats}</td>
        <td className={tdClasses}>{carbohydrates}</td>
        <td className={tdClasses}>{energy}</td>
        <td className={tdClasses}>
          <Button 
            className={styles.button_remove} 
            variant={{isCRUD: true, isRemove: true}} 
            onClick={handleCancelProductAdding}
          />
        </td>
      </tr>
    );
  } else {
    row = (
      <tr className={isHeader && styles.header}>
        <td className={cn(tdClasses, styles.td_column1)}>
          {
            isHeader ?
            '#' :
            <div className={styles.td_number}>{index + 1}</div>
          }
        </td>
        <td className={cn(tdClasses, styles.td_wide, isHeader ? '' : styles.td_product)}>{data.title}</td>
        <td className={tdClasses}>{data.count}</td>
        <td className={tdClasses}>{data.proteins}</td>
        <td className={tdClasses}>{data.fats}</td>
        <td className={tdClasses}>{data.carbohydrates}</td>
        <td className={tdClasses}>{data.energy}</td>
        <td className={tdClasses}>
          {
          !isHeader && 
          <Button 
            className={styles.button_remove} 
            variant={{isCRUD: true, isRemove: true}} 
            onClick={() => {handleRemoveClick(data.id)}}
          />
          }
        </td>
      </tr>
    );
  }

  return row;
}

export default ProductsTableRow;