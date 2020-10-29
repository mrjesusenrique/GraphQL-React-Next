import React, { useContext } from 'react';
import PedidoContext from '../../context/pedidos/PedidoContext';
import ProductoResumen from './ProductoResumen';

const ResumenPedido = () => {

    // Context de Pedidos

    const pedidoContext = useContext(PedidoContext);
    const { productos } = pedidoContext;

    return (
        <>
            <h1 className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm'>3.- Ajusta las cantidades del producto</h1>

            {productos.length > 0 ?
                (
                    <>
                        {
                            productos.map(producto => (
                                <ProductoResumen key={producto.id} producto={producto} />
                            ))
                        }
                    </>
                ) : (
                    <p className="mt-t text-sm text-center">Aún no ha seleccionado productos</p>
                )
            }
        </>
    );
};

export default ResumenPedido;