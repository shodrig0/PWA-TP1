import { useState } from 'react'

interface Props {
    agregarItem: (title: string) => void
}

const Formulario: React.FC<Props> = ({ agregarItem }) => {
    const [inputValue, setInputValue] = useState('')
    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter' && inputValue !== '') {
            agregarItem(inputValue)
            setInputValue('')
        }
    }

    return (
        <>
            <input
                className=''
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeyDown}
                placeholder='Título'
                autoFocus
            />
            <input
                className=''
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeyDown}
                placeholder='Director'
            />
            <input
                className=''
                value={inputValue}
                onChange={(e) => { setInputValue(e.target.value) }}
                onKeyDown={handleKeyDown}
                placeholder='Género'
            />
        </>
    )
}

export default Formulario