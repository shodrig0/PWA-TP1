import { type Item as ItemType, type ItemId, type ListOfItems } from "../../utils/types"
import { Input } from "../Buttons/Button_Input/Input"
import { COLORES } from "../../utils/consts";
import styles from "./Items.module.css"

interface Props {
    items: ListOfItems;
    onCheckCompleted: ({ id, vista }: Pick<ItemType, "id" | "vista">) => void;
    onRemovePeli: ({ id }: ItemId) => void;
}

export const Items: React.FC<Props> = ({ items, onRemovePeli, onCheckCompleted }) => {
    return (
        <ul className={styles.cards}>
            {items.map((item, index) => (
                <li key={item.id} className={`${styles.card} ${styles[COLORES[index % COLORES.length]]}`}>
                    <Input
                        id={item.id}
                        title={item.title}
                        vista={item.vista}
                        onCheckCompleted={onCheckCompleted}
                        onRemoveItem={onRemovePeli}
                    />
                </li>
            ))}
        </ul>
    )
}