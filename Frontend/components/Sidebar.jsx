import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {

    const router = useRouter();

    function showAsaid() {
        const aside = document.getElementById('asideFull');
        aside.classList.toggle('hidden');
    };

    return (
        <>
            <button className="bg-indigo-800 w-screen sm:hidden xl:hidden text-white text-center p-2 hover:bg-indigo-700" id="btnMenu" onClick={showAsaid}>
                Menú
            </button>

            <aside className="bg-indigo-800 hidden w-screen sm:block w-1/3 xl:w-1/5 p-5" id="asideFull">

                <div>
                    <h1 className="text-white text-2xl font-light">CRM Clientes</h1>
                </div>

                <nav className="mt-6 list-none">
                    <li className={router.pathname === "/" ? "bg-blue-700 p-2" : "p-2"}>
                        <Link href="/">
                            <a className="text-white block">Clientes</a>
                        </Link>
                    </li>

                    <li className={router.pathname === "/pedidos" ? "bg-blue-700 p-2" : "p-2"}>
                        <Link href="/pedidos">
                            <a className="text-white block">Pedidos</a>
                        </Link>
                    </li>

                    <li className={router.pathname === "/productos" ? "bg-blue-700 p-2" : "p-2"}>
                        <Link href="/productos">
                            <a className="text-white block">Productos</a>
                        </Link>
                    </li>
                </nav>

                <div className="sm:mt-10">
                    <h1 className="text-white text-2xl font-light">Otras Opciones</h1>
                </div>

                <nav className="mt-6 list-none">

                    <li className={router.pathname === "/mejores-vendedores" ? "bg-blue-700 p-2" : "p-2"}>
                        <Link href="/mejores-vendedores">
                            <a className="text-white block">Mejores Vendedores</a>
                        </Link>
                    </li>

                    <li className={router.pathname === "/mejores-clientes" ? "bg-blue-700 p-2" : "p-2"}>
                        <Link href="/mejores-clientes">
                            <a className="text-white block">Mejores Clientes</a>
                        </Link>
                    </li>
                </nav>

            </aside>
        </>
    );
};

export default Sidebar;