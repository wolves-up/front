import { useState } from "react";
import Button from "../Button/Button";
import styles from "./EditableListItem.module.css";

const EditableListItem = ({id, index, initialValue, editAction, removeAction, isEditing}) => {
  const [editing, setEditing] = useState(isEditing || false);
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  }

  const handleEditClick = () => {
    setEditing(true);
  }

  const handleAcceptClick = () => {
    editAction(index, {id, value});
    setEditing(false);
  }

  const handleRemoveClick = () => {
    removeAction(index);
  }

  return (
    <li className={styles.item}>      
      <Button onClick={handleRemoveClick} variant={{isCRUD: true, isRemove: true}} />
      {
        editing ?
        <input type="text" value={value} onChange={handleChange} /> :
        value
      }
      {
        editing ?
        <Button onClick={handleAcceptClick} variant={{isCRUD: true, isAccept: true}} /> :
        <Button onClick={handleEditClick} variant={{isCRUD: true, isEdit: true}} />
      }
    </li>
  );
}

export default EditableListItem;