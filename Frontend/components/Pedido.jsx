import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import Swal from 'sweetalert2';

const ACTUALIZAR_PEDIDO = gql`
    mutation actualizarPedido($id: ID!, $input: PedidoInput) {
        actualizarPedido(id: $id, input: $input) {
            estado
        }
    }
`;

const ELIMINAR_PEDIDO = gql`
    mutation eliminarPedido($id: ID!) {
        eliminarPedido(id: $id)
    }
`;

const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
        }
    }
`;


const Pedido = ({ pedido }) => {

    const { id, total, cliente, cliente: { nombre, apellido, email, telefono }, estado } = pedido;

    const [actualizarPedido] = useMutation(ACTUALIZAR_PEDIDO);
    const [eliminarPedido] = useMutation(ELIMINAR_PEDIDO, {
        update(cache) {
            const { obtenerPedidosVendedor } = cache.readQuery({
                query: OBTENER_PEDIDOS
            });

            cache.writeQuery({
                query: OBTENER_PEDIDOS,
                data: {
                    obtenerPedidosVendedor: obtenerPedidosVendedor.filter(pedido => pedido.id !== id)
                }
            });
        }
    });

    const [estadoPedido, setEstadoPedido] = useState(estado);
    const [clase, setClase] = useState('');

    useEffect(() => {

        if (estadoPedido) {
            setEstadoPedido(estadoPedido);
        };

        clasePedido();
    }, [estadoPedido]);

    const clasePedido = () => {

        if (estadoPedido === 'PENDIENTE') {
            setClase('border-yellow-500');
        } else if (estadoPedido === 'COMPLETADO') {
            setClase('border-green-500');
        } else {
            setClase('border-red-800');
        };
    };

    const cambiarEstadoPedido = async (nuevoEstado) => {
        try {

            const { data } = await actualizarPedido({
                variables: {
                    id,
                    input: {
                        estado: nuevoEstado,
                        cliente: cliente.id
                    }
                }
            });

            setEstadoPedido(data.actualizarPedido.estado);

        } catch (error) {
            console.log(error);
        };
    };

    const confirmarEliminarPedido = () => {
        Swal.fire({
            title: '¿Seguro que desea eliminar este pedido?',
            text: "Los datos del pedido serán removidos de la Base de Datos de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'

        }).then(async (result) => {

            if (result.isConfirmed) {
                try {
                    const { data } = await eliminarPedido({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado',
                        data.eliminarPedido,
                        'success'
                    );

                } catch (error) {
                    console.log(error);
                };
            };
        });
    };

    return (
        <div className={`${clase} border-t-4 mt-4 bg-white rounded p-6 md:grid md:grid-cols-2 md:gap-4 shadow-lg`}>
            <div>
                <p className="font-bold text-gray-800">Cliente: <span className="font-light">{nombre} {apellido}</span></p>

                {
                    email &&
                    (
                        <p className="flex items-center my-2">
                            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                            {email}
                        </p>
                    )
                }

                {
                    telefono &&
                    (
                        <p className="flex items-center my-2">
                            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                            {telefono}
                        </p>
                    )
                }

                <h2 className="font-bold text-gray-800 mt-8">Estado Pedido</h2>

                <select
                    className="mt-2 appearance-none bg-blue-600 border border-blue-600 text-center text-white p-2 rounded leading-tight hover:bg-blue-500 focus:outline-none focus:bg-blue-600 focus:border-blue-500 uppercase text-xs font-bold"
                    value={estadoPedido}
                    onChange={(e) => cambiarEstadoPedido(e.target.value)}
                >
                    <option value="COMPLETADO">COMPLETADO</option>
                    <option value="PENDIENTE">PENDIENTE</option>
                    <option value="CANCELADO">CANCELADO</option>
                </select>
            </div>

            <div>
                <h2 className="text-gray-800 font-bold">Resumen del Pedido:</h2>

                {
                    pedido.pedido.map(articulo => (
                        <div key={articulo.id} className="mt-2">
                            <p className="text-sm text-gray-800 font-bold">Producto: <span className="font-light">{articulo.nombre}</span></p>
                            <p className="text-sm text-gray-800 font-bold">Cantidad: <span className="font-light">{articulo.cantidad}</span></p>
                        </div>
                    ))
                }

                <p className="text-gray-800 mt-10 font-bold">
                    Total a pagar:
                    <span className="font-light"> ${total}</span>
                </p>

                <button
                    className="uppercase text-xs font-bold flex items-center mt-2 bg-red-800 hover:bg-red-700 px-5 py-2 inline-block text-white rounded leading-tight"
                    onClick={() => confirmarEliminarPedido()}
                >
                    Eliminar Pedido <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </div>
        </div>
    );
};

export default Pedido;