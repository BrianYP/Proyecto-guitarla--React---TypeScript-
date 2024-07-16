import PropTypes from 'prop-types';
import type { CartItem } from '../types';
import type { CartActions } from '../reducers/card-reducer';
import { Dispatch } from 'react';
import { useMemo } from 'react';

//pasamos los props para que quede todo perfectamente tapado
type headerProps ={
    cart : CartItem [],
    dispatch: Dispatch<CartActions>,
}

export default function Header({ cart, dispatch } : headerProps) {

    const isEmpty = useMemo(() => cart.length === 0, [cart])//que cambie y no cargue constantemente hasta que el carrito cambie
    //esta es la manera en como vamos a dar el total a pagar
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0),[cart])


    return (
        <header className="py-5 header">
            <div className="container-xl">
                <div className="row justify-content-center justify-content-md-between">
                    <div className="col-8 col-md-3">
                        <a href="index.html">
                            <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
                        </a>
                    </div>
                    <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                        <div className="carrito">
                            <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                            <div id="carrito" className="bg-white p-3">

                                {/*Evaluamos si el carrito esta o no vació*/}
                                {isEmpty ? (
                                    <p className="text-center">El carrito está vacío</p>
                                ) : (
                                <>
                                <table className="w-100 table">
                                    <thead>
                                        <tr>
                                            <th>Imagen</th>
                                            <th>Nombre</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cart.map((guitar) => (
                                            <tr key={guitar.id}>
                                                <td>
                                                    <img className="img-fluid" src={`/img/${guitar.image}.jpg`} alt="imagen guitarra" />
                                                </td>
                                                <td>{guitar.name}</td>
                                                <td className="fw-bold">
                                                    ${guitar.price}
                                                </td>
                                                <td className="flex align-items-start gap-4">
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={()=> dispatch({type: 'decrease-quantity', payload: { id: guitar.id}})}
                                                    >
                                                        -
                                                    </button>
                                                    {guitar.quantity}
                                                    <button
                                                        type="button"
                                                        className="btn btn-dark"
                                                        onClick={() => dispatch({ type: 'increase-quantity', payload: { id: guitar.id}})}
                                                    >
                                                        +
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger"
                                                        type="button"
                                                        onClick={ () => dispatch({ type: 'remove-from-cart', payload: {id: guitar.id}})}
                                                    >
                                                        X
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <p className="text-end">Total pagar: <span className="fw-bold">${cartTotal}</span></p>
                                </>
                                )}
                                
                                <button className="btn btn-dark w-100 mt-3 p-2" onClick={() => dispatch({type: 'clear-cart'})}>Vaciar Carrito</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

Header.propTypes = {
    cart: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired,
};
