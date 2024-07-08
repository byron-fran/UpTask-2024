import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {PinInput, PinInputField} from '@chakra-ui/pin-input';
import {useMutation} from '@tanstack/react-query'
import { confirmAccount } from '@/api/AuthApi';
import { toast } from 'react-toastify';

const ConfirmAccount = () => {
    const [token, setToken] = useState('');

    const handleChange = (token : string) => {
        setToken(token)
    };

    const {mutate} = useMutation({
        mutationFn : confirmAccount,
        onSuccess : (message) => {

            toast.success(message)
        },
        onError : (error) => {
            toast.error(error.message)
        }
    })
    const handleComplete = (token : string) => {
        mutate(token)
    }
    return (
        <>

            <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {''}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form
                className="space-y-8 p-10 bg-white mt-10"
            >
                <label
                    className="font-normal text-2xl text-center block"
                >Código de 6 dígitos</label>
                <div className="flex justify-center gap-5">
                    <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                        <PinInputField className='w-10 p-3 rounded-lg border border-gray-300 placeholder-white'/>
                    </PinInput>

                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to='/auth/request-code'
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    )
}

export default ConfirmAccount
