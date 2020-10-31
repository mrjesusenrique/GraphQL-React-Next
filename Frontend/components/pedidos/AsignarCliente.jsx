import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

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

const AsignarCliente = () => {

    const [cliente, setCliente] = useState([]);

    // Context de Pedidos

    const pedidoContext = useContext(PedidoContext);
    const { agregarCliente } = pedidoContext;

    // Consultar la Base de Datos

    const { data, loading } = useQuery(OBTENER_CLIENTES_USUARIO);

    useEffect(() => {
        agregarCliente(cliente);
    }, [cliente]);

    const seleccionarCliente = (cliente) => {
        setCliente(cliente);
    };

    if (loading) return null;

    const { obtenerClientesVendedor } = data;

    return (
        <>
            <h1 className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm'>1.- Asigna un cliente al pedido</h1>

            <Select
                className='mt-3'
                options={obtenerClientesVendedor}
                onChange={(clienteSeleccionado) => seleccionarCliente(clienteSeleccionado)}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => `${opciones.nombre} ${opciones.apellido}`}
                placeholder="Busque o seleccione cliente"
                noOptionsMessage={() => 'No hay resultados'}
            />
        </>
    );
};

export default AsignarCliente;