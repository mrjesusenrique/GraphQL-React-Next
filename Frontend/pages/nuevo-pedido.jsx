import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';

//Context de Pedidos

import PedidoContext from '../context/pedidos/PedidoContext';

const nuevoPedido = () => {

    // Utilizar Context (extraer funciones y valores)
    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? "opacity-50 cursor-not-allowed" : "";
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />
                    <Total />

                    <button
                        type="button"
                        className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900 ${validarPedido()}`}
                    >
                        Registrar pedido
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default nuevoPedido;