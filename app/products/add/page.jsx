"use client"

import { useState, useEffect } from "react";
import { addProduct } from './actions';
import { Result } from "postcss";

export default function AddProduct() {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({});

    // para crear una URL para convertir la imagen a base64
    function handleImageChange(event) {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (event) {
            setImage(event.target.result);
          };
          reader.readAsDataURL(file);
        }
      }

    // funcion para msostrar el mensaje cargando
    useEffect(() => {
        // Simular carga inicial
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000); // Tiempo de carga simulado: 2 segundos

        // Limpiar el temporizador si el componente se desmonta antes de que finalice el tiempo de espera
        return () => clearTimeout(timer);
    }, []); // El segundo argumento del useEffect es un arreglo vacío, lo que significa que solo se ejecutará una vez al montar el componente


    // Validacion de los datos
    function onSave(form) {
        form.preventDefault();

        setLoading(true);

        let errorsList = {};

        if (!name) {
            errorsList.name = "El nombre es obligatorio";
        }

        if (!description) {
            errorsList.description = "La descripción es obligatoria";
        }

        if (!price) {
            errorsList.price = "El precio es obligatorio";
        }

        setErrors({ ...errorsList });

        if (Object.keys(errorsList).length > 0) {
            setLoading(false);
            return;
        }

        addProduct({
            name,
            description,
            price,
            image,
        })
            .then((result) => {
                console.log(result);

                if (!result.success) {
                    alert(result.message);
                    setErrors({ ...result.errors });
                } else {
                    alert(result.message);
                    setName('');
                    setDescription('');
                    setPrice('');
                    setImage('');
                }
            })
            .catch((error) => {
                alert(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    function convertirImagen() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const base64String = reader.result;
                console.log(base64String); // Aquí puedes hacer lo que quieras con la cadena base64
            };
            reader.onerror = function (error) {
                console.error('Error al leer el archivo:', error);
            };
        } else {
            console.error('No se seleccionó ningún archivo');
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Cargando...
            </div>
        );
    }

// Formulario
    return(
    <div className="max-w-md mx-auto bg-white p-6 mt-12 rounded-md shadow-md ">

    <h2 className="text-2xl text-center font-mono mb-4 text-black"> Agregar Producto </h2>

    <form method="POST" className="space-y-4" onSubmit={onSave}>


    {/* Campo Nombre */}
      <div>
        <label htmlFor="nombre"
        className="block text-sm font-medium text-gray-600"> Nombre del Producto </label>
        <input type="text" 
                id="nombre"
                name="nombre"
               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
               value={name} 
               onChange={(e) => {
                setName(e.target.value);
                setErrors({
                    ...errors,
                    name: undefined,
                });
               }}
               />
               <p className="text-red-600">{errors.name || ''}</p>
      </div>


    {/* Campo Descripción */}
      <div>
        <label htmlFor="descripcion"
                className="block text-sm font-medium text-gray-600"> Descripción </label>
        <textarea id="descripcion"
                name="descripcion"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
                  value={description} 
                  onChange={(e) => {
                   setDescription(e.target.value);
                   setErrors({
                    ...errors,
                    description: undefined,
                });
                  }}></textarea>
               <p className="text-red-600">{errors.description || ''}</p>
      </div>


    {/* Campo Precio */}
      <div>
        <label htmlFor="precio"
                className="block text-sm font-medium text-gray-600"> Precio </label>
        <input type="text"
                id="precio"
                name="precio"
               className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black"
               value={price} 
               onChange={(e) => {
                setPrice(e.target.value);
                setErrors({
                    ...errors,
                    price: undefined,
                });
               }}/>
               <p className="text-red-600">{errors.price || ''}</p>
      </div>


    {/* Campo Imagen */}
        <div className="text-sm font-medium text-gray-600">
        <label
            className="mb-4 block text-sm font-medium text-gray-600">
                Imagen
        </label>
            <input
            type="file"
            id="fileInput"
            accept="image/*"
            onChange={handleImageChange}/>
            {image && (
                <div className="flex items-center justify-center">
                    <img className="object-center w-40 h-40" src={image} alt="Vista previa de la imagen" />
                </div>
            )}
        </div>

    {/* Botón de Envío */}
      <div className="items-center text-center">
        <button type="submit"
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-950 focus:outline-none focus:ring focus:border-emerald-600">
                 Registrar Producto
        </button>
      </div>

    {/* Botón para volver a products */}
      <div className="flex mb-2 justify-center">
        <button
            className="inline-flex items-center px-2 py-1 text-sm font-medium text-center text-white bg-green-950 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
            <a href="/products">Volver</a>
        </button>
      </div>

    </form>

  </div>

    )
}