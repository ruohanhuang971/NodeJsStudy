import { useState } from 'react'
import { Link } from 'react-router'
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const Login = () => {
    const [message, setMessage] = useState("")
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const handleGoogleSignIn = () => {

    }

    const onSubmit = (data) => console.log(data)

    return (
        // h-[calc(100vh-120px)]: make height 100% of the viewport height - 120px
        // justify-center: items horizontally centered
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='border w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-x1 font-semibold mb-4'>Please Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        {/* block: element take up full width of container and starts on a new line */}
                        <label className='block text-gray-700 text-sm font-secondary font-bold mb-2' htmlFor='email'>Email</label>
                        {/* appearance-none: remove default browser formatting, leading-tight: small space between lines*/}
                        <input
                            {...register("email", { required: true })}
                            type='email' name='email' id='email' placeholder='Email Address'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-primary focus:shadow'
                        />
                    </div>
                    <div className='mb-4'>
                        {/* block: element take up full width of container and starts on a new line */}
                        <label className='block text-gray-700 text-sm font-secondary font-bold mb-2' htmlFor='password'>Password</label>
                        {/* appearance-none: remove default browser formatting, leading-tight: small space between lines*/}
                        <input
                            {...register("password", { required: true })}
                            type='password' name='password' id='password' placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-primary focus:shadow'
                        />
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md focus:outline-none'>Login</button>
                    </div>
                </form>
                <p className='align-baseline text-sm font-medium font-secondary mt-4'>Haven't created an account? Please <Link to='/register' className='text-blue-500 hover:text-blue-700'>
                    register
                </Link>.</p>

                {/* Google sign-in */}
                <div className='mt-4'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='border w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus-outline:none'>
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>

                <p className='mt-5 text-center text-gray-500 text-xs'>2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default Login