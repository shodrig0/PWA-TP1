export interface Item {
    id: string,
    title: string,
    director: string,
    anio: number,
    genero: string,
    rating: number,
    tipo: string
    vista: boolean
}

export type ItemId = Pick<Item, 'id'>
export type ItemTitle = Pick<Item, 'title'>
export type ItemDirector = Pick<Item, 'director'>
export type ItemAnio = Pick<Item, 'anio'>
export type ItemGenero = Pick<Item, 'genero'>
export type ItemRating = Pick<Item, 'rating'>
export type ItemTipo = Pick<Item, 'tipo'>
export type ItemVista = Pick<Item, 'vista'>

export type ListOfItems = Item[]

export type ValoresFiltros = typeof ESTADO_PELIS[keyof typeof ESTADO_PELIS] // --> usamos el index