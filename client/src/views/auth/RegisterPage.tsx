import React from 'react'
import { UserRegitserForm } from '@/types/index'
import ErrorMessage from '@/components/ErrorMessage'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import {useMutation} from '@tanstack/react-query'
import { createAccount } from '@/api/AuthApi'
import { toast } from 'react-toastify'

const RegisterPage = () => {
    const initialValues: UserRegitserForm = {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    }
    const {mutate} = useMutation({
        mutationFn : createAccount,
        onSuccess: (data) => {
            toast.success(data)
            reset()
        },
        onError  : (error) => {
            toast.error(error.message)
            
        }
    })
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegitserForm>({ defaultValues: initialValues });

    const password = watch('password');

    const handleRegister = (formData: UserRegitserForm) => mutate(formData)
    return (
        <>
            <h1 className="text-5xl font-black text-white">Create account</h1>
         
            <form
                onSubmit={handleSubmit(handleRegister)}
                className="space-y-8 p-10  bg-white mt-10"
                noValidate
            >
                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                        htmlFor="email"
                    >Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email invalidate",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "Email invalidate",
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
                    >Name</label>
                    <input
                        type="name"
                        placeholder="Name"
                        className="w-full p-3  border-gray-300 border"
                        {...register("name", {
                            required: "Username is required",
                        })}
                    />
                    {errors.name && (
                        <ErrorMessage>{errors.name.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password "
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "password",
                            minLength: {
                                value: 8,
                                message: 'password invalidate'
                            }
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <div className="flex flex-col gap-5">
                    <label
                        className="font-normal text-2xl"
                    >Repeat password</label>

                    <input
                        id="password_confirmation"
                        type="password"
                        placeholder="Repeat password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password_confirmation", {
                            required: "Password is required",
                            validate: value => value === password || 'Los Passwords no son iguales'
                        })}
                    />

                    {errors.password_confirmation && (
                        <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Register'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className='mt-10 flex flex-col space-y-5'>
                <Link to='/auth/login' className='text-center text-gray-300 font-normal'>
                    Do you have an account ? Login
                </Link>
                <Link to='/auth/forgot-password' className='text-center text-gray-300 font-normal'>
                    Forgot your password
                </Link>
            </nav>
        </>
    )
}

export default RegisterPage
