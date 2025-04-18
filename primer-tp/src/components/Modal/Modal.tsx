import React from "react"
import styles from "./Modal.module.css"

interface Props {
    abreModal: boolean
    seCierra: () => void
    children: React.ReactNode
}

const Modal: React.FC<Props> = ({ abreModal, seCierra, children }) => {
    const dispararX: null = null
    if (!abreModal) return dispararX

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeButton} onClick={seCierra}>
                    X
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal