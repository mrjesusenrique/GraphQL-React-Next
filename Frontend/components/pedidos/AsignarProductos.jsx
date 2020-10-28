import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import PedidoContext from '../../context/pedidos/PedidoContext';

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

const AsignarProducto = () => {

    const [productos, setProductos] = useState([]);

    // Context de Pedidos

    const pedidoContext = useContext(PedidoContext);
    const { agregarProducto } = pedidoContext;

    // Consulta a la Base de Datos 

    const { data, loading } = useQuery(OBTENER_PRODUCTOS);

    useEffect(() => {
        agregarProducto(productos);
    }, [productos]);

    const seleccionarProducto = (productos) => {
        setProductos(productos)
    };

    if (loading) return null;

    const { obtenerProductos } = data;

    return (
        <>
            <h1 className='mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm'>2.- Asigna uno o más productos al pedido</h1>

            <Select
                className='mt-3'
                options={obtenerProductos}
                onChange={(productoSeleccionado) => seleccionarProducto(productoSeleccionado)}
                isMulti={true}
                getOptionValue={(opciones) => opciones.id}
                getOptionLabel={(opciones) => `${opciones.nombre} - ${opciones.existencia} disponibles`}
                placeholder="Busque o seleccione producto"
                noOptionsMessage={() => 'No hay resultados'}
            />
        </>
    );
};

export default AsignarProducto;