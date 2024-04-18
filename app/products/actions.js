"use server"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


function supabaseClient() {
    //crear cliente supabase
    const cookieStore = cookies();
    return createClient(cookieStore);

}

export async function getProducts() {
    const supabase = supabaseClient();
    const { data: products, error } = await supabase
    .from('refacciones')
    .select('*');

    return {
        products,
        error
    };
}

export async function getCategory(e) { 
    console.log(e)
    const supabase = supabaseClient();
    const { data: products, error } = await supabase
    .from('refacciones')
    .select('*')
    .like('category', `%${e}%`);

    return {
        products,
        error
    };
}

export async function searchProducts(params) {
    const supabase = supabaseClient();
    
    let { data: products, error } = await supabase.from('refacciones').select();

    if (params) {
        products = products.filter(product =>
            product.name.toLowerCase().includes(params.toLowerCase())
        );
    }

    return {
        products,
        error,
    };
}


// funcion para borrar el producto
export async function deleteProduct(deletedProduct) {
    const supabase = supabaseClient();
    const { data, error } = await supabase
        .from('refacciones')
        .delete(deletedProduct)
        .eq('id', deletedProduct.id);

    // Si hay un error al actualizar el producto, lanza una excepción
    if (error) {
        throw new Error('Error eliminando el producto');
    }

    // Devuelve los datos actualizados del producto
    return {
        success: true,
        message: 'El producto se ha eliminado correctamente',
        errors: null,
    };
}