import { type Item as ItemType, type ItemId, type ListOfItems } from "../../utils/types"
import { Input } from "../Buttons/Button_Input/Input"
import { COLORES } from "../../utils/consts"
import styles from "./Items.module.css"

type OnCheckCompleted = (args: Pick<ItemType, "id" | "vista">) => void
interface Props {
    items: ListOfItems
    onCheckCompleted: OnCheckCompleted
    onRemovePeli: ({ id }: ItemId) => void
}

export const Items: React.FC<Props> = ({ items, onRemovePeli, onCheckCompleted }) => {
    return (
        <ul className={styles.cards}>
            {items.map((item, index) => (
                <li key={item.id} className={`${styles.card} ${styles[COLORES[index % COLORES.length]]}`}>
                    <Input
                        id={item.id}
                        title={item.title}
                        director={item.director}
                        anio={item.anio}
                        genero={item.genero}
                        rating={item.rating}
                        tipo={item.tipo}
                        vista={item.vista}
                        onCheckCompleted={onCheckCompleted}
                        onRemoveItem={onRemovePeli}
                    />
                </li>
            ))}
        </ul>
    )
}