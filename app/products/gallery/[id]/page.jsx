'use client'

import Slider from "../../../../components/Slider";
import { useEffect, useState } from 'react';
import { getProductByIdGallery } from '../../edit/[id]/actions';
//import { getProductByIdGallery } from "../../gallery/[id]";
import { getCategory, getProducts, searchProducts } from '../../actions'
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import Link from "next/link";

export default function Page({ params }) {
  const [product, setProduct] = useState({})
  //const [products, setProducts] = useState({});
  const [category, setCategory] = useState([]);

  const productCard = (product) => (
    <div
      key={product.id}
      className="p-4 h-[420px] "
    >
      <p>{product.name}</p>
    </div>
  );

  useEffect(() => {
    const loadProduct = async () => {
      const productResult = await getProductByIdGallery(params.id);
      setProduct(productResult.product);
      console.log(productResult.product)
      if (productResult.error) {
        alert(productResult.error.message);
      }
    };
    loadProduct()
  }, []);

  //console.log(params)

  useEffect(() => {
    const getData = async () => {
      const productsResult = await getCategory(product.category);
      setCategory(productsResult)
      //console.log("Recibe", productsResult)
      if (productsResult.error) {
        alert(productsResult.error.message);
      }
    }
    getData()
  },);

  console.log("info", category.products)


  return (
    /* Detalles del producto */
    <div className='my-6 items-center h-full py-8 mt-2'>
      <h1 className='text-center text-2xl text-blue-400'>Detalles del producto</h1>

      <div className="flex flex-col md:flex-row items-start md:items-center mt-12">

        {/* Columna izquierda de la informacion*/}
        <div className="px-5 pb-5 md:w-1/2 text-left md:pr-15">
          {/* nombre */}
          <p className="mb-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.name}
          </p>
          {/* descripcion */}
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {product.description}
          </p>
          {/* precio */}
          <p className="text-xl font-bold text-red-500">
            ${product.price}
          </p>
        </div>

        {/* Columna derecha de la imagen*/}
        {!!product && (
          <div className="max-w-[400px] mt-16 md:w-1/2 ml-60">
            <ImageGallery
              items={product.gallery || []}
            />
          </div>
        )}
      </div>

      <div className="flex mb-2 mt-7 justify-center">
        <button
          className="inline-flex items-center px-2 py-1 text-base text-center text-white bg-green-600 rounded-lg hover:bg-green-950 focus:ring-4 focus:outline-none focus:ring-gray-300"
        >
          <a href="/products">Volver</a>
        </button>
      </div>


      {/* Elementos relacionados del producto */}
      <div className="items-center py-14 px-16 w-full">
      <div
        className='flex items-center mt-14 justify-center text-2xl font-normal mb-6 text-sky-400'>
        Refacciones relacionadas
      </div>

      <Slider
        height={700}
        itemWidth={360} // Ajustado al ancho máximo de las tarjetas originales
        items={category.products?.map((product) => (

          <div key={product.id}
            className="mx-8 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            style={{
              height: '430px',
              width: '270px'
            }}>
            <ul>
              <li key={product.id}></li>
            </ul>

            <Link href={`${product.id}`}>
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

    </div>

  );
}