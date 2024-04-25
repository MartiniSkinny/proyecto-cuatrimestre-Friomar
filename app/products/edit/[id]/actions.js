"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function supabaseClient() {
    const cookieStore = cookies();
    return createClient(cookieStore)

}


export async function getProductById(id) {
    const supabase = supabaseClient();
    const { data: product, error } = await supabase
        .from('refacciones')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error('Error al obtener el producto por su ID');
    }

    return product;
}

export async function updateProduct(updatedProduct) {
    // Realiza la validación de datos
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
        errorsList.price = "El precio debe ser un número válido";
    }

    if (!updatedProduct.category) {
        errorsList.category = "La categoría es obligatoria";
    }

    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('refacciones')
        .update(updatedProduct)
        .eq('id', updatedProduct.id);

    if (error) {
        throw new Error('Error actualizando el producto');
    }

    return data;
}


export async function getProductByIdGallery(id) {
    const supabase = supabaseClient();
    const { data: product, error } = await supabase
        .from('refacciones')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        throw new Error('Error al obtener el producto por su ID');
    }

    return { product };
}