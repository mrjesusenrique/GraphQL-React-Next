import React from 'react';
import Layout from '../components/Layout';
import { useQuery, gql } from '@apollo/client';
import Producto from '../components/Producto';
import Link from 'next/link';

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

const productos = () => {

    // Consultar los productos 

    const { data, loading, error } = useQuery(OBTENER_PRODUCTOS);

    if (loading === true) {
        return (
            <h1>Cargando...</h1>
        );
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Productos</h1>

            <Link href="nuevo-producto">
                <a className="bg-green-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-green-700 mb-3 uppercase">Nuevo Producto</a>
            </Link>

            <table className="table-auto shadow-md mt-10 w-full w-lg">
                <thead className="bg-indigo-800">
                    <tr className="text-white">
                        <th className="w-1/6 py-2">Nombre</th>
                        <th className="w-1/6 py-2">Existencia</th>
                        <th className="w-1/6 py-2">Precio</th>
                        <th className="w-1/6 py-2">Eliminar</th>
                        <th className="w-1/6 py-2">Editar</th>
                    </tr>
                </thead>

                <tbody className="bg-white text-center">
                    {data.obtenerProductos.map(producto => (
                        <Producto key={producto.id} producto={producto} />
                    ))}
                </tbody>
            </table>
        </Layout>
    );
};

export default productos;