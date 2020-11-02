import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { gql, useQuery } from '@apollo/client';

const MEJORES_CLIENTES = gql`
    query mejoresClientes {
        mejoresClientes {
            cliente {
                nombre
                empresa
            }
            total
        }
    }
`;

const MejoresClientes = () => {

    const { data, loading, startPolling, stopPolling } = useQuery(MEJORES_CLIENTES);

    useEffect(() => {

        startPolling(1000);

        return () => {
            stopPolling();
        }

    }, [startPolling, stopPolling]);

    if (loading) return <h1>Cargando...</h1>

    const { mejoresClientes } = data;

    const clienteGrafica = [];

    mejoresClientes.map((cliente, index) => {
        clienteGrafica[index] = {
            ...cliente.cliente[0],
            total: cliente.total
        };
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Mejores Clientes</h1>

            <ResponsiveContainer
                width={'99%'}
                height={500}
            >
                <BarChart
                    className="mt-12"
                    width={800}
                    height={450}
                    data={clienteGrafica}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="nombre" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="total" fill="#3182ce" />
                </BarChart>
            </ResponsiveContainer>
        </Layout>
    );
};

export default MejoresClientes;