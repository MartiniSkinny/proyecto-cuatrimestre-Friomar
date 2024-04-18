'use client'

import Slider from "../../components/Slider";
import { getProducts, searchProducts } from '../products/actions'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SliderPage() {
    const [products, setProducts] = useState(null);
    const [search, setSearch] = useState('');


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
            // setLoading(false);
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

    
    return (
        <div className="items-center py-14 px-4 w-full">
            <div className="mt-1 flex justify-center">

                <form
                    className="mb-14"
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
            <Slider
                height={700}
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