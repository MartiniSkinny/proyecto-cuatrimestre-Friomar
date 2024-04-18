"use server"
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function changePassword(passwd, confirmPwd) {
    let errorsList = {}; // Inicializar el objeto de errores

    if (!passwd) {
        errorsList.passwd = "La contraseña es obligatoria";
    } else if (passwd.length < 6) {
        errorsList.passwd = "La contraseña debe tener al menos 6 caracteres";
    }

    if (!confirmPwd) {
        errorsList.confirmPwd = "Confirmar contraseña es obligatorio";
    } else if (passwd !== confirmPwd) {
        errorsList.confirmPwd = "La contraseña y la confirmación de contraseña no coinciden";
    }

    if (Object.keys(errorsList).length > 0) {
        return {
            success: false,
            message: 'Ingresar los datos correctamente',
            errors: errorsList,
        };
    }

    // Obtener las cookies del objeto de solicitud
    const cookieStore = cookies(/* Pasar el objeto de solicitud adecuado aquí */);
    const supabase = createClient(cookieStore);

    // Actualizar la contraseña
    const { error } = await supabase.auth.updateUser({ password: passwd });

    if (error) {
        return {
            success: false,
            message: `No se pudo actualizar la contraseña. ${error.message}`,
            errors: errorsList,
        };
    }

    return {
        success: true,
        message: "La contraseña ha sido actualizada",
        errors: [],
    };
}
