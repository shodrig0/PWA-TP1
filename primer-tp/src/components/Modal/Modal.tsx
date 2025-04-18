import React, { useEffect } from "react"
import Button from "../Buttons/Button_AgregarEditar/ButtonAgregarEditar"
import styles from "./Modal.module.css"

interface Props {
    abreModal: boolean
    seCierra: () => void
    children: React.ReactNode
}

const Modal: React.FC<Props> = ({ abreModal, seCierra, children }) => {

    useEffect(() => {
        const handleEscapeModal = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                seCierra()
            }
        }

        if (abreModal) {
            document.addEventListener("keydown", handleEscapeModal)
        }
        return () => {
            document.removeEventListener("keydown", handleEscapeModal)
        }
    }, [abreModal, seCierra])

    const dispararX: null = null
    if (!abreModal) return dispararX

    return (
        <div
            className={styles.overlay}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    seCierra()
                }
            }}
        >
            <div className={styles.modal}>
                <Button onClick={seCierra} label="X" />
                {children}
            </div>
        </div>
    )
}

export default Modal