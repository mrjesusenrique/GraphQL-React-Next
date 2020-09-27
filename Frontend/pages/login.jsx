import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string().email('El email no es válido').required('El email es obligatorio'),
            password: Yup.string().required('El password es obligatorio')
        }),

        onSubmit: valores => {
            console.log(valores);
        }
    });

    return (
        <>
            <Layout>
                <h1 className="text-center text-2xl text-white font-light">Login</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                        <form className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4">
                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="email">Email</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" placeholder="Email Usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
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
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="password" id="password" placeholder="Password Usuario" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
                            </div>

                            {formik.touched.password && formik.errors.email ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.password}</p>
                                </div>
                            ) : null
                            }

                            <input type="submit" className="bg-gray-800 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900" value="Iniciar Sesión" />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Login;