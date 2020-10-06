import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';
import Select from 'react-select';

const options = [
    { id: "chocolate", nombre: "Chocolate" },
    { id: "fresa", nombre: "Fresa" },
    { id: "vainilla", nombre: "Vainilla" }
];

const pedidos = () => {

    const [state, setState] = useState([]);

    useEffect(() => {
        console.log(state);
    }, [state]);

    const seleccionarSabor = (state) => {
        setState(state);
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Pedidos</h1>

            <Link href="/nuevo-pedido">
                <a className="bg-green-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-green-700 mb-3 uppercase">Nuevo Pedido</a>
            </Link>

            <Select
                options={options}
                isMulti={true}
                onChange={opcion => seleccionarSabor(opcion)}
                getOptionValue={opciones => opciones.id}
                getOptionLabel={opciones => opciones.nombre}
                placeholder="Seleccione el sabor"
                noOptionsMessage={() => "No hay resultados"}
            />
        </Layout>
    );
};

export default pedidos;