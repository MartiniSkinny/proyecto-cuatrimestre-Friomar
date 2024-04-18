"use client"

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react';
import { changePassword } from './actions';
import { useRouter } from 'next/navigation';
import Link from "next/link";

export default function ChangePassword() {

  //estados para los inputs 
  const [passwd, setPasswd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const router = useRouter()
  const supabase = createClient();

  const [errors, setErrors] = useState({});

/*   useEffect(() => {
    const getData = async () => {

        // para redireccionar al login
        const { data: { session } } = await supabase.auth.getSession();

        if (!session) {
            router.push("/login");
        }
    }
    getData()
}, []); */

  function onSave(form) {
    //evitar el submit
    form.preventDefault();

    //objeto temporal para almacenar los errores
    let errorsList = {};

    //validar el name
    if (!passwd) {
      errorsList.passwd = 'La contraseña es obligatoria';
    } else if (passwd.length < 6) {
      errorsList.passwd = 'La contraseña debe tener al menos 6 carácteres'
    }

    if (!confirmPwd) {
      errorsList.confirmPwd = "La confirmación de la contraseña es obligatoria";
    } else if (passwd && passwd != confirmPwd) {
      errorsList.confirmPwd = "La contraseña y la cofirmación de la contraseña no coinciden"
    }

    setErrors({ ...errorsList });

    if (Object.keys(errorsList).length > 0) {
      return;
    }


    changePassword(passwd, confirmPwd)
      .then((result) => {
        //cuando la accion se ejecute correctamente
        //y retorne una respuesta
        console.log(result);

        alert(result.message);
        if (!result.success) {
          setErrors({ ...result.errors });
        } else {
          //limpiar el form
          setPasswd('');
          setConfirmPwd('');
          //limpiar errores
          setErrors({});
        }

      })
      .catch((error) => {
        alert(error.message);
      });
  }

  return (
    <div className='flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2' onSubmit={onSave}>
      <div
        className='flex items-center justify-center text-2xl font-bold mt-28 text-white'>
        Actualizar contraseña
      </div>

      <Link
        href="../"
        className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form method='POST'
            className='animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground mt-auto'>
        <div className='mb-3 flex flex-col'>
          <label htmlFor='name'>Contraseña</label>
          <input
            type='password'
            name='passwd'
            className='rounded-md px-4 py-2 bg-inherit border mt-2 mb-6'
            value={passwd}
            onChange={(e) => {
              setPasswd(e.target.value);
              setErrors({
                ...errors,
                passwd: undefined,
              });
            }}
          />
          <p className='text-red-600'>{errors.passwd || ''}</p>
        </div>
        <div className='mb-3 flex flex-col'>
          <label htmlFor="confirmPwd">Confirmar contraseña</label>
          <input
            type="password"
            name="confirmPwd"
            className="rounded-md px-4 py-2 bg-inherit border mt-2 mb-6"
            value={confirmPwd}
            onChange={(e) => {
              setConfirmPwd(e.target.value);
              setErrors({
                ...errors,
                confirmPwd: undefined,
              });
            }}
          />
          <p className='text-red-600'>{errors.confirmPwd || ''}</p>
        </div>

        <div className='my-6 flex flex-col'>
          <button
            type="submit"
            className='bg-sky-800 rounded-md px-4 py-2 text-foreground mb-2 hover:bg-blue-900'>
            Cambiar mi contreseña
          </button>
        </div>
      </form>
    </div>
  )
}