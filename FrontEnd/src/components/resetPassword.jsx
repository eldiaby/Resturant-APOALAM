// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { FaFacebookF, FaGoogle } from "react-icons/fa";
// import { Link } from "react-router-dom";

// function ResetPassword() {
//   const [formData, setFormData] = useState({
//     email: "",
//     newPassword: "",
//     otp: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");
//   const [loding, setLoding] = useState(false);
//   const [sMessage, setSMessage] = useState("");
//   const navigate = useNavigate();

//   const validateEmail = (email) => {
//     const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*[a-zA-Z0-9]@gmail\.com$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (otp) => {
//     return /^[0-9]{6}$/.test(otp);
//   };

//   const validatePassword = (newPassword) => {
//     return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(newPassword);
//   };

//   // Handle input change with validation
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Validate each field dynamically
//     switch (name) {
//       case "email":
//         setErrors({
//           ...errors,
//           email: validateEmail(value)
//             ? ""
//             : "Invalid email format. Example: mm215@gmail.com",
//         });
//         break;

//       case "otp":
//         setErrors({
//           ...errors,
//           otp: validatePhone(value) ? "" : "Code Must Be 6 Numbers",
//         });
//         break;
//       case "newPassword":
//         setErrors({
//           ...errors,
//           newPassword: validatePassword(value)
//             ? ""
//             : "Password must be at least 6 characters with a number, letter, and symbol",
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setSuccess("");
//     setErrors({});

//     // Validate all fields before submission
//     if (!validateEmail(formData.email)) {
//       setErrors({ email: "Invalid email format. Example: mm215@gmail.com" });
//       return;
//     }

//     if (!validatePhone(formData.otp)) {
//       setErrors({ otp: "code must be 6 Numbers" });
//       return;
//     }
//     if (!validatePassword(formData.newPassword)) {
//       setErrors({
//         newPassword:
//           "Password must be at least 6 characters with a number, letter, and symbol",
//       });
//       return;
//     }
//     console.log(formData);

//     if (Object.keys(errors).length > 0) {
//       setLoding(false);
//       console.log(Object.keys(errors).length);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/reset-password",
//         formData
//       );

//       console.log(response);
//       console.log(response.data.message);

//       //   setErrors({ sMessage: response.data.message });
//       // if (response.data.message) {
//       //   setSMessage(response.data.message);
//       //   setTimeout(() => {
//       //     navigate("/resetpassword");
//       //   }, 1000);
//       // }
//     } catch (err) {
//       //   setError({ user: err.response.data.message });
//       //   setLoding(false);
//       console.log(err.response.data.message);
//       setLoding(false);
//       setErrors({ sMessage: err.response.data.message });
//     }
//   };

//   return (
//     <div className="max-w-md shadow w-full mx-auto flex items-center justify-center my-10">
//       <div className="modal-action flex flex-col justify-center mt-0">
//         <form
//           onSubmit={handleSubmit}
//           className="card-body"
//           style={{ width: "400px" }}
//         >
//           <h3 className="font-bold text-lg">Reset Your Password</h3>
//           {loding ? (
//             <div class=" mx-auto my-10">
//               <div class="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
//               <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent"></div>
//             </div>
//           ) : (
//             <>
//               {/* Email */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Email</span>
//                 </label>
//                 <input
//                   value={formData.email}
//                   onChange={handleChange}
//                   type="email"
//                   placeholder="Email"
//                   name="email"
//                   className="input input-bordered"
//                 />
//                 {errors.email && <p className="text-red">{errors.email}</p>}
//               </div>

//               {/* Phone */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">Code</span>
//                 </label>
//                 <input
//                   value={formData.otp}
//                   onChange={handleChange}
//                   type="text"
//                   placeholder="Code"
//                   name="otp"
//                   className="input input-bordered"
//                 />
//                 {errors.otp && <p className="text-red">{errors.otp}</p>}
//               </div>

//               {/* Password */}
//               <div className="form-control">
//                 <label className="label">
//                   <span className="label-text">New Password</span>
//                 </label>
//                 <input
//                   value={formData.newPassword}
//                   onChange={handleChange}
//                   type="password"
//                   placeholder="New Password"
//                   name="newPassword"
//                   className="input input-bordered"
//                 />
//                 {errors.newPassword && (
//                   <p className="text-red">{errors.newPassword}</p>
//                 )}
//               </div>
//             </>
//           )}

//           {/* General Error message */}
//           {errors.form && <p className="text-red">{errors.form}</p>}
//           {errors.sMessage && <p className="text-red">{errors.sMessage}</p>}

//           {/* Success message */}
//           {success && <p className="text-success">{success}</p>}

//           {/* Signup button */}
//           <div className="form-control mt-6">
//             <input
//               onClick={() => setLoding(true)}
//               type="submit"
//               value="Reset password"
//               className="btn bg-green text-white"
//             />
//           </div>

//           <p className="text-center my-2">
//             I have an account
//             <Link to="/login">
//               <button className="underline text-info ml-2">Login</button>
//             </Link>
//           </p>

//           {/* Close button */}
//           <Link
//             to="/"
//             className="btn btn-sm btn-circle btn-ghost absolute right-20 top-5"
//           >
//             ✕
//           </Link>
//         </form>

//         {/* Social sign-in */}
//         <div className="text-center space-x-3 mb-5">
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaGoogle />
//           </button>
//           <button className="btn btn-circle hover:bg-green hover:text-white">
//             <FaFacebookF />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ResetPassword;
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";

function ResetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    otp: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [sMessage, setSMessage] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9]*[a-zA-Z0-9]@gmail\.com$/;
    return emailRegex.test(email);
  };

  const validatePhone = (otp) => {
    return /^[0-9]{6}$/.test(otp);
  };

  const validatePassword = (newPassword) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[\W_]).{6,}$/.test(newPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value)
            ? ""
            : "Invalid email format. Example: mm215@gmail.com",
        });
        break;

      case "otp":
        setErrors({
          ...errors,
          otp: validatePhone(value) ? "" : "Code Must Be 6 Numbers",
        });
        break;
      case "newPassword":
        setErrors({
          ...errors,
          newPassword: validatePassword(value)
            ? ""
            : "Password must be at least 6 characters with a number, letter, and symbol",
        });
        break;
      default:
        break;
    }
  };

  const hasErrors = () => {
    return !!errors.email || !!errors.otp || !!errors.newPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setErrors({});

    if (!validateEmail(formData.email)) {
      setErrors({ email: "Invalid email format. Example: mm215@gmail.com" });
      return;
    }

    if (!validatePhone(formData.otp)) {
      setErrors({ otp: "Code must be 6 Numbers" });
      return;
    }

    if (!validatePassword(formData.newPassword)) {
      setErrors({
        newPassword:
          "Password must be at least 6 characters with a number, letter, and symbol",
      });
      return;
    }

    if (hasErrors()) {
      setLoading(false);
      return;
    }
    if (!sMessage) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/reset-password",
          formData
        );

        console.log(response.data.message);
        setSMessage(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err) {
        console.log("sdSD", err);
        setLoading(false);
        const errorMessage = err.response?.data?.message || "An error occurred";
        setErrors({ sMessage: errorMessage });
      }
    }
  };

  return (
    <div className="max-w-md shadow w-full mx-auto flex items-center justify-center my-10">
      <div className="modal-action flex flex-col justify-center mt-0">
        <form
          onSubmit={handleSubmit}
          className="card-body"
          style={{ width: "400px" }}
        >
          <h3 className="font-bold text-lg">Reset Your Password</h3>
          {loading ? (
            sMessage ? (
              <div>
                <h1 className="text-success my-4 font-bold">{sMessage}</h1>
              </div>
            ) : (
              <div class=" mx-auto my-10">
                <div class="w-12 h-12 rounded-full absolute border-2 border-solid border-gray-200"></div>
                <div class="w-12 h-12 rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent"></div>
              </div>
            )
          ) : (
            <>
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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Code</span>
                </label>
                <input
                  value={formData.otp}
                  onChange={handleChange}
                  type="text"
                  placeholder="Code"
                  name="otp"
                  className="input input-bordered"
                />
                {errors.otp && <p className="text-red">{errors.otp}</p>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>
                <input
                  value={formData.newPassword}
                  onChange={handleChange}
                  type="password"
                  placeholder="New Password"
                  name="newPassword"
                  className="input input-bordered"
                />
                {errors.newPassword && (
                  <p className="text-red">{errors.newPassword}</p>
                )}
              </div>
            </>
          )}

          {errors.form && <p className="text-red">{errors.form}</p>}
          {errors.sMessage && <p className="text-red">{errors.sMessage}</p>}
          {success && <p className="text-success">{success}</p>}

          <div className="form-control mt-6">
            <input
              onClick={() => setLoading(true)}
              type="submit"
              value="Reset password"
              className="btn bg-green text-white"
            />
          </div>

          <p className="text-center my-2">
            I have an account
            <Link to="/login">
              <button className="underline text-info ml-2">Login</button>
            </Link>
          </p>

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
}

export default ResetPassword;
