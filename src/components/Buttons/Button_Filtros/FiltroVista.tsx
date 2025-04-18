import { ESTADO_BTNS } from "../../../utils/consts"
import { ValoresFiltros } from "../../../utils/types"
import styles from "./FiltroVista.module.css"

interface Props {
    onFiltroChange: (filtro: ValoresFiltros) => void
    filtroSeleccionado: ValoresFiltros
    generoSelected: string
    cambiarGenero: (genero: string) => void
    textoBusqueda: string
    handleBuscador: (texto: string) => void
    porTipo: string
    handleTipoSeleccion: (texto: string) => void
}

const FiltroVista: React.FC<Props> = ({ filtroSeleccionado, onFiltroChange, generoSelected, cambiarGenero, textoBusqueda, handleBuscador, porTipo, handleTipoSeleccion }) => {
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
            <input
                type="text"
                placeholder="Buscar por título o director"
                value={textoBusqueda}
                onChange={(e) => handleBuscador(e.target.value)}
            />
            <div>
                <label htmlFor="tipo">Tipo:</label>
                <select
                    id="tipo"
                    value={porTipo}
                    onChange={(e) => handleTipoSeleccion(e.target.value)}
                >
                    <option value="Todos">Todos</option>
                    <option value="Pelicula">Pelicula</option>
                    <option value="Serie">Serie</option>
                </select>
            </div>
        </>
    )
}

export default FiltroVista