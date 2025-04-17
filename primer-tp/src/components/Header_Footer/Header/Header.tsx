import { Filtro } from "../../Buttons/Button_Filtros/Filtro_Vista"
import { Item, ValoresFiltros } from "../../../utils/types"
import Formulario from "../../Formularios/Formulario"
import ButtonDelete from "../../Buttons/Button_Delete/ButtonDelete"
// import styles from "../Header/Header.module.css"

interface Props {
    contadorActivo: number
    contadorCompleto: number
    filtroSeleccionado: ValoresFiltros
    onClearCompleted: () => void
    handleFilterChange: (filtro: ValoresFiltros) => void
    agregarItem: (item: Item) => void
}

const Header: React.FC<Props> = ({
    contadorActivo,
    contadorCompleto,
    filtroSeleccionado,
    handleFilterChange,
    onClearCompleted,
    agregarItem
}) => {

    const countListaCompletada = contadorActivo === 1
    const countMsj = countListaCompletada ? 'peli' : 'pelis'
    return (
        <>
            <header className="">
                <span className="">
                    <strong>{contadorActivo}</strong> {countMsj} pendiente{!countMsj && 's'}
                </span>
                <Filtro
                    filtroSeleccionado={filtroSeleccionado}
                    onFiltroChange={handleFilterChange}
                />
            </header>

            <Formulario agregarItem={agregarItem} />

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