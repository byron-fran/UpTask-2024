import { useForm } from "react-hook-form";
import { UserLoginForm } from '@/types/index';
import ErrorMessage from '@/components/ErrorMessage';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query'
import { login } from '@/api/AuthApi'; import { toast } from 'react-toastify';

const LoginPage = () => {
    
    const initialValues: UserLoginForm = {
        email: '',
        password: '',
    };

    const { register, handleSubmit, formState: { errors }, reset } = useForm({ defaultValues: initialValues });
    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate('/')
            reset()
        },
        onError: (data) => {
            toast.error(data.message)
        }
    });

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
                        placeholder="Email"
                        className="w-full p-3  border-gray-300 border"
                        {...register("email", {
                            required: "Email is required",
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
                    >Password</label>

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full p-3  border-gray-300 border"
                        {...register("password", {
                            required: "Password is required",
                        })}
                    />
                    {errors.password && (
                        <ErrorMessage>{errors.password.message}</ErrorMessage>
                    )}
                </div>

                <input
                    type="submit"
                    value='Login'
                    className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-3  text-white font-black  text-xl cursor-pointer"
                />
            </form>
            <nav className='mt-10 flex flex-col space-y-5'>
                <Link to='/auth/register' className='text-center text-gray-300 font-normal'>
                    Do not you have an account ? Signup
                </Link>
                <Link to='/auth/forgot-password' className='text-center text-gray-300 font-normal'>
                    Forgot your password
                </Link>
            </nav>
        </>
    )
}

export default LoginPage
