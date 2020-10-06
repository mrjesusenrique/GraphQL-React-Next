import React from 'react';
import Layout from '../Layout';

const AsignarCliente = () => {
    return (
        <>
            <Layout>
                <p className="mt-10 my-2 bg-white border-l-4 border-gray-800 text-gray-700 p-2 text-sm font-bold">1.- Asigna un Cliente al pedido</p>
                <Select
                    className="mt-3"
                    options={obtenerClientesVendedor}
                    onChange={opcion => seleccionarCliente(opcion)}
                    getOptionValue={opciones => opciones.id}
                    getOptionLabel={opciones => opciones.nombre}
                    placeholder="Busque o Seleccione el Cliente"
                    noOptionsMessage={() => "No hay resultados"}
                />
            </Layout>
        </>
    );
};

export default AsignarCliente;