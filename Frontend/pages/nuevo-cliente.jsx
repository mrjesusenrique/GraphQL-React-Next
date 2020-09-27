import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const nuevoCliente = () => {

    const formik = useFormik({
        initialValues: {
            nombre: '',
            apellido: '',
            empresa: '',
            email: '',
            telefono: ''
        },

        validationSchema: Yup.object({
            nombre: Yup.string().required('El campo nombre es obligatorio'),
            apellido: Yup.string().required('El campo apellido es obligatorio'),
            empresa: Yup.string().required('El campo empresa es obligatorio'),
            email: Yup.string().required('El campo email es obligatorio'),
            telefono: Yup.number()
        }),

        onSubmit: valores => {
            console.log(valores);
        }
    });

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nuevo Cliente</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="nombre">Nombre</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombre" placeholder="Nombre Cliente" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
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
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="apellido" placeholder="Apellido Cliente" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.apellido} />
                        </div>

                        {formik.touched.apellido && formik.errors.apellido ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.apellido}</p>
                            </div>
                        ) : null
                        }

                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="empresa">Empresa</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="empresa" placeholder="Empresa Cliente" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.empresa} />
                        </div>

                        {formik.touched.empresa && formik.errors.empresa ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.empresa}</p>
                            </div>
                        ) : null
                        }

                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="email">Email</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Email Cliente" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                        </div>

                        {formik.touched.email && formik.errors.email ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.email}</p>
                            </div>
                        ) : null
                        }

                        <div className="mb-5">
                            <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="telefono">Teléfono</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="tel" id="telefono" placeholder="Teléfono Cliente" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.telefono} />
                        </div>

                        {formik.touched.telefono && formik.errors.telefono ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.telefono}</p>
                            </div>
                        ) : null
                        }

                        <input type="submit" className="bg-green-700 w-full mt-5 p-2 text-white uppercase text-light hover:bg-green-800" value="Registrar Cliente" />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default nuevoCliente;