import { usePelis } from "../../utils/usePelis"
import { Items } from "../../components/Items/Items"
import Header from "../../components/Header_Footer/Header/Header"
import Titulo from "../../components/Titulo/Titulo"
import Modal from "../../components/Modal/Modal"
import Formulario from "../../components/Formularios/Formulario"
import Button from "../../components/Buttons/Button_AgregarEditar/ButtonAgregarEditar"
import styles from "./Home.module.css"
import Contador from "../../components/Contador/Contador"

const Home = () => {
    const {
        pelisFinalFiltradas,
        abrirModal,
        enEdicion,
        selectedItem,
        contadorActivo,
        contadorCompleto,
        filtroSeleccionado,
        handleCerrarModal,
        handleOpenModal,
        handleDuplicateTitle,
        handleEditarItem,
        handleEditItem,
        handleRemover,
        handleCompletado,
        handleDetallesLectura,
        handleFilterChange,
        onClearCompleted,
        contadorGeneroTotal,
        generoSelected,
        setGeneroSelected,
        textoBusqueda,
        handleBuscador,
        tipoSeleccionado,
        handleTipoSeleccion,
        tipos,
    } = usePelis()

    return (
        <>
            <Titulo />

            <Header
                contadorActivo={contadorActivo}
                contadorCompleto={contadorCompleto}
                filtroSeleccionado={filtroSeleccionado}
                handleFilterChange={handleFilterChange}
                onClearCompleted={onClearCompleted}
                peliculasPendientes={tipos["Pelicula"]?.pendientes || 0}
                seriesPendientes={tipos["Serie"]?.pendientes || 0}
                generoSelected={generoSelected}
                cambiarGenero={setGeneroSelected}
                textoBusqueda={textoBusqueda}
                handleBuscador={handleBuscador}
                tipoSeleccionado={tipoSeleccionado}
                handleTipoSeleccion={handleTipoSeleccion}

            />

            <Button onClick={handleOpenModal} label="Agregar +" />

            <Modal abreModal={abrirModal} seCierra={handleCerrarModal}>
                {enEdicion ? (
                    <Formulario
                        agregarItem={handleDuplicateTitle}
                        editarItem={handleEditarItem}
                        itemEditar={selectedItem}
                    />
                ) : (
                    selectedItem && (
                        <div>
                            <h2>{selectedItem.title}</h2>
                            <p><strong>Director:</strong> {selectedItem.director}</p>
                            <p><strong>Año:</strong> {selectedItem.anio}</p>
                            <p><strong>Género:</strong> {selectedItem.genero}</p>
                            <p><strong>Rating:</strong> {selectedItem.rating}</p>
                            <p><strong>Tipo:</strong> {selectedItem.tipo}</p>
                            <Button
                                onClick={() => handleEditItem(selectedItem)}
                                label="Editar"
                            />
                        </div>
                    )
                )}
            </Modal>
            {/* {console.log("Items filtrados:", pelisFiltradas.map(p => `${p.title} - ${p.vista}`))} */}

            <div className={styles.zonaContenido}>
                <Contador countGenero={contadorGeneroTotal} />

                <div className={styles.container}>
                    <Items
                        items={pelisFinalFiltradas}
                        onCheckCompleted={handleCompletado}
                        onRemoveItem={handleRemover}
                        editarItem={handleEditItem}
                        leerDetalles={handleDetallesLectura}
                    />
                </div>
            </div>
        </>
    )
}

export default Home
