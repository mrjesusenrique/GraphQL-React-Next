import React, { useContext } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';

//Context de Pedidos

import PedidoContext from '../context/pedidos/PedidoContext';

const nuevoPedido = () => {

    // Utilizar Context (extraer funciones y valores)
    const pedidoContext = useContext(PedidoContext)

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />
                </div>
            </div>
        </Layout>
    );
};

export default nuevoPedido;