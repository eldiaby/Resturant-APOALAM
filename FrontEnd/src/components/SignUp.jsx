import React from 'react'
import { useForm } from 'react-hook-form'
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import Modal from './Modal';

function SignUp() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data)

    return (
        <div className='max-w-md shadow w-full mx-auto flex items-center justify-center my-20'>
            <div className="modal-action flex flex-col justify-center mt-0">
                <form onSubmit={handleSubmit(onSubmit)} className="card-body" method='dialog'>
                    <h3 className='font-bold text-lg'>Create An Account  !</h3>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" {...register("email")} />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type="password" placeholder="password" className="input input-bordered" {...register("password")} />
                        {/*  <label className="label mt-1">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label> */}
                        {/* error */}

                        {/* Signup btn */}
                    </div>
                    <div className="form-control mt-6">
                        <input type='submit' value="Signup" className="btn bg-green text-white" />
                    </div>

                    <p className='text-center my-2' > I have an account
                        <button className="underline text-info ml-2"
                            onClick={() => document.getElementById('my_modal_5').showModal()}>Login
                        </button>
                    </p>

                    {/*Start Close x */}
                    <Link
                        to="/"
                        className="btn btn-sm btn-circle btn-ghost absolute right-20 top-5"
                    >✕</Link>
                    {/*End Close x */}

                </form>
                {/* Social sign in */}
                <div className='text-center space-x-3 mb-5'>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaFacebookF />
                    </button>
                    {/* <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGithub />
                    </button> */}
                </div>
            </div>
            <Modal />
        </div>
    )
}

export default SignUp