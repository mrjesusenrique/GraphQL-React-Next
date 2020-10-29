import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

const pedidos = () => {

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/nuevo-pedido">
                <a className="bg-green-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-green-700 mb-3 uppercase">Nuevo Pedido</a>
            </Link>
        </Layout>
    );
};

export default pedidos;