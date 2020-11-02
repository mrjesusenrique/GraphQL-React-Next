import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_USUARIO = gql`
    query obtenerUsuario{
        obtenerUsuario {
            id
            nombre
            apellido
        }
    }
`;

const Header = () => {

    const router = useRouter();

    // Query de apollo
    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    console.log(data);
    console.log(loading);
    console.log(error);

    // Proteger que no accedamos a data antes de tener resultados

    if (loading) return null;

    // Si no hay informacion

    if (!data) {
        return router.push('/login');
    };

    const { nombre, apellido } = data.obtenerUsuario;

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <div className="sm:flex sm:justify-between mb-6">

            {router.pathname === "/" &&
                <p className="mr-2 mb-5 lg:mb-0 bg-indigo-800 text-white p-3 text-center">Hola {nombre} {apellido}, estos son tus clientes</p>
            }

            {router.pathname === "/pedidos" &&
                <p className="mr-2 mb-5 lg:mb-0 bg-indigo-800 text-white p-3 text-center">Hola {nombre} {apellido}, estos son tus pedidos</p>
            }

            {router.pathname === "/productos" &&
                <p className="mr-2 mb-5 lg:mb-0 bg-indigo-800 text-white p-3 text-center">Hola {nombre} {apellido}, estos son tus productos</p>
            }

            {router.pathname === "/mejores-vendedores" &&
                <p className="mr-2 mb-5 lg:mb-0 bg-indigo-800 text-white p-3 text-center">Hola {nombre} {apellido}, estos son los mejores vendedores</p>
            }

            {router.pathname === "/mejores-clientes" &&
                <p className="mr-2 mb-5 lg:mb-0 bg-indigo-800 text-white p-3 text-center">Hola {nombre} {apellido}, estos son los mejores clientes</p>
            }

            {router.pathname === "/nuevo-cliente" || router.pathname === "/nuevo-producto" || router.pathname === "/nuevo-pedido" ? (
                <button
                    onClick={() => cerrarSesion()}
                    type="button"
                    className="bg-red-800 w-full sm:w-auto sm:h-auto uppercase rounded py-3 px-3 text-white shadow-md hover:bg-red-700"
                >
                    Cerrar Sesión
                </button>
            ) : (
                    <button
                        onClick={() => cerrarSesion()}
                        type="button"
                        className="bg-red-800 w-full sm:w-auto sm:h-auto uppercase rounded py-1 px-2 text-white shadow-md hover:bg-red-700"
                    >
                        Cerrar Sesión
                    </button>
                )
            }

        </div>
    );
};

export default Header;