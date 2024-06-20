//custome hooks
import { useState, useEffect } from "react"
import {db} from '../data/db'
import { useMemo } from 'react';
import type  { CartItem, Guitar } from '../types/index'

export const useCart = () =>{

    const inicialCart = () : CartItem[] =>{
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
      }
    
      //State y useEffect definimos para usarlo y base de datos(Hooks)
      const [data] = useState(db)//valor inicial es el que se tiene en la base de datos
    
      const [cart, setCart] = useState(inicialCart)
      const maxItems = 10
      const minItems = 0
    
       //metodo para mantener los datos LocalStorage
      useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))//pasamos a string el carrito para guardarlo, ya que este no acepta sino strings
      }, [cart])//cada que cart cambia ejecua
      
      //Esta funcion es para agregar al carrito
      function addToCart(item : Guitar){
        //comprobar si el elemento ya existe en el carrito
        const itemExists = cart.findIndex(guitar => guitar.id === item.id)
        if(itemExists >=0){//si es mayor a 0 es porque ya esta en el carro
    
          if(cart[itemExists].quantity >= maxItems) return
          
          const updateCart = [...cart]
          updateCart[itemExists].quantity++
          setCart(updateCart)
        }else{
          //agregamos una nueva variable para pasarle los atributos de Guitar y mantenga el item
          const newItem : CartItem = {...item, quantity : 1}
          setCart([...cart, newItem])
        }
      }
    
      //Funcion para borrar elementos del carrito
      function removeFromCart(id: Guitar['id']){
        //Esta es la manera en como filtramos las guitarras por id para borrarlas
        setCart((prevCart) =>prevCart.filter(guitar => guitar.id !== id))
      }
    
      //cambiamos la cantidad de items al presionar el boton mas
      function increaseQuantity(id : Guitar['id']){
        const updateCart = cart.map(item =>{
          if(item.id === id && item.quantity  < maxItems){
            return{
              ...item,
              quantity: item.quantity +1
            }
          }
          return item
        })
        setCart(updateCart)
      }
    
      //decreciente de cantidad en el carrito
      function decreaseQuantity(id : Guitar['id']){
        const desDate = cart.map(item =>{
          if(item.id === id && item.quantity > minItems){
            return{
              ...item, //retornar la copia del elemento completa
              quantity: item.quantity - 1
            }
          }
          return item
        })
        setCart(desDate)
      }
    
      //metodo para limpiar el carrito
      function clearCart(){
        setCart([])//le seteamos un arreglo vacio
      }

          //state derivado
    const isEmpty = useMemo(() => cart.length === 0, [cart])//que cambie y no cargue constantemente hasta que el carrito cambie
    //esta es la manera en como vamos a dar el total a pagar
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0),[cart])

    return{//return como objeto para darlas disponibles
        data,
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity,
        clearCart,
        isEmpty,
        cartTotal,
    }
}

