
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useReducer, useEffect } from "react"
import { cartReducer, initialState } from "./reducers/card-reducer"

function App() {

  //hacemos la importación del useReducer como arreglo
  const [state, dispatch] =useReducer(cartReducer, initialState)

  //método para mantener los datos LocalStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))//pasamos a string el carrito para guardarlo, ya que este no acepta sino strings
  }, [state.cart])//cada que cart cambia ejecta

  return (
    <>
    <Header
    cart={state.cart}
    dispatch={dispatch}
    />{/*Este de aca es un componente*/}


    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        <div className="row mt-5">

        {/*Este es código js para que nos de todas las guitarras props*/}  
        {state.data.map((guitar) => (
             <Guitar
             key={guitar.id}
             guitar={guitar}
             dispatch={dispatch}
             />
          ))}
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
