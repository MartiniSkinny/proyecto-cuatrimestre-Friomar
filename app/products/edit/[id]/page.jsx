'use client'

import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';

const EditProductPage = ({ params }) => {
    const id = params.id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setProduct(product);
                setUpdatedProduct(product);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(updatedProduct);
            alert("Producto editado correctamente");
            window.location.href = "/products";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

     if (loading) {
         return <div className="flex items-center justify-center h-screen text-xl">
                 Cargando...
             </div>
     }

    return (
        <div
            className='max-w-md mx-auto bg-white p-6 mt-12 rounded-md shadow-md'>
            <div className="mt-4 justify-center">
                <div className='mt-5px'>
                    <h1
                        className='text-2xl text-center font-mono mb-4 text-black'>
                        Editar Producto con el ID: {id}
                    </h1>
                </div>
                <form onSubmit={handleSubmit} className='space-y-4'>

                {/* Campo Nombre */}
                    <div
                        className='mb-4'>
                        <label
                        className="block text-sm font-medium text-gray-600"> Nombre del Producto </label>
                        <input
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange} />
                    </div>

                    {/* Campo Descripción */}
                    <div
                        className='mb-4'>
                        <label
                        className="block text-sm font-medium text-gray-600"> Descripción </label>
                        <textarea
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                            type="text"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange} />
                    </div>

                    {/* Campo Precio */}
                    <div
                        className='mb-4'>
                        <label
                        className="block text-sm font-medium text-gray-600"> Precio </label>
                        <input
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                            type="text"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange} />
                    </div>


                    {/* campo imagen */}
{/*                     <div
                        className='mb-4'>
                        <label
                        className="block text-sm font-medium text-gray-600"> Imagen </label>
                        <input type="file"
                        id="fileInput"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange} />
                        {image && (
                            <div className="flex items-center justify-center">
                                <img className="object-center w-40 h-40" src={image} alt="Vista previa de la imagen" />
                            </div>
                            )}
                    </div> */}



                    {/* Botones de Guardar y Volver */}
                    <div className="mt-6 flex justify-center">
                    <button
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-950 focus:outline-none focus:ring focus:border-emerald-600">
                            Guardar
                        </button>
                    </div>

                    {/* Botón para volver a products */}
                    <div className="mt-6 flex justify-center">
                                    <button
                                        className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-green-950 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
                                    >
                                        <a href="/products">Volver</a>
                                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};



export default EditProductPage;