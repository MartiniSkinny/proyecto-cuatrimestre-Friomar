
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from './actions.js'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { deleteProduct } from './actions.js';

export default function Page() {
    const router = useRouter()
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);
    const supabase = createClient();


    useEffect(() => {
        const getData = async () => {

            // para redireccionar al login
/*             const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                router.push("/login");
            } */

            const productsResult = await getProducts();
            setProducts(productsResult.products);
            setLoading(false);
            if (productsResult.error) {
                alert(productsResult.error.massage);
            }
        }
        getData()
    }, []);

    function handleSearch(e) {
        e.preventDefault();
        console.log("buscar: ", search);

        const getData = async () => {
            const productsResult = await searchProducts(search);
            setProducts(productsResult.products)
            if (productsResult.error) {
                alert(productsResult.error.message);
            }
        }
        getData()
    }

    //eliminar producto
    const handleClick = async (event, product) => {
        event.preventDefault(); // Prevenir el comportamiento por defecto del botón
        try {
            const response = await deleteProduct(product);
            if (response.success) {
                // Si la eliminación fue exitosa, actualizar el estado de los productos
                setProducts(prevProducts => prevProducts.filter(p => p.id !== product.id));
                // Puedes mostrar un mensaje de éxito si lo deseas
                console.log(response.message);
            } else {
                // Si la eliminación no fue exitosa, muestra el mensaje de error
                console.error(response.message);
            }
        } catch (error) {
            console.error('Error eliminando el producto:', error);
            // Manejar el error, como mostrar un mensaje de error al usuario
        }
    };


    //mensaje cargando
    if (loading) {
        return <div className="flex items-center justify-center h-screen text-xl">
            Cargando...
        </div>
    }


    return (
        <div className="mt-7">

            <div className="mt-4 flex justify-center">

                <form
                    className="mb-8"
                    onChange={handleSearch}>
                    <div
                        className='flex items-center justify-center text-2xl font-bold mb-6 text-sky-400'>
                        Administrador de refacciones Taller FRIOMAR
                    </div>

                    <div
                        className="mt-8 flex">

                        <input
                            type="text"
                            placeholder="Buscar..."
                            className="w-96 bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <button
                            className="ml-2  text-white px-4 py-2 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none  hover:bg-green-600 dark:bg-green-700  dark:focus:ring-green-300"
                        >
                            <a href="/products/add">Agregar Producto</a>
                        </button>
                    </div>
                </form>

            </div>

            <div className="mt-4 m-8 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">

                {products?.map((product) => (
                    <div
                        key={product.id}
                        className="justify-center mx-24 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <ul>
                            <li key={product.id}>
                            </li>
                        </ul>
                        <Link href={`products/gallery/${product.id}`}>
                            <div className="items-center">

                                {/* mostrar imagen */}
                                <div className="flex items-center justify-center">
                                    {product.image && <img className="w-[220px] h-[200px]" src={product.image} />}
                                </div>

                                {/* mostrar nombre */}
                                <div className="px-5 pb-5 text-center">
                                    <p className="mb-3 mt-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {product.name}
                                    </p>

                                    {/* mostrar descripcion */}
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                        {product.description}
                                    </p>

                                    {/* mostrar precio */}
                                    <p className="text-xl font-bold text-red-500">
                                        ${product.price}
                                    </p>
                                </div>
                            </div>
                        </Link>

                        <div className='flex justify-center'>
                            <div className="inline-flex items-center">
                                <Link
                                    className=" px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    href={`/products/edit/${product.id}`}>
                                    Editar
                                </Link>
                                <button
                                    className=" px-3 py-2 ml-4 mb-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                                    onClick={(event) => handleClick(event, product)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                )

                )}
            </div>
        </div>
    )

}