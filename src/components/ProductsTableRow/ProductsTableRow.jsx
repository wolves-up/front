import Button from '../Button/Button';
import styles from './ProductsTableRow.module.css';
import cn from'classnames';

const ProductsTableRow = ({data, index, isHeader}) => {
  const tdClasses = cn(styles.td, isHeader ? styles.td_header : '');
  return (
    <tr className={isHeader && styles.header}>
      <td className={tdClasses}>
        {
          isHeader ?
          '#' :
          <div className={styles.td_number}>{index + 1}</div>
        }
      </td>
      <td className={cn(tdClasses, isHeader ? '' : styles.td_product)}>{data.title}</td>
      <td className={tdClasses}>{data.count}</td>
      <td className={tdClasses}>{data.proteins}</td>
      <td className={tdClasses}>{data.fats}</td>
      <td className={tdClasses}>{data.carbohydrates}</td>
      <td className={tdClasses}>{data.energy}</td>
      <td className={tdClasses}>
        {!isHeader && <Button className={styles.button_remove} variant={{isCRUD: true, isRemove: true}} />}
      </td>
    </tr>
  );
}

export default ProductsTableRow;