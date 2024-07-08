import React from 'react'
import { useForm } from "react-hook-form";
import { UserLoginForm } from '@/types/index';
import ErrorMessage from '@/components/ErrorMessage';
import { Link } from 'react-router-dom';
import {useMutation } from '@tanstack/react-query'
;
import { login } from '@/api/AuthApi';import { toast } from 'react-toastify';

const LoginPage = () => {
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    }
    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues })
    const { mutate } = useMutation({
        mutationFn: login,
        onSuccess: (message) => {
            toast.success(message),
            reset()
        },
        onError : (data) => {
            toast.error(data.message)
        }
    })
    const handleLogin = (formData: UserLoginForm) => {
        mutate(formData)
    }
    return (
        <>

            <form
                onSubmit={handleSubmit(handleLogin)}
                className="space-y-8 p-10 bg-white"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Email</label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Email de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "El Email es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "E-mail no válido",
                            },
                        })}
                    />
                    {errors.email && (
                        <ErrorMessage>{errors.email.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password de Registro"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "El Password es obligatorio",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Iniciar Sesión'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className='mt-10 flex flex-col space-y-5'>
                <Link to='/auth/register' className='text-center text-gray-300 font-normal'>
                    Do not you have an account ? Signup
                </Link>
            </nav>
        </>
    )
}

export default LoginPage