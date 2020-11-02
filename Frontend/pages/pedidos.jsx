import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Pedido from '../components/Pedido';

const OBTENER_PEDIDOS = gql`
    query obtenerPedidosVendedor {
        obtenerPedidosVendedor {
            id
            pedido {
                id
                cantidad
                nombre
            }
            cliente {
                id
                nombre
                apellido
                email
                telefono
            }
            vendedor
            total
            estado
        }
    }
`;

const pedidos = () => {

    const { data, loading } = useQuery(OBTENER_PEDIDOS);

    if (loading) return <h1>Cargando...</h1>;

    const { obtenerPedidosVendedor } = data;

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/nuevo-pedido">
                <a className="bg-green-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-green-700 mb-3 uppercase w-full lg:w-auto text-center">Nuevo Pedido</a>
            </Link>

            {
                obtenerPedidosVendedor.length === 0 ?
                    (
                        <p className="mt-5 text-center text-2xl">Aún no hay pedidos registrados en la Base de Datos</p>
                    ) : (
                        obtenerPedidosVendedor.map(pedido => (
                            <Pedido
                                key={pedido.id}
                                pedido={pedido}
                            />
                        ))
                    )
            }
        </Layout>
    );
};

export default pedidos;