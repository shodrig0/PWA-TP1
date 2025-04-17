export interface Item {
    id: string,
    title: string,
    vista: boolean
}

export type ItemId = Pick<Item, 'id'>
export type ItemTitle = Pick<Item, 'title'>
export type ItemVista = Pick<Item, 'vista'>

export type ListOfItems = Item[]

export type ValoresFiltros = typeof ESTADO_PELIS[keyof typeof ESTADO_PELIS] // --> usamos el index