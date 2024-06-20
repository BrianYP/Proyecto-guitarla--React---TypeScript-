//Types que se usaran en mas de un componente
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
  }

//Aplicacion de herencias
export type CartItem = Guitar & {
  quantity: number
}

/*Otra manera de hacerlo pero con interface
 * export interface CartItem extends Guitar {
 * quantity: number
 * }
*/

/*Uso de Utility Types - Pick: agregar atributos
export type CartItem1 = Pick<Guitar, 'id' | 'name' | 'price'> & {
  quantity: number
}*/

/*Omit - quitar atributos:
export type CartItem1 = Omit<Guitar, 'id' | 'name' | 'price'> & {
  quantity: number
}*/

/*Uso del LookUp por si se cambia un dato este cambie en todas partes
export type guitarId = Guitar['id']*/