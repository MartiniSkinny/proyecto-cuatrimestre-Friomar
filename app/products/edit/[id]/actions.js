"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function supabaseClient(){
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

    return {product};
}