import FiltroVista from "../../Buttons/Button_Filtros/FiltroVista"
import { Item, ValoresFiltros } from "../../../utils/types"
import ButtonDelete from "../../Buttons/Button_Delete/ButtonDelete"
import styles from "../Header/Header.module.css"

interface Props {
    contadorActivo: number
    contadorCompleto: number
    filtroSeleccionado: ValoresFiltros
    onClearCompleted: () => void
    handleFilterChange: (filtro: ValoresFiltros) => void
    pelis: Item[]
    // tipoSeleccionado: 'pelicula' | 'serie' // RECORDAR LO DEL HANDLE TAMBIÉN ESTÁ EN FILTROVISTA
}

const Header: React.FC<Props> = ({
    contadorActivo,
    contadorCompleto,
    filtroSeleccionado,
    handleFilterChange,
    onClearCompleted,
    pelis
    // tipoSeleccionado
}) => {

    const peliculasPendientes = pelis.filter(peli => peli.tipo === 'Pelicula' && !peli.vista).length
    const seriesPendientes = pelis.filter(peli => peli.tipo === 'Serie' && !peli.vista).length

    return (
        <>
            <header className={styles.containerHeader}>
                {contadorActivo > 0 ? (
                    <span>
                        Tenés <strong>{peliculasPendientes}</strong> {peliculasPendientes === 1 ? 'peli' : 'pelis'} y{' '}
                        <strong>{seriesPendientes}</strong> {seriesPendientes === 1 ? 'serie' : 'series'} para ver
                    </span>) : (<span>No hay nada para ver</span>)}
                <FiltroVista
                    filtroSeleccionado={filtroSeleccionado}
                    onFiltroChange={handleFilterChange}
                // tipoContenido={tipoSeleccionado}
                />
            </header>

            {contadorCompleto > 0 && (
                <ButtonDelete
                    onRemoveItem={onClearCompleted}
                    onClearAll={true}
                />
            )}
        </>
    )
}

export default Header