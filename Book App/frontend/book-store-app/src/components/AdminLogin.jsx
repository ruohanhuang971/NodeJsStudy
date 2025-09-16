import { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router';

const AdminLogin = () => {
    const [message, setMessage] = useState("")

    const navigate = useNavigate();

    // uses react hook form to handle form
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/v1/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Request has timeout. Please login again.');
                    navigate('/');
                }, 3600 * 1000) // remove token after 1hr, after it expires
            }

            alert('Login successful');
            navigate('/dashboard');
        } catch (error) {
            setMessage("Please prove a valid email and password")
            console.log(error)
        }
    }

    return (
        <div className='h-screen flex justify-center items-center'>
            <div className='border w-full max-w-sm mx-auto bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-x1 font-semibold mb-4'>Admin Dashboard</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        {/* block: element take up full width of container and starts on a new line */}
                        <label className='block text-gray-700 text-sm font-secondary font-bold mb-2' htmlFor='username'>Username</label>
                        {/* appearance-none: remove default browser formatting, leading-tight: small space between lines*/}
                        <input
                            {...register("username", { required: true })}
                            type='text' name='username' id='username' placeholder='Username'
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

                <p className='mt-5 text-center text-gray-500 text-xs'>2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    )
}

export default AdminLogin