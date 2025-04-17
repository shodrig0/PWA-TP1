import { useState } from 'react'
import styles from './Formulario.module.css'
import { Item } from "../../utils/types"

interface Props {
    agregarItem: (item: Item) => void
}

const Formulario: React.FC<Props> = ({ agregarItem }) => {
    const [form, setForm] = useState<Item>({
        id: '',
        title: '',
        director: '',
        anio: 0,
        genero: 'Comedia',
        rating: 0,
        tipo: 'Serie',
        vista: false,
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        agregarItem({
            ...form,
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

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <input
                name="title"
                placeholder="Título"
                value={form.title}
                onChange={handleChange}
                required
            />
            <input
                name="director"
                placeholder="Director"
                value={form.director}
                onChange={handleChange}
                required
            />
            <input
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
            <input
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
            <button type="submit">Agregar</button>
        </form>
    )
}

export default Formulario