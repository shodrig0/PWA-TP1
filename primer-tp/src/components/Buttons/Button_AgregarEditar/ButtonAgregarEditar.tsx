import React from "react"
import styles from "./Button.module.css"

interface ButtonProps {
    onClick: () => void
    label: string
    className?: string
}

const Button: React.FC<ButtonProps> = ({ onClick, label, className }) => {
    return (
        <button className={`${styles.button} ${className || ""}`} onClick={onClick}>
            {label}
        </button>
    )
}

export default Button