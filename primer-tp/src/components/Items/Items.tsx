import { type Item as ItemType, type ItemId, type ListOfItems } from "../../utils/types"
import { Input } from "../Buttons/Button_Input/Input"
import { COLORES } from "../../utils/consts"
import styles from "./Items.module.css"
import Button from "../Buttons/Button_AgregarEditar/ButtonAgregarEditar"

type OnCheckCompleted = (args: Pick<ItemType, "id" | "vista">) => void
interface Props {
    items: ListOfItems
    onCheckCompleted: OnCheckCompleted
    onRemoveItem: (args?: { id?: ItemId["id"] }) => void
    editarItem: (item: ItemType) => void
    leerDetalles: (item: ItemType) => void
}

export const Items: React.FC<Props> = ({ items, onRemoveItem, onCheckCompleted, editarItem, leerDetalles }) => {
    return (
        <div className={styles.cards}>
            {items.map((item, index) => (
                <div
                    key={item.id}
                    className={`${styles.card} ${styles[COLORES[index % COLORES.length]]}`}
                >
                    <span
                        className={styles.itemTitle}
                        onClick={() => leerDetalles(item)}
                    >{item.title}</span>
                    <div className={styles["card-btns"]}>
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
                            onRemoveItem={onRemoveItem}
                        />
                        <Button
                            className={styles.editButton}
                            onClick={() => editarItem(item)}
                            label="Editar"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};