import React from "react"
import styles from "./Contador.module.css"

interface Props {
    countGenero: Record<string, number>
}

const Contador: React.FC<Props> = ({ countGenero }) => {
    return (
        <div className={styles.containerCount}>
            <h3>Pelis/Series por Género:</h3>
            <ul>
                {Object.entries(countGenero).map(([genero, count]) => (
                    <li key={genero}>
                        <strong>{genero}:</strong> {count}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Contador