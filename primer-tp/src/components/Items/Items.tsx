import React, { useState } from "react"
import { type Item as ItemType, type ItemId, type ListOfItems } from "../../utils/types"
import { Input } from "../Buttons/Button_Input/Input"
import Modal from "../Modal/Modal"
import { COLORES } from "../../utils/consts"
import styles from "./Items.module.css"

type OnCheckCompleted = (args: Pick<ItemType, "id" | "vista">) => void
interface Props {
    items: ListOfItems
    onCheckCompleted: OnCheckCompleted
    onRemoveItem: (args?: { id?: ItemId["id"] }) => void
}

export const Items: React.FC<Props> = ({ items, onRemoveItem, onCheckCompleted }) => {
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
    const [abrirModal, setAbrirModal] = useState(false)

    const handleItemClick = (item: ItemType) => {
        const open: boolean = true
        setSelectedItem(item)
        setAbrirModal(open)
    }

    const handleCerrarModal = () => {
        const close: boolean = false
        setSelectedItem(null)
        setAbrirModal(close)
    }

    return (
        <>
            <div className={styles.cards}>
                {items.map((item, index) => (
                    <div
                        key={item.id}
                        className={`${styles.card} ${styles[COLORES[index % COLORES.length]]}`}
                    >
                        <span
                            className={styles.itemTitle}
                            onClick={(e) => {
                                e.preventDefault()
                                handleItemClick(item)
                            }}
                        >
                            {item.title}
                        </span>

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
                    </div>
                ))}
            </div>

            <Modal abreModal={abrirModal} seCierra={handleCerrarModal}>
                {selectedItem && (
                    <div>
                        <h2>{selectedItem.title}</h2>
                        <p>
                            <strong>Director:</strong> {selectedItem.director}
                        </p>
                        <p>
                            <strong>Año:</strong> {selectedItem.anio}
                        </p>
                        <p>
                            <strong>Género:</strong> {selectedItem.genero}
                        </p>
                        <p>
                            <strong>Rating:</strong> {selectedItem.rating}
                        </p>
                        <p>
                            <strong>Tipo:</strong> {selectedItem.tipo}
                        </p>
                    </div>
                )}
            </Modal>
        </>
    )
}