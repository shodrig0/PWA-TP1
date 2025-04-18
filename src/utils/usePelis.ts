import { useState, useEffect } from "react"
import { ESTADO_PELIS } from "./consts"
import { Item, ItemId, ValoresFiltros, type Item as ItemType } from "./types"

const mockPeliculas: ItemType[] = [
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
        genero: 'Drama',
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

export function usePelis() {
    const [pelis, setPelis] = useState<ItemType[]>(() => {
        const guardarArray = localStorage.getItem("pelis")
        return guardarArray ? JSON.parse(guardarArray) : mockPeliculas
    })
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<ValoresFiltros>(ESTADO_PELIS.ACTIVE)
    const [abrirModal, setAbreModal] = useState(false)
    const [selectedItem, setSelectedItem] = useState<ItemType | null>(null)
    const [enEdicion, setEnEdicion] = useState(false)
    const [generoSelected, setGeneroSelected] = useState<string>("Todos")
    const [textoBusqueda, setTextoBusqueda] = useState("")
    const [tipoSeleccionado, setTipoSeleccionado] = useState<string>("Todos")

    useEffect(() => {
        localStorage.setItem("pelis", JSON.stringify(pelis))
    }, [pelis])

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
        console.log("Peli ", id, "a vista =", vista)
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

    const pelisFiltradas: Item[] = pelis.filter((peli) => {
        const coincideEstado =
            filtroSeleccionado === "Activas" ? !peli.vista :
                filtroSeleccionado === "Completadas" ? peli.vista : true

        const coincideGenero =
            generoSelected === "Todos" ? true : peli.genero === generoSelected

        const coincideTipo =
            tipoSeleccionado === "Todos" ? true : peli.tipo === tipoSeleccionado

        const coincideBusqueda =
            textoBusqueda.trim() === "" ||
            peli.title.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
            peli.director.toLowerCase().includes(textoBusqueda.toLowerCase())

        return coincideEstado && coincideGenero && coincideTipo && coincideBusqueda
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

    const countGenero = () => {
        return pelis.reduce((count, peli) => {
            count[peli.genero] = (count[peli.genero] || 0) + 1
            return count
        }, {} as Record<string, number>)
    }


    const contadorGeneroTotal = countGenero()

    const handleGeneroChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGeneroSelected(e.target.value)
    }

    const countPorTipo = () => {
        return pelis.reduce((count, peli) => {
            const tipo = peli.tipo

            if (!count[tipo]) {
                count[tipo] = { total: 0, pendientes: 0 }
            }

            count[tipo].total += 1
            if (!peli.vista) count[tipo].pendientes += 1

            return count
        }, {} as Record<string, { total: number; pendientes: number }>)
    }

    const tipos = countPorTipo()
    const peliculasPendientes = tipos["Pelicula"]?.pendientes || 0
    const seriesPendientes = tipos["Serie"]?.pendientes || 0

    console.log(pelis.map(p => p.tipo))

    const pelisFinalFiltradas = pelis.filter((peli) => {
        const coincideEstado =
            filtroSeleccionado === "active" ? !peli.vista :
                filtroSeleccionado === "completed" ? peli.vista : true

        const coincideGenero = generoSelected === "Todos" || peli.genero === generoSelected
        const coincideTipo = tipoSeleccionado === "Todos" || peli.tipo === tipoSeleccionado
        const coincideBusqueda =
            textoBusqueda.trim() === "" ||
            peli.title.toLowerCase().includes(textoBusqueda.toLowerCase()) ||
            peli.director.toLowerCase().includes(textoBusqueda.toLowerCase())

        return coincideEstado && coincideGenero && coincideTipo && coincideBusqueda
    })


    const handleBuscador = (text: string) => {
        setTextoBusqueda(text)
    }

    const handleTipoSeleccion = (texto: string) => {
        setTipoSeleccionado(texto)
    }

    return {
        pelis,
        pelisFiltradas,
        pelisFinalFiltradas,
        selectedItem,
        abrirModal,
        enEdicion,
        filtroSeleccionado,
        contadorActivo,
        contadorCompleto,
        handleDetallesLectura,
        handleOpenModal,
        handleEditItem,
        handleCerrarModal,
        handleEditarItem,
        handleRemover,
        handleCompletado,
        handleFilterChange,
        handleDuplicateTitle,
        handleGeneroChange,
        onClearCompleted,
        contadorGeneroTotal,
        generoSelected,
        setGeneroSelected,
        handleBuscador,
        textoBusqueda,
        tipoSeleccionado,
        handleTipoSeleccion,
        tipos,
        peliculasPendientes,
        seriesPendientes,
    }
}
