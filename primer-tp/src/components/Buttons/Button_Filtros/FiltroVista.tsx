import { ESTADO_BTNS } from "../../../utils/consts"
import { ValoresFiltros } from "../../../utils/types"
import styles from "./FiltroVista.module.css"

interface Props {
    // filtroSeleccionado: 'active' | 'completed'
    onFiltroChange: (filtro: ValoresFiltros) => void
    filtroSeleccionado: ValoresFiltros
}

const FiltroVista: React.FC<Props> = ({ filtroSeleccionado, onFiltroChange }) => {
    return (
        <ul className={styles.lista}>
            {
                Object.entries(ESTADO_BTNS).map(([key, { href, estado }]) => {
                    const seleccionado = key === filtroSeleccionado
                    const className = seleccionado ? 'selected' : ''
                    return (
                        <li key={key}>
                            <a href={href}
                                className={className}
                                onClick={(event) => {
                                    event.preventDefault()
                                    onFiltroChange(key)
                                }}>
                                {estado}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default FiltroVista