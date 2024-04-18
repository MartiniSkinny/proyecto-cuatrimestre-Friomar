
'use client'

import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';

const EditProduct = ({ params }) => {
    const id = params.id
    const [product, setProduct] = useState(null);
    
    //Estado para mostrar el cargando
    const [loading, setLoading] = useState(true);


    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
    });
    const [errors, setErrors] = useState({});

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

    const handleSubmit = async (form) => {
        form.preventDefault();
        try {
            const validation = validateProduct(updatedProduct);
            if (!validation.success) {
                setErrors(validation.errors);
                return;
            }
            await updateProduct(updatedProduct);
            alert("Producto editado correctamente");
            window.location.href = "/products";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const validateProduct = (updatedProduct) => {
        const errorsList = {};

        if (!updatedProduct.name) {
            errorsList.name = "El nombre es obligatorio";
        }
    
        if (!updatedProduct.description) {
            errorsList.description = "La descripción es obligatoria";
        }
    
        if (!updatedProduct.price) {
            errorsList.price = "El precio es obligatorio";
        } else if (!/^[0-9]+([\\.,][0-9]+)?$/.test(updatedProduct.price)) {
            errorsList.price = "El precio debe ser un número";
        }
    
        if (!updatedProduct.category) {
            errorsList.category = "La categoría es obligatoria";
        }

        return {
            success: Object.keys(errorsList).length === 0,
            errors: errorsList,
        };
    };

    // if (loading) {
    //     return <div className="flex items-center justify-center h-screen text-xl">
    //             Cargando...
    //         </div>
    // }

    return (
        <div
            className='max-w-md mx-auto bg-white p-6 mt-12 rounded-md shadow-md'>
            <div className="mt-4 justify-center">
                <div className='mt-5px'>
                    <h2 className='text-2xl text-center font-mono mb-4 text-black'>
                        Editar Producto con el ID: {id}
                    </h2>
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
                    {errors.name && <p className="text-red-500">{errors.name}</p>}


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
                    {errors.description && <p className="text-red-500">{errors.description}</p>}


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
                    {errors.price && <p className="text-red-500">{errors.price}</p>}


                    {/* Botones de Guardar y Volver */}
                    <div className="mt-6 flex justify-center">
                        <button
                            className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-950 focus:outline-none focus:ring focus:border-emerald-600">
                            Guardar
                        </button>
                    </div>

                    {/* Botón para volver a products */}
                    <div className="mt-4 flex justify-center">
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

export default EditProduct;