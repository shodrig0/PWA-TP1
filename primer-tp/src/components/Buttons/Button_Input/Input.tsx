import { type ItemId, type Item as ItemType } from "../../../utils/types";
import Button from "../Button_Delete/ButtonDelete";
import styles from "./Input_Check.module.css";

interface Props extends ItemType {
  onCheckCompleted: ({ id, vista }: Pick<ItemType, "id" | "vista">) => void;
  onRemoveItem: ({ id }: ItemId) => void;
}

export const Input: React.FC<Props> = ({ id, title, vista, onRemoveItem, onCheckCompleted }) => {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onCheckCompleted({
      id,
      vista: event.target.checked,
    });
  };

  const inputId = `check-${id}`;

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        <input
          id={inputId}
          className={styles.checkbox}
          checked={vista}
          type="checkbox"
          onChange={handleChangeInput}
        />
        <div className={styles.checkmark} />
      </label>
      <span className={styles.labelText}>{title}</span>
      <Button id={id} onRemoveItem={onRemoveItem} />
    </div>
  );
};