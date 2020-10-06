import React from 'react';
import Layout from '../../components/Layout';
import { useRouter } from 'next/router';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';

const OBTENER_PRODUCTO = gql`
    query obtenerProducto($id: ID!) {
        obtenerProducto(id: $id) {
            nombre
            existencia
            precio
        }
    }
`;

const ACTUALIZAR_PRODUCTO = gql`
    mutation actualizarProducto($id: ID!, $input: ProductoInput) {
        actualizarProducto(id: $id, input: $input) {
            id
            nombre
            existencia
            precio
        }
    }
`;

const editarProducto = () => {

    // De esta manera obtenemos el ID del producto

    const router = useRouter();
    const { query: { id } } = router;

    // Consulta para obtener el producto

    const { data, loading, error } = useQuery(OBTENER_PRODUCTO, {
        variables: {
            id
        }
    });

    // Mutation para modificar producto

    const [actualizarProducto] = useMutation(ACTUALIZAR_PRODUCTO);

    // Schema de Validación 

    const schemaValidacion = Yup.object({
        nombre: Yup.string().required('El nombre del producto es obligatorio'),
        existencia: Yup.number().required('La cantidad es obligatoria').positive('El número ingresado debe ser mayor o igual a cero').integer('La cantidad debe ser un número entero'),
        precio: Yup.number().required('El precio es obligatorio').positive('El número ingresado debe ser mayor o igual a cero')
    });

    if (loading === true) {
        return (
            <h1>Cargando...</h1>
        );
    } else if (!data) {
        return (
            <h1>Acción no permitida</h1>
        );
    };

    const actualizarInfoProducto = async valores => {

        const { nombre, existencia, precio } = valores;

        try {
            // Actualizar el registro 

            const { data } = await actualizarProducto({
                variables: {
                    id,
                    input: {
                        nombre,
                        existencia,
                        precio
                    }
                }
            });

            // Redirigir
            router.push('/productos');

            // Alerta
            Swal.fire(
                'Correcto',
                'El producto se actualizó correctamente',
                'success'
            );

        } catch (error) {
            console.log(error);
        }
    };

    const { obtenerProducto } = data;

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar producto</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        enableReinitialize
                        initialValues={obtenerProducto}
                        validationSchema={schemaValidacion}
                        onSubmit={valores => {
                            actualizarInfoProducto(valores);
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
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="text" id="nombre" placeholder="Nombre Producto" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.nombre} />
                                    </div>

                                    {props.touched.nombre && props.errors.nombre ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.nombre}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="existencia">Existencia</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="existencia" placeholder="Existencia Producto" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.existencia} />
                                    </div>

                                    {props.touched.existencia && props.errors.existencia ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.existencia}</p>
                                        </div>
                                    ) : null
                                    }

                                    <div className="mb-5">
                                        <label className="block text-gray-700 text-sm font-bold mb-3" htmlFor="precio">Precio</label>
                                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-greay-700 leading-tight focus:outline-none focus:shadow-outline" type="number" id="precio" placeholder="Precio Producto" onChange={props.handleChange} onBlur={props.handleBlur} value={props.values.precio} />
                                    </div>

                                    {props.touched.precio && props.errors.precio ? (
                                        <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                            <p className="font-bold">Error</p>
                                            <p>{props.errors.precio}</p>
                                        </div>
                                    ) : null
                                    }

                                    <input type="submit" className="bg-green-700 w-full mt-5 p-2 text-white uppercase text-light hover:bg-green-800" value="Editar Producto" />
                                </form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
};

export default editarProducto;