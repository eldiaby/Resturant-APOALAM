import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { decode } from "jwt-js-decode";
import axios from "axios";

const ProfileSettings = () => {
  const [userData, setUserData] = useState({
    userName: "",
    phone: "",
    address: "",
    email: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = validateEmail(value)
          ? ""
          : "Invalid email format. Example: mm215@gmail.com";
        break;
      case "userName":
        error = validateUserName(value)
          ? ""
          : "Username must be at least 6 characters long and contain letters only.";
        break;
      case "phone":
        error = validatePhone(value)
          ? ""
          : "Phone must start with 01 and be 11 digits long.";
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!validateEmail(userData.email)) {
      newErrors.email = "Invalid email format. Example: mm215@gmail.com";
    }
    if (!validateUserName(userData.userName)) {
      newErrors.userName =
        "Username must be at least 6 characters long and contain letters only.";
    }
    if (!validatePhone(userData.phone)) {
      newErrors.phone = "Phone must start with 01 and be 11 digits long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:5000/api/users/${userId}`, userData, {
        headers: { token },
      });
      setIsEditing(!false);
      fetchUserData(token);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const fetchUserData = async (token) => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { token },
      });
      if (data) {
        setUserData({
          userName: data.userName,
          phone: data.phone,
          email: data.email,
          address: data.address,
        });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = decode(token);
      setUserId(decodedToken.payload._id);
      fetchUserData(token);
    }
  }, [location]);

  const validateEmail = (email) => /^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(email);
  const validateUserName = (userName) => /^[a-zA-Z]{6,}$/.test(userName);
  const validatePhone = (phone) => /^(011|012|015|010)\d{8}$/.test(phone);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto p-6">
        <h4 className="font-bold text-2xl text-gray-800 mt-20">
          Profile Settings
        </h4>
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 mt-5">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {["userName", "phone", "address", "email"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="form-label font-bold capitalize">
                  {field}
                </label>
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  className={`ml-5 mt-2 p-2 form-control ${
                    isEditing
                      ? "border border-black bg-stone-500 text-white"
                      : "bg-white"
                  } rounded-md`}
                  value={userData[field]}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
                {errors[field] && <p className="text-red">{errors[field]}</p>}
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <Link className="mr-auto" to="/EamilOtp">
                <p className={`btn bg-red mr-auto text-white`}>
                  {" "}
                  Reset Password
                </p>
              </Link>

              <button
                className={`btn ${
                  isEditing ? "btn-primary" : "bg-blue-500 text-white"
                }`}
                type={isEditing ? "submit" : "button"}
                onClick={() => {
                  if (isEditing) {
                    if (Object.keys(errors).length === 0) {
                      setIsEditing(false); // No errors, exit editing mode
                    }
                    // If there are errors, you might want to prevent changing to non-editing mode
                  } else {
                    setIsEditing(true); // Enter editing mode
                  }
                }}
              >
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
