import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';

const NUEVO_PRODUCTO = gql`
    mutation nuevoProducto($input: ProductoInput) {
        nuevoProducto(input: $input) {
            id
            nombre
            existencia
            precio
        }
    }
`;

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

const nuevoProducto = () => {

    const router = useRouter();

    // Validación de formulario para Nuevo Producto 

    const [nuevoProducto] = useMutation(NUEVO_PRODUCTO, {
        update(cache, { data: { nuevoProducto } }) {

            // Obtener el objeto de cache

            const { obtenerProductos } = cache.readQuery({ query: OBTENER_PRODUCTOS });

            // Reescribir el objeto 

            cache.writeQuery({
                query: OBTENER_PRODUCTOS,
                data: {
                    obtenerProductos: [...obtenerProductos, nuevoProducto]
                }
            });
        }
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            existencia: '',
            precio: ''
        },

        validationSchema: Yup.object({
            nombre: Yup.string().required('El nombre del producto es obligatorio'),
            existencia: Yup.number().required('La cantidad es obligatoria').positive('El número ingresado debe ser mayor o igual a cero').integer('La cantidad debe ser un número entero'),
            precio: Yup.number().required('El precio es obligatorio').positive('El número ingresado debe ser mayor o igual a cero')
        }),

        onSubmit: async valores => {

            const { nombre, existencia, precio } = valores;

            try {

                const { data } = await nuevoProducto({
                    variables: {
                        input: {
                            nombre,
                            existencia,
                            precio
                        }
                    }
                });

                Swal.fire(
                    'Creado',
                    'El producto ha sido creado correctamente',
                    'success'
                );

                router.push('/productos');

            } catch (error) {
                console.log(error);
            };
        }
    })

    return (
        <>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Nuevo producto</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-lg">

                        <form
                            className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                            onSubmit={formik.handleSubmit}
                        >
                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="nombre">Nombre</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombre" placeholder="Nombre Producto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.nombre} />
                            </div>

                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.nombre}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="existencia">Existencia</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="existencia" placeholder="Existencia Producto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.existencia} />
                            </div>

                            {formik.touched.existencia && formik.errors.existencia ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.existencia}</p>
                                </div>
                            ) : null
                            }

                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="precio">Precio</label>
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="precio" placeholder="Precio Producto" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.precio} />
                            </div>

                            {formik.touched.precio && formik.errors.precio ? (
                                <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                    <p className="font-bold">Error</p>
                                    <p>{formik.errors.precio}</p>
                                </div>
                            ) : null
                            }

                            <input type="submit" className="bg-green-700 w-full mt-5 p-2 text-white uppercase text-light hover:bg-green-800" value="Registrar Producto" />
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default nuevoProducto;