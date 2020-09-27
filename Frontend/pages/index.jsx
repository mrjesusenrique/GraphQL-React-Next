import Layout from '../components/Layout';
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router';
import Link from 'next/link';

const OBTENER_CLIENTES_USUARIO = gql`
    query obtenerClientesVendedor {
        obtenerClientesVendedor {
            id
            nombre
            apellido
            empresa
            email
            telefono
        }
    }
`;

const Index = () => {

  const router = useRouter();

  // Consulta de Apollo

  const { data, loading, error } = useQuery(OBTENER_CLIENTES_USUARIO);

  console.log(data);
  console.log(loading);
  console.log(error);

  if (loading) return 'Cargando...';

  if (!data.obtenerClientesVendedor) {
    return router.push('/login');
  };

  return (
    <div>
      <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Clientes</h1>

        <Link href="nuevo-cliente">
          <a className="bg-green-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-green-700 mb-3 uppercase">Nuevo Cliente</a>
        </Link>

        <table className="table-auto shadow-md mt-10 w-full w-lg">
          <thead className="bg-indigo-800">
            <tr className="text-white">
              <th className="w-1/5 py-2">Nombre</th>
              <th className="w-1/5 py-2">Empresa</th>
              <th className="w-1/5 py-2">Email</th>
              <th className="w-1/5 py-2">Teléfono</th>
            </tr>
          </thead>

          <tbody className="bg-white text-center">
            {data.obtenerClientesVendedor.map(cliente => (
              <tr key={cliente.id}>
                <td className="border px-4 py-2">{cliente.apellido} {cliente.nombre}</td>
                <td className="border px-4 py-2">{cliente.empresa}</td>
                <td className="border px-4 py-2">{cliente.email}</td>
                <td className="border px-4 py-2">{cliente.telefono}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </Layout>
    </div>
  );
};

export default Index;