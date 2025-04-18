import { useState } from "react"
import { Items } from "../../components/Items/Items"
import { Item, ItemId, ValoresFiltros, type Item as ItemType } from "../../utils/types"
import { ESTADO_PELIS } from "../../utils/consts"
import Header from "../../components/Header_Footer/Header/Header"
import styles from "./Home.module.css"
import Titulo from "../../components/Titulo/Titulo"
import Modal from "../../components/Modal/Modal"
import Formulario from "../../components/Formularios/Formulario"
import Button from "../../components/Buttons/Button_AgregarEditar/ButtonAgregarEditar"

const mockPeliculas = [
    {
        id: '1',
        title: "Jojo's Bizarre Adventure: Steel Ball Run",
        director: 'Hirohiko Araki',
        anio: 2004,
        genero: 'Acción',
        rating: 10,
        tipo: 'Serie',
        vista: false
    },
    {
        id: '2',
        title: 'Django Unchained',
        director: 'Quentin Tarantino',
        anio: 2012,
        genero: 'Acción',
        rating: 8.5,
        tipo: 'Pelicula',
        vista: false
    },
    {
        id: '3',
        title: 'Inglourious Basterds',
        director: 'Quentin Tarantino',
        anio: 2009,
        genero: 'Acción',
        rating: 8.4,
        tipo: 'Pelicula',
        vista: false
    },
    {
        id: '4',
        title: 'Kill Bill: Volumen I',
        director: 'Quentin Tarantino',
        anio: 2003,
        genero: 'Acción',
        rating: 8.2,
        tipo: 'Pelicula',
        vista: false
    }
]

const Home = () => {
    const [pelis, setPelis] = useState(mockPeliculas)
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<ValoresFiltros>(ESTADO_PELIS.ACTIVE)

    const [abrirModal, setAbreModal] = useState(false)

    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)

    const [enEdicion, setEnEdicion] = useState(false)

    const handleDetallesLectura = (item: ItemType) => {
        setSelectedItem(item)
        setEnEdicion(false)
        setAbreModal(true)
    }

    const handleOpenModal = () => {
        const noHayItem: null = null
        const open: boolean = true
        setSelectedItem(noHayItem)
        setEnEdicion(true)
        setAbreModal(open)
    }

    const handleEditItem = (item: ItemType) => {
        const open: boolean = true
        setSelectedItem(item)
        setEnEdicion(true)
        setAbreModal(open)
    }

    const handleCerrarModal = () => {
        const noHayItem: null = null
        const close: boolean = false
        setSelectedItem(noHayItem)
        setAbreModal(close)
    }

    const handleEditarItem = (item: ItemType) => {
        const nuevasPelis = pelis.map((peli) =>
            peli.id === item.id ? item : peli
        )
        setPelis(nuevasPelis)
        handleCerrarModal()
    }


    const handleRemover = (args?: { id?: ItemId["id"] }): void => {
        if (!args?.id) return
        const nuevasPelis = pelis.filter(peli => peli.id !== args.id)
        setPelis(nuevasPelis)
    }

    const handleCompletado = ({ id, vista }: Pick<ItemType, 'id' | 'vista'>): void => {
        const nuevaPelis = pelis.map(peli => {
            if (peli.id === id) {
                return {
                    ...peli,
                    vista
                }
            }
            return peli
        })
        setPelis(nuevaPelis)
    }

    const handleFilterChange = (filtro: ValoresFiltros): void => {
        // console.log(filtro)
        setFiltroSeleccionado(filtro)
    }

    const contadorActivo = pelis.filter(peli => !peli.vista).length
    const contadorCompleto = pelis.length - contadorActivo
    // console.log(contadorCompleto)

    const pelisFiltradas = pelis.filter(peli => {
        if (filtroSeleccionado === ESTADO_PELIS.ACTIVE) {
            return !peli.vista
        }
        if (filtroSeleccionado === ESTADO_PELIS.COMPLETED) {
            return peli.vista
        }

        return peli
    })

    const handleDuplicateTitle = (item: Item): void => {
        const titulo = item.title.trim().toLowerCase()

        const enLista = pelis.some(peli => peli.title.trim().toLowerCase() === titulo)
        if (enLista) {
            alert("Ya la tenes")
            return
        }

        const nuevaPeli: ItemType = {
            id: crypto.randomUUID(),
            title: item.title.trim(),
            director: item.director.trim(),
            anio: Number(item.anio),
            genero: item.genero.trim(),
            rating: Number(item.rating),
            tipo: item.tipo.trim(),
            vista: false
        }

        setPelis([...pelis, nuevaPeli])
    }

    const onClearCompleted = (): void => {
        const borrarPelisVistas = pelis.filter(peli => !peli.vista)
        setPelis(borrarPelisVistas)
    }



    return (
        <>
            <Titulo />

            <Header
                contadorActivo={contadorActivo}
                contadorCompleto={contadorCompleto}
                filtroSeleccionado={filtroSeleccionado}
                handleFilterChange={handleFilterChange}
                onClearCompleted={onClearCompleted}
                pelis={pelis}
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
                                className="secondary"
                            />
                        </div>
                    )
                )}
            </Modal>

            <div className={styles.container}>
                <Items
                    items={pelisFiltradas}
                    onCheckCompleted={handleCompletado}
                    onRemoveItem={handleRemover}
                    editarItem={handleEditItem}
                    leerDetalles={handleDetallesLectura}
                />
            </div>
        </>
    )
}

export default Home