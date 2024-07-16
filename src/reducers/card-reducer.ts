import { db } from "../data/db"
import { CartItem, Guitar } from "../types"

export type CartActions =
{ type: 'add-to-cart', payload: {item: Guitar}} |
{ type: 'remove-from-cart', payload:{id: Guitar['id']}} |
{ type: 'decrease-quantity', payload:{id: Guitar['id']}} |
{ type: 'increase-quantity', payload:{id: Guitar['id']}} |
{ type: 'clear-cart'}

export type CartState = {
    data: Guitar[]
    cart: CartItem[]
}

const inicialCart = () : CartItem[] =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }

export const initialState : CartState = {
    data: db,
    cart: inicialCart()
}

const maxItems = 10
const minItems = 1

//Uso de useReducer para un código fuertemente tapiado
export const cartReducer = (
    state: CartState = initialState,
    action: CartActions
) =>{
    
    if(action.type === 'add-to-cart'){

        const itemExists = state.cart.find(guitar => guitar.id === action.payload.item.id)

        let updateCart: CartItem[] = []

        if(itemExists){
            updateCart = state.cart.map(item => {
                if(item.id === action.payload.item.id){
                    if(item.quantity < maxItems){
                        return{...item, quantity: item.quantity + 1}
                    }else{
                        return item
                    }
                }else{
                    return item
                }
            })
        }else{
          const newItem : CartItem = {...action.payload.item, quantity : 1}
          updateCart = [...state.cart, newItem]
        }

        return{
            ...state,
            cart: updateCart
        }
    }

    if(action.type === 'remove-from-cart'){
        const updatedCart = state.cart.filter(item => item.id !== action.payload.id)
        return{
            ...state,
            cart: updatedCart
        }
    }

    if(action.type === 'decrease-quantity'){
        const cart = state.cart.map(item =>{
            if(item.id === action.payload.id && item.quantity > minItems){
              return{
                ...item,
                quantity: item.quantity - 1
              }
            }
            return item
          })
        return{
            ...state,
            cart
        }
    }

    if(action.type === 'increase-quantity'){
        const cart = state.cart.map(item =>{
            if(item.id === action.payload.id && item.quantity  < maxItems){
              return{
                ...item,
                quantity: item.quantity +1
              }
            }
            return item
          })
        return{
            ...state,
            cart
        }
    }

    if(action.type === 'clear-cart'){
        return{
            ...state,
            cart: []
        }
    }

    //siempre tener un return al state
    return state
}