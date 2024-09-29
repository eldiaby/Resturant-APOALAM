import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // const [forgetPassword, setForgetPassword] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    let errors = { ...error };

    // Validate email
    if (name === "email") {
      if (!value) {
        errors.email = "Email is required.";
      } else if (!/^[a-zA-Z][a-zA-Z0-9]*@gmail\.com$/.test(value)) {
        errors.email =
          "Email must start with a letter and end with @gmail.com.";
      } else {
        delete errors.email;
      }
    }

    // Validate password
    if (name === "password") {
      if (!value) {
        errors.password = "Password is required.";
      } else if (
        !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          value
        )
      ) {
        errors.password =
          "Password must be at least 6 characters long and include one letter, one number, and one symbol.";
      } else {
        delete errors.password;
      }
    }

    setError(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");

    const validationErrors = validateLogin();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      console.log(response);

      localStorage.setItem("token", response.data.token); // Save token to localStorage
      console.log("Token:", response.data.token); // Log token

      setSuccess("Login successful! Redirecting to home...");
      setTimeout(() => {
        navigate("/");
      }, 2000); // Redirect to home after 2 seconds
    } catch (err) {
      if (err.response?.data?.status === 403) {
        setError({ message: err.response?.data?.message });
      } else {
        setError({ message: err.response?.data?.message });
      }
    }
  };

  const validateLogin = () => {
    let errors = {};

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/^[a-zA-Z][a-zA-Z0-9]*@gmail\.com$/.test(formData.email)) {
      errors.email = "Email must start with a letter and end with @gmail.com.";
    }

    if (!formData.password) {
      errors.password = "Password is required.";
    } else if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    ) {
      errors.password =
        "Password must be at least 6 characters long and include one letter, one number, and one symbol.";
    }

    return errors;
  };

  return (
    <dialog className="max-w-md shadow w-full mx-auto flex items-center justify-center my-40">
      <div
        className="modal-action flex flex-col justify-center"
        style={{ width: "450px" }}
      >
        <form onSubmit={handleSubmit} className="card-body">
          <h3 className="font-bold text-lg">Please Login!</h3>

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
              className={`input input-bordered ${error.email ? "input-error" : ""
                }`}
            />
            {error.email && <span className="text-red">{error.email}</span>}
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
              className={`input input-bordered ${error.password ? "input-error" : ""
                }`}
            />
            {error.password && (
              <span className="text-red">{error.password}</span>
            )}
          </div>
          <Link
            className="underline text-info ml-auto  ms-auto fw-light cursor-pointer"
            to="/EamilOtp"
          >
            <p>Forget Password </p>
          </Link>

          {/* Error message */}
          {error.message && <p className="text-red">{error.message}</p>}

          {/* Success message */}
          {success && <p className="text-success">{success}</p>}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Login"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            I don't have an account
            <Link to="/signup">
              <button className="underline text-info ml-2">Signup</button>
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
      </div>
    </dialog>
  );
};

export default Login;
