import { Filtro } from "../../Buttons/Button_Filtros/Filtro_Vista"
import { ValoresFiltros } from "../../../utils/types"
import Formulario from "../../Formularios/Formulario"
// import styles from "../Header/Header.module.css"

interface Props {
    contadorActivo: number
    contadorCompleto: number
    filtroSeleccionado: ValoresFiltros
    handleFilterChange: (filtro: ValoresFiltros) => void
    agregarItem: (item: {
        title: string
        director: string
        anio: string
        genero: string
        rating: string
        tipo: string
        imagen: string
    }) => void
}

const Header: React.FC<Props> = ({
    contadorActivo = 0,
    contadorCompleto = 0,
    filtroSeleccionado,
    handleFilterChange,
    agregarItem
}) => {
    return (
        <>
            <header className="">
                <span className="">
                    <strong>{contadorActivo}</strong> pelis o series por ver!
                </span>
                <Filtro
                    filtroSeleccionado={filtroSeleccionado}
                    onFiltroChange={handleFilterChange}
                />
            </header>

            <Formulario agregarItem={agregarItem} />
        </>
    )
}

export default Header