import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmailOtp = () => {
  const [formData, setFormData] = useState({
    email: "",
  });
  // const [forgetPassword, setForgetPassword] = useState(false);
  const [error, setError] = useState({ qdqd: "qdqd" });
  const [success, setSuccess] = useState("");
  const [loding, setLoding] = useState(false);
  const [sMessage, setSMessage] = useState("");

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

    setError(errors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setSuccess("");

    const validationErrors = validateLogin();

    if (Object.keys(validationErrors).length > 0) {
      setLoding(false);
      setError(validationErrors);
      return;
    }
    if (!sMessage) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/forgot-password",
          formData
        );

        console.log(response);
        console.log(response.data.message);
        if (response.data.message) {
          setSMessage(response.data.message);
          setTimeout(() => {
            navigate("/resetpassword");
          }, 1000);
        }
        //   setSuccess("Login successful! Redirecting to home...");
        //   setTimeout(() => {
        //     navigate("/");
        //   }, 2000); // Redirect to home after 2 seconds
      } catch (err) {
        setError({ user: err.response.data.message });
        setLoding(false);
        console.log(err.response.data.message);
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

    return errors;
  };

  return (
    <div className="max-w-md   shadow w-full mx-auto flex items-center justify-center my-20">
      <div
        className="modal-action flex flex-col justify-center mt-0"
        style={{ width: "450px" }}
      >
        <form onSubmit={handleSubmit} className="card-body">
          <h3 className="font-bold text-lg">Please Enter Your Email!</h3>

          {/* Email */}
          {loding ? (
            sMessage ? (
              <div>
                <h1 className="text-success my-4 font-bold">
                  Code Has Been Sent To Your Email....
                </h1>
              </div>
            ) : (
              <div class=" mx-auto my-10">
                <div class="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent"></div>
              </div>
            )
          ) : (
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
                className={`input input-bordered ${
                  error.email ? "input-error" : ""
                }`}
              />
              {error.email && <span className="text-red">{error.email}</span>}
            </div>
          )}

          {/* Password */}

          {/* Error message */}
          {error && <p className="text-red">{error.user}</p>}

          {/* Success message */}
          {success && <p className="text-success">{success}</p>}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              onClick={() => setLoding(true)}
              type="submit"
              value="Send Code"
              className={`${
                sMessage ? " disabled:*:" : ""
              } btn bg-green text-white`}
            />
          </div>

          <p className="text-center my-2">
            I have an account
            <Link to="/login">
              <button className="underline text-info ml-2">Login</button>
            </Link>
          </p>
          <p className="text-center ">
            I don't have an account
            <Link to="/signup">
              <button className="underline text-info ml-2">Signup</button>
            </Link>
          </p>

          {/* Close button */}
          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-20 top-5"
          >
            ✕
          </Link>
        </form>
        <div className="text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailOtp;
