import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_CLIENTE = gql`
    query obtenerCliente($id: ID!) {
        obtenerCliente(id: $id) {
            nombre
            apellido
            email
            telefono
            empresa
        }
    }
`;

const ACTUALIZAR_CLIENTE = gql`
    mutation actualizarCliente($id: ID!, $input: ClienteInput) {
        actualizarCliente(id: $id, input: $input) {
            nombre
            apellido
            email
            telefono
            empresa
        }
    }
`;

const editarCliente = () => {

    // De esta menera ontenermos el ID del cliente que queremos editar 

    const router = useRouter();
    const { query: { id } } = router;
    console.log(id);

    // Query o consulta para obtener Clientes


    const { data, loading, error } = useQuery(OBTENER_CLIENTE, {
        variables: {
            id
        }
    });

    // Mutation para actualizar Clientes 

    const [actualizarCliente] = useMutation(ACTUALIZAR_CLIENTE);

    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El campo nombre es obligatorio'),
        apellido: Yup.string().required('El campo apellido es obligatorio'),
        empresa: Yup.string().required('El campo empresa es obligatorio'),
        email: Yup.string().required('El campo email es obligatorio'),
        telefono: Yup.number()
    });

    if (loading === true) {
        return (
            <p>Cargando...</p>
        );
    } else {
        var { obtenerCliente } = data;
    };

    // Modificar el cliente en la Base de Datos

    const actualizarInfoCliente = async (valores) => {
        const { nombre, apellido, empresa, email, telefono } = valores;

        try {
            const { data } = await actualizarCliente({
                variables: {
                    id,
                    input: {
                        nombre,
                        apellido,
                        empresa,
                        email,
                        telefono
                    }
                }
            });

            Swal.fire(
                'Actualizado',
                'El cliente se actualizó correctamente',
                'success'
            );

            router.push('/');

        } catch (error) {
            console.log(error);
        };
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={schemaValidacion}
                        enableReinitialize
                        initialValues={obtenerCliente}
                        onSubmit={(valores) => {
                            actualizarInfoCliente(valores);
                        }}
                    >

                        {props => {

                            return (

                                <form
                                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                    onSubmit={props.handleSubmit}
                                >
                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="nombre">Nombre</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombre" placeholder="Nombre Cliente" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.nombre} />
                                    </div>

                                    {props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="apellido">Apellido</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="apellido" placeholder="Apellido Cliente" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.apellido} />
                                    </div>

                                    {props.touched.apellido && props.errors.apellido ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.apellido}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="empresa">Empresa</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="empresa" placeholder="Empresa Cliente" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.empresa} />
                                    </div>

                                    {props.touched.empresa && props.errors.empresa ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.empresa}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="email">Email</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Email Cliente" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.email} />
                                    </div>

                                    {props.touched.email && props.errors.email ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.email}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="telefono">Teléfono</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="tel" id="telefono" placeholder="Teléfono Cliente" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.telefono} />
                                    </div>

                                    {props.touched.telefono && props.errors.telefono ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.telefono}</p>
                                        </div>
                                    ) : null
                                    }

                                    <input type="submit" className="bg-green-700 w-full mt-5 p-2 text-white uppercase text-light hover:bg-green-800" value="Editar Cliente" />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default editarCliente;