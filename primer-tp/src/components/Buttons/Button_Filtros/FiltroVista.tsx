import { ESTADO_BTNS } from "../../../utils/consts"
import { ValoresFiltros } from "../../../utils/types"
import styles from "./FiltroVista.module.css"

interface Props {
    // filtroSeleccionado: 'active' | 'completed'
    onFiltroChange: (filtro: ValoresFiltros) => void
    filtroSeleccionado: ValoresFiltros
    generoSelected: string
    cambiarGenero: (genero: string) => void
}

const FiltroVista: React.FC<Props> = ({ filtroSeleccionado, onFiltroChange, generoSelected, cambiarGenero }) => {
    return (
        <>
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
            <div>
                <label htmlFor="genero">Género:</label>
                <select
                    id="genero"
                    value={generoSelected}
                    onChange={(e) => cambiarGenero(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Acción">Acción</option>
                    <option value="Comedia">Comedia</option>
                    <option value="Drama">Drama</option>
                    <option value="Ciencia Ficción">Ciencia Ficción</option>
                    <option value="Terror">Terror</option>
                </select>
            </div>
        </>
    )
}

export default FiltroVista