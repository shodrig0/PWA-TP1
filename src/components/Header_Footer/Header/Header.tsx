import FiltroVista from "../../Buttons/Button_Filtros/FiltroVista"
import { ValoresFiltros } from "../../../utils/types"
import ButtonDelete from "../../Buttons/Button_Delete/ButtonDelete"
import styles from "../Header/Header.module.css"

interface Props {
    contadorActivo: number
    contadorCompleto: number
    filtroSeleccionado: ValoresFiltros
    onClearCompleted: () => void
    handleFilterChange: (filtro: ValoresFiltros) => void
    peliculasPendientes: number
    seriesPendientes: number
    generoSelected: string
    cambiarGenero: (genero: string) => void
    textoBusqueda: string
    handleBuscador: (texto: string) => void
    tipoSeleccionado: string
    handleTipoSeleccion: (texto: string) => void
}

const Header: React.FC<Props> = ({
    contadorActivo,
    contadorCompleto,
    filtroSeleccionado,
    handleFilterChange,
    onClearCompleted,
    peliculasPendientes,
    seriesPendientes,
    generoSelected,
    cambiarGenero,
    textoBusqueda,
    handleBuscador,
    tipoSeleccionado,
    handleTipoSeleccion
}) => {
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
                    generoSelected={generoSelected}
                    cambiarGenero={cambiarGenero}
                    textoBusqueda={textoBusqueda}
                    handleBuscador={handleBuscador}
                    porTipo={tipoSeleccionado}
                    handleTipoSeleccion={handleTipoSeleccion}
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