import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_CLIENTE = gql`
    mutation eliminarCliente($id: ID!) {
        eliminarCliente(id: $id)
    }
`;

const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

const Cliente = ({ cliente }) => {

    const [eliminarCliente] = useMutation(ELIMINAR_CLIENTE, {
        update(cache) {

            // Hacer un copia del objeto de cache

            const { obtenerClientesVendedor } = cache.readQuery({ query: OBTENER_CLIENTES_USUARIO });

            // Reescribir el cache

            cache.writeQuery({
                query: OBTENER_CLIENTES_USUARIO,
                data: ({
                    obtenerClientesVendedor: obtenerClientesVendedor.filter(clienteActual => clienteActual.id !== id)
                })
            });
        }
    });

    const { id, nombre, apellido, empresa, email, telefono } = cliente;

    const confirmarEliminarCliente = id => {
        Swal.fire({
            title: '¿Seguro que desea eliminar este cliente?',
            text: "Los datos del cliente serán removidos de la Base de Datos de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    const { data } = await eliminarCliente({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado',
                        data.eliminarCliente,
                        'success'
                    );

                } catch (error) {
                    console.log(error);
                };
            };
        });
    };

    return (
        <tr>
            <td className="border px-4 py-2">{apellido} {nombre}</td>
            <td className="border px-4 py-2">{empresa}</td>
            <td className="border px-4 py-2">{email}</td>
            <td className="border px-4 py-2">{telefono}</td>
            <td className="border px-4 py-2">
                <button onClick={() => confirmarEliminarCliente(id)} type="button" className="flex justify-center items-center bg-red-800 text-white py-2 px-4 w-full rounded uppercase text-xs text-light">
                    Eliminar <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
        </tr>
    );
};

export default Cliente;