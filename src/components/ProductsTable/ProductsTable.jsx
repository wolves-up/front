import Button from '../Button/Button';
import ProductsTableRow from '../ProductsTableRow/ProductsTableRow';
import styles from './ProductsTable.module.css';

const ProductsTable = ({products}) => {
  const headerData = {
    title: 'product', 
    count: 'count (g)', 
    proteins: 'proteins (g)', 
    fats: 'fats (g)',
    carbohydrates: 'carbohydrates (g)',
    energy: 'energy (kcal)'
  };

  return (
    <>
    <table className={styles.table}>
      <ProductsTableRow 
        isHeader
        data={headerData} 
      />
      {products.map((item, index) => <ProductsTableRow data={item} index={index}/>)}
    </table>
    <Button variant={{isCRUD: true, isAdd: true}} />
    </>
  );
}

export default ProductsTable;