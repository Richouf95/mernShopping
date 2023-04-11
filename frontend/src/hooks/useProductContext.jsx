import { ProductContext } from '../contexts/ProductContext'
import { useContext } from 'react'

export const useProductContext = () => {
    const context = useContext(ProductContext)

    if(!context) {
        throw Error('useProductContext must be used inside a ProducContexttProvider')
    }

    return context
}