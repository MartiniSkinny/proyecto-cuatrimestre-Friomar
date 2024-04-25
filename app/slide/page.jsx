'use client'

import Slider from "../../components/Slider";
import { getProducts, searchProducts } from '../products/actions'
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { deleteProduct } from '../products/actions';

export default function SliderPage() {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    //funcion que retorna una tarjeta para el producto
    //por cada caja calcular la distancia con el left
    const productCard = (product) => (
        <div
            key={product.id}
            className="p-4 h-[420px] "
        >
            <p>{product.name}</p>
        </div>
    );

    useEffect(() => {
        const getData = async () => {
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
                alert("Producto eliminado correctamente");
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
        <div className="items-center py-14 px-4 w-full">
            <div className="mt-1 flex justify-center">

                <form
                    className="mb-16"
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
                    {/* Separador */}
                    <div className="absolute inset-x-0 top-50 mt-12 border-t-4 border-gray"></div>
                    <div
                        className='flex items-center justify-center text-lg font-medium mt-24 text-white-400'>
                        Todas las refacciones
                    </div>
                    <Link
                        href="../"
                        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                        >
                            <polyline points="15 18 9 12 15 6" />
                        </svg>{" "}
                        Salir
                    </Link>
                </form>

            </div>
            <Slider
                height={540}
                itemWidth={360} // Ajustado al ancho máximo de las tarjetas originales (max-w-sm)
                items={products?.map((product) => (

                    <div key={product.id}
                        className="mx-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                        style={{
                            height: '430px',
                            width: '250px'
                        }}>
                        <ul>
                            <li key={product.id}></li>
                        </ul>

                        <Link href={`products/gallery/${product.id}`}>
                            <div className="items-center">

                                {/* mostrar imagen */}
                                <div className="flex items-center justify-center">
                                    {product.image &&
                                        <img className="w-[220px] h-[200px] rounded-t-lg"
                                            src={product.image} alt={product.name} />}
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
                                    className="px-3 py-2 mb-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    href={`/products/edit/${product.id}`}>
                                    Editar
                                </Link>

                                <button
                                    className="px-3 py-2 ml-4 mb-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-blue-800"
                                    onClick={(event) => handleClick(event, product)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            />
        </div>
    );
}