import React, {createContext, useReducer} from 'react'

export const ProductContext = createContext()

export const productsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return {
                products: action.payload
            }
        case 'CREATE_PRODUCT':
            return {
                products: [action.payload, ...state.products]
            }
        case 'DELETE':
            return {
                products: state.products.filter(i => i._id !== action.payload._id)
            }
        case 'UPDATE':
            const newProductsState = state.products.map(i => {
                if(i._id === action.payload._id) {
                    const newI = i = action.payload
                    return newI
                }
                return i
            })
            return {
                products: newProductsState
            }
        default:
            return state;
    }
}

export const ProductContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(productsReducer, {
        products: null
    })

  return (
    <ProductContext.Provider value={{...state, dispatch}}>
        { children }
    </ProductContext.Provider>
  )
}