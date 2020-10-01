import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';

const ELIMINAR_PRODUCTO = gql`
    mutation eliminarProducto($id: ID!) {
        eliminarProducto(id: $id)
    }
`;

const OBTENER_PRODUCTOS = gql`
    query obtenerProductos {
        obtenerProductos {
            id
            nombre
            precio
            existencia
        }
    }
`;

const Producto = ({ producto }) => {

    const { id, nombre, existencia, precio } = producto;

    // Mutation para eliminar producto

    const [eliminarProducto] = useMutation(ELIMINAR_PRODUCTO, {
        update(cache) {
            const { obtenerProductos } = cache.readQuery({
                query: OBTENER_PRODUCTOS
            });

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: obtenerProductos.filter(productoActual => productoActual.id !== id)
                }
            });
        }
    });

    const confirmarEliminarProducto = () => {
        Swal.fire({
            title: '¿Seguro que desea eliminar este producto?',
            text: "Los datos del producto serán removidos de la Base de Datos de forma permanente",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    // Eliminar producto de la Base de Datos 

                    const { data } = await eliminarProducto({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Eliminado',
                        data.eliminarProducto,
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
            <td className="border px-4 py-2">{nombre}</td>
            <td className="border px-4 py-2">{existencia} U</td>
            <td className="border px-4 py-2">${precio}</td>
            <td className="border px-4 py-2">
                <button onClick={() => confirmarEliminarProducto()} type="button" className="flex justify-center items-center hover:bg-red-700 bg-red-800 text-white py-2 px-4 w-full rounded uppercase text-xs text-light">
                    Eliminar <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                </button>
            </td>
            <td className="border px-4 py-2">
                <button type="button" className="flex justify-center items-center hover:bg-green-700 bg-green-600 text-white py-2 px-4 w-full rounded uppercase text-xs text-light">
                    Editar <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                </button>
            </td>
        </tr>
    );
};

export default Producto;