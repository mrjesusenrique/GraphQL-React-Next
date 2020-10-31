import React, { useState, useEffect } from 'react';

const Pedido = ({ pedido }) => {

    const { id, total, cliente, estado } = pedido;

    console.log(pedido.pedido);

    const [estadoPedido, setEstadoPedido] = useState(estado);

    useEffect(() => {
        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        };
    }, [estadoPedido]);

    return (
        <div className="mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg">
            <div>
                <p className="font-bold text-gray-800">Cliente: {cliente}</p>
                <h2 className="font-bold text-gray-800 mt-10">Estado Pedido</h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-center text-white p-2 rounded leading-tight hover:bg-blue-500 focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={estadoPedido}
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold mt-2">Resumen del Pedido:</h2>

                {
                    pedido.pedido.map(articulo => (
                        <div key={articulo.id} className="mt-2">
                            <p className="text-sm text-gray-800 font-bold">Producto: <span className="font-light">{articulo.nombre}</span></p>
                            <p className="text-sm text-gray-800 font-bold">Cantidad: <span className="font-light">{articulo.cantidad}</span></p>
                        </div>
                    ))
                }

                <p className="text-gray-800 mt-3 font-bold">
                    Total a pagar:
                    <span className="font-light"> ${total}</span>
                </p>

                <button
                    className="uppercase text-xs font-bold flex items-center mt-4 bg-red-800 hover:bg-red-700 px-5 py-2 inline-block text-white rounded leading-tight"
                >
                    Eliminar Pedido <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Pedido;