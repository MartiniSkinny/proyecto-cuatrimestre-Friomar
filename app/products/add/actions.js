"use server"

import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

import { isIdentifierStart } from "typescript";

/**
 * Función para registrar un nuevo producto
 * @param {*} product datos del producto
 */
export async function addProduct(product) {
    // Validar los datos
    let errorsList = {};

    // validar el name
    if (!product.name) {
        errorsList.name = "El nombre es obligatorio";
    }

    // validar description
    if (!product.description) {
        errorsList.description = "La descripción es obligatoria";
    }

    // validar el price
    if (!product.price) {
        errorsList.price = "El precio es obligatorio";
    } else {
        if (!product.price.match("^[0-9]+$")) {
            errorsList.price = "El precio debe ser un número";
        }
    }

    // validar category
    if (!product.category) {
        errorsList.category = "La categoría es obligatoria";
    }
    /*  if (!product.image) {
          errorsList.image = "La imagen es obligatoria";
      }
  
      // Si hay errores en los datos, retornarlos
      if ( Object.keys(errorsList).length > 0) {
          return {
              success: false,
              message: 'Ingresar los datos correctamente',
              errors: errorsList,
          };
      }
  */

    // Insertar el producto en la base de datos
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
        .from('refacciones')
        .insert([
            product,
        ])
        .select();

    // Si hay un error al insertar, retornar aviso al cliente
    if (error) {
        console.error('Error al guardar el producto:', error);
        return {
            success: false,
            message: `Ocurrió un error al guardar el producto.
                Error: ${error.message}`,
            errors: null,
        };
    }

    //Si todo está bien, retornar éxito
    return {
        success: true,
        message: 'El producto se ha registrado correctamente',
        errors: null,
    };
}


export async function convertirYSubirImagen(req, res) {
    // Subir imagen a Supabase
    try {
        // Subir imagen a Supabase Storage
        upload(req, res, async function (err) {
            if (err) {
                console.error('Error al subir la imagen:', err);
                return res.status(500).json({ error: 'Error al subir la imagen' });
            }

            // Obtener el archivo de la solicitud
            const file = req.file;

            if (!file) {
                console.error('No se proporcionó ninguna imagen');
                return res.status(400).json({ error: 'No se proporcionó ninguna imagen' });
            }

            // Convertir la imagen a base64
            const base64String = file.buffer.toString('base64');

            // Inicializar cliente de Supabase
            const supabase = createClient();

            // Subir la imagen a Supabase Storage
            const { data, error } = await supabase.storage
                .from('refacciones')
                .insert(file.originalname, base64String);

            if (error) {
                console.error('Error al subir la imagen a Supabase Storage:', error);
                return res.status(500).json({ error: 'Error al subir la imagen a Supabase Storage' });
            }

            console.log('Imagen subida exitosamente a Supabase Storage:', data);
            // Aquí puedes guardar el URL de la imagen en tu base de datos

            // Devolver el resultado exitoso
            return res.status(200).json({ success: true, message: 'Imagen subida exitosamente a Supabase Storage', imageUrl: data.Key });
        });
    } catch (error) {
        console.error('Error al subir la imagen:', error);
        return res.status(500).json({ error: 'Error al subir la imagen' });
    }
}