import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';

const NUEVA_CUENTA = gql`
    mutation nuevoUsuario($input: UsuarioInput){
        nuevoUsuario(input: $input){
        id
        nombre
        apellido
        email
        }
    }
`;

const NuevaCuenta = () => {

    const [state, setState] = useState(null);

    const [nuevoUsuario] = useMutation(NUEVA_CUENTA);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre es obligatiorio'),
            apellido: Yup.string().required('El apellido es obligatorio'),
            email: Yup.string().required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio')
        }),

        onSubmit: async valores => {

            const { nombre, apellido, email, password } = valores;

            try {
                const { data } = await nuevoUsuario({
                    variables: {
                        input: {
                            nombre,
                            apellido,
                            email,
                            password
                        }
                    }
                });

                console.log(data);

                setState(`Se creó correctamente el usuario: ${data.nuevoUsuario.nombre}`);

                setTimeout(() => {
                    setState(null);
                    router.push('/login');
                }, 4000);

            } catch (error) {
                setState(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    setState(null);
                }, 4000);
            };
        }
    });

    const mostrarMensaje = () => {
        return (
            <div className="bg-white border-b-4 border-blue-500 py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{state}</p>
            </div>
        );
    };

    return (
        <>
            <Layout>

                {state && mostrarMensaje()}

                <h1 className="text-center text-2xl text-white font-light">Crear Nueva Cuenta</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4" onSubmit={formik.handleSubmit}>
                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="nombre">Nombre</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombre" placeholder="Nombre Usuario" value={formik.values.nombre} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="apellido">Apellido</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="apellido" placeholder="Apellido Usuario" value={formik.values.apellido} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            {formik.touched.apellido && formik.errors.apellido ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.apellido}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Email Usuario" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            {formik.touched.email && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.email}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="password">Password</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="Password Usuario" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null
                            }

                            <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value="Crear Nueva Cuenta" />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default NuevaCuenta;