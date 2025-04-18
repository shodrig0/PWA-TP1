import { useEffect, useState } from 'react'
import { Item as ItemType } from "../../utils/types"
import styles from './Formulario.module.css'

interface Props {
    agregarItem: (item: ItemType) => void
    editarItem: (item: ItemType) => void
    itemEditar?: ItemType | null
}

const Formulario: React.FC<Props> = ({ agregarItem, editarItem, itemEditar }) => {
    const [form, setForm] = useState<ItemType>({
        id: '',
        title: '',
        director: '',
        anio: 0,
        genero: 'Acción',
        rating: 0,
        tipo: 'Serie',
        vista: false,
    })

    useEffect(() => {
        if (itemEditar) {
            setForm(itemEditar)
        } else {
            setForm({
                id: "",
                title: "",
                director: "",
                anio: 0,
                genero: "Acción",
                rating: 0,
                tipo: "Pelicula",
                vista: false,
            })
        }
    }, [itemEditar])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (itemEditar && editarItem) {
            editarItem({
                ...form,
                anio: Number(form.anio),
                rating: Number(form.rating)
            })
        } else {
            agregarItem({
                ...form,
                id: crypto.randomUUID(),
                anio: Number(form.anio),
                rating: Number(form.rating),
            })
            setForm({
                id: '',
                title: '',
                director: '',
                anio: 0,
                genero: 'Acción',
                rating: 0,
                tipo: 'Película',
                vista: false,
            })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.heading}>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <input className={styles.input}
                        name="title"
                        placeholder="Título"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <input className={styles.input}
                        name="director"
                        placeholder="Director"
                        value={form.director}
                        onChange={handleChange}
                        required
                    />
                    <input className={styles.input}
                        name="anio"
                        type="number"
                        placeholder="Año"
                        value={form.anio}
                        onChange={handleChange}
                        required
                    />
                    <select name="genero" value={form.genero} onChange={handleChange}>
                        <option>Acción</option>
                        <option>Comedia</option>
                        <option>Drama</option>
                        <option>Ciencia Ficción</option>
                        <option>Terror</option>
                    </select>
                    <input className={styles.input}
                        name="rating"
                        type="number"
                        placeholder="Rating"
                        value={form.rating}
                        onChange={handleChange}
                        required
                    />
                    <select name="tipo" value={form.tipo} onChange={handleChange}>
                        <option>Película</option>
                        <option>Serie</option>
                    </select>
                    <button type="submit">{itemEditar ? "Editar" : "Agregar"}</button>
                </form>
            </div>
        </div>

    )
}

export default Formulario