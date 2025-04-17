import { useState } from "react"
import { Items } from "../../components/Items/Items"
import { Item, ItemId, ValoresFiltros, type Item as ItemType } from "../../utils/types"
import { ESTADO_PELIS } from "../../utils/consts"
import Header from "../../components/Header_Footer/Header/Header"
import styles from "./Home.module.css"
import Titulo from "../../components/Titulo/Titulo"

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


    const handleRemover = ({ id }: ItemId): void => {
        const nuevasPelis = pelis.filter(peli => peli.id !== id)
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
                agregarItem={handleDuplicateTitle}
                pelis={pelis}
            />

            <div className={styles.container}>
                <Items
                    onCheckCompleted={handleCompletado}
                    onRemovePeli={handleRemover}
                    items={pelisFiltradas}
                />
            </div>

        </>
    )
}

export default Home