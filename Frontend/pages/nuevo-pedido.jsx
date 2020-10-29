import React, { useContext, useState } from 'react';
import Layout from '../components/Layout';
import AsignarCliente from '../components/pedidos/AsignarCliente';
import AsignarProducto from '../components/pedidos/AsignarProductos';
import ResumenPedido from '../components/pedidos/ResumenPedido';
import Total from '../components/pedidos/Total';
import PedidoContext from '../context/pedidos/PedidoContext';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

const NUEVO_PEDIDO = gql`
    mutation nuevoPedido($input: PedidoInput){
        nuevoPedido(input: $input) {
            id
        }
    }
`;

const nuevoPedido = () => {

    const router = useRouter();

    const [mensaje, setMensaje] = useState(null);

    // Utilizar Context (extraer funciones y valores)

    const pedidoContext = useContext(PedidoContext);
    const { cliente, productos, total } = pedidoContext;

    // Mutation para crear un nuevo pedido 

    const [nuevoPedido] = useMutation(NUEVO_PEDIDO);

    const validarPedido = () => {
        return !productos.every(producto => producto.cantidad > 0) || total === 0 || cliente.length === 0 ? "opacity-50 cursor-not-allowed" : "";
    };

    const crearNuevoPedido = async () => {

        const { id } = cliente;

        // Remover los datos no deseados de 'productos'

        const pedido = productos.map(({ __typename, existencia, ...producto }) => producto);

        try {

            const { data } = await nuevoPedido({
                variables: {
                    input: {
                        cliente: id,
                        pedido,
                        total
                    }
                }
            });

            router.push('/pedidos');

            Swal.fire(
                'Correcto',
                'El pedido se registró correctamente en la Base de Datos',
                'success'
            );

        } catch (error) {
            setMensaje(error.message.replace('Error', ''));

            setTimeout(() => {
                setMensaje(null);
            }, 5000);
        };
    };

    const mostrarMensaje = () => {
        return (
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto border-b-4 border-red-500">
                <p>{mensaje}</p>
            </div>
        );
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Pedido</h1>

            {mensaje && mostrarMensaje()}

            <div className="flex justify-center">
                <div className="w-full max-w-lg">
                    <AsignarCliente />
                    <AsignarProducto />
                    <ResumenPedido />
                    <Total />

                    <button
                        type="button"
                        className={`bg-green-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-green-900 ${validarPedido()}`}
                        onClick={() => crearNuevoPedido()}
                    >
                        Registrar pedido
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default nuevoPedido;