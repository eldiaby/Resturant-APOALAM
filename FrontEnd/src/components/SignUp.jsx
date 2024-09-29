import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function SignUp() {
    const [formData, setFormData] = useState({
        userName: "",
        email: "",
        password: "",
        phone: "",
        address: "",
    });

    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*[a-zA-Z0-9]@gmail\.com$/;
        return emailRegex.test(email);
    };

    const validateUserName = (userName) => {
        return /^[a-zA-Z]{6,}$/.test(userName);
    };

    const validatePhone = (phone) => {
        return /^(011|012|015|010)\d{8}$/.test(phone);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(password);
    };

    // Handle input change with validation
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Validate each field dynamically
        switch (name) {
            case "email":
                setErrors({
                    ...errors,
                    email: validateEmail(value)
                        ? ""
                        : "Invalid email format. Example: mm215@gmail.com",
                });
                break;
            case "userName":
                setErrors({
                    ...errors,
                    userName: validateUserName(value)
                        ? ""
                        : "Username must be letters only and at least 6 characters",
                });
                break;
            case "phone":
                setErrors({
                    ...errors,
                    phone: validatePhone(value)
                        ? ""
                        : "Phone must start with 01 and be 11 digits long",
                });
                break;
            case "password":
                setErrors({
                    ...errors,
                    password: validatePassword(value)
                        ? ""
                        : "Password must be at least 6 characters with a number, letter, and symbol",
                });
                break;
            default:
                break;
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess("");
        setErrors({});

        // Validate all fields before submission
        if (!validateEmail(formData.email)) {
            setErrors({ email: "Invalid email format. Example: mm215@gmail.com" });
            return;
        }
        if (!validateUserName(formData.userName)) {
            setErrors({
                userName: "Username must be letters only and at least 6 characters",
            });
            return;
        }
        if (!validatePhone(formData.phone)) {
            setErrors({ phone: "Phone must start with 01 and be 11 digits long" });
            return;
        }
        if (!validatePassword(formData.password)) {
            setErrors({
                password:
                    "Password must be at least 6 characters with a number, letter, and symbol",
            });
            return;
        }

        try {
            // API request to the registration endpoint
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );
            console.log(response);
            console.log();
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setErrors({ form: err.response.data.message });
            } else {
                setErrors({ form: "An unexpected error occurred. Please try again." });
            }
        }
    };

    return (
        <dialog className="max-w-md shadow w-full mx-auto flex items-center justify-center my-40 ">
            <div className="modal-action flex flex-col justify-center">
                <form
                    onSubmit={handleSubmit}
                    className="card-body "
                    style={{ width: "400px" }}
                >
                    <h3 className="font-bold text-lg">Create An Account!</h3>

                    {/* Email */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            placeholder="Email"
                            name="email"
                            className="input input-bordered"
                        />
                        {errors.email && <p className="text-red">{errors.email}</p>}
                    </div>

                    {/* UserName */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">UserName</span>
                        </label>
                        <input
                            value={formData.userName}
                            onChange={handleChange}
                            type="text"
                            placeholder="UserName"
                            name="userName"
                            className="input input-bordered"
                        />
                        {errors.userName && <p className="text-red">{errors.userName}</p>}
                    </div>

                    {/* Phone */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Phone</span>
                        </label>
                        <input
                            value={formData.phone}
                            onChange={handleChange}
                            type="text"
                            placeholder="Phone"
                            name="phone"
                            className="input input-bordered"
                        />
                        {errors.phone && <p className="text-red">{errors.phone}</p>}
                    </div>

                    {/* Address */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            value={formData.address}
                            onChange={handleChange}
                            type="text"
                            placeholder="Address"
                            name="address"
                            className="input input-bordered"
                        />
                    </div>

                    {/* Password */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            value={formData.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                            name="password"
                            className="input input-bordered"
                        />
                        {errors.password && <p className="text-red">{errors.password}</p>}
                    </div>

                    {/* General Error message */}
                    {errors.form && <p className="text-red">{errors.form}</p>}

                    {/* Success message */}
                    {success && <p className="text-success">{success}</p>}

                    {/* Signup button */}
                    <div className="form-control mt-6">
                        <input
                            type="submit"
                            value="Signup"
                            className="btn bg-green text-white"
                        />
                    </div>

                    <p className="text-center my-2">
                        I have an account
                        <Link to="/login">
                            <button className="underline text-info ml-2">Login</button>
                        </Link>
                    </p>

                    {/* Close button */}
                    <Link
                        to="/"
                        className="btn btn-sm btn-circle btn-ghost absolute right-5 top-5"
                    >
                        ✕
                    </Link>
                </form>

                {/* Social sign-in */}
                {/* <div className="text-center space-x-3 mb-5">
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaGoogle />
                    </button>
                    <button className="btn btn-circle hover:bg-green hover:text-white">
                        <FaFacebookF />
                    </button>
                </div> */}
            </div>
        </dialog>
    );
}

export default SignUp;
