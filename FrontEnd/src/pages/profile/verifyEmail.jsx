import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const VerifyEmail = () => {
    const { email } = useParams(); // Get email from route params
    const navigate = useNavigate(); // For redirecting to login page

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/verifyEmail/${email}`); // Replace with your actual API endpoint
                const data = await response.json();

                if (response.status === 200) {
                    Swal.fire({
                        title: 'Email Verified!',
                        text: 'Your email has been successfully verified.',
                        icon: 'success',
                        allowOutsideClick: false, // Prevent closing the alert by clicking outside
                        allowEscapeKey: false, // Prevent closing the alert with escape key
                        confirmButtonText: 'Go to Login',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/login'); // Redirect to the login page
                        }
                    });
                } else {
                    Swal.fire({
                        title: 'Verification Failed',
                        text: data.message || 'Failed to verify email. Please try again later.',
                        icon: 'error',
                        allowOutsideClick: false, // Prevent closing the alert by clicking outside
                        allowEscapeKey: false, // Prevent closing the alert with escape key
                        confirmButtonText: 'Go to Login',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate('/login'); // Redirect to the login page
                        }
                    });
                }
            } catch (error) {
                Swal.fire({
                    title: 'Error',
                    text: 'Something went wrong. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Go to Signup',
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/signup'); // Redirect to the login page
                    }
                });
            }
        };

        verifyEmail(); // Call the verification function when the component mounts
    }, [email, navigate]);

    return null;
};

export default VerifyEmail;
