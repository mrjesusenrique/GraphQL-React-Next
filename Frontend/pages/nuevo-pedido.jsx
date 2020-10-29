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
    const pedidoContext = useContext(PedidoContext)

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
                        className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900`}
                    >
                        Registrar pedido
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default nuevoPedido;