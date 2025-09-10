import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import GoogleButton from '../../components/shared/GoogleButton';
import FileInput from '../../components/atoms/FileInput';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const SignUp = () => {
    const { createUser, setUserProfile } = useAuth();
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate();
    const [institutionType, setInstitutionType] = useState('School');
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        institutionName: '',
        classGrade: '',
        department: '',
        year: '',
        institutionType: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    // console.log(location);
    const from = location?.state;

    const [passErr, setPassErr] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const institutionType = e.target.institutionType.value;

        // formData.institutionType = institutionType;
        // console.log(formData);

        const { photo, password, email, username, institutionName, classGrade, department, year } = formData
        // console.log(photo);

        // validate password
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (!passwordPattern.test(password)) {
            setPassErr(
                "Password must be at least 8 characters long, include one uppercase, one lowercase, and one number."
            );
            Swal.fire({
                icon: 'error',
                title: 'Invalid Password',
                text: 'Password must be at least 8 characters long, include one uppercase, one lowercase, and one number.',
                customClass: {
                    container: 'swal-container',
                    title: 'swal-title',
                    content: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
            setLoading(false);
            return; // stop form submission
        } else {
            setPassErr(""); // clear error if valid
        }

        // return if no photo found
        if (!photo) {
            setLoading(false);
            return Swal.fire({
                icon: 'warning',
                title: 'Missing Photo',
                text: 'Please upload a profile photo to continue.',
                customClass: {
                    container: 'swal-container',
                    title: 'swal-title',
                    content: 'swal-text',
                    confirmButton: 'swal-confirm-button'
                }
            });
        }

        const imgData = new FormData();
        imgData.append('image', photo);

        try {

            // uploading photo in imgbb
            const uploadPhotoOnImgbb = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_SECRET}`, imgData);
            // console.log(uploadPhotoOnImgbb);
            const imageOptions = {
                photoURL: uploadPhotoOnImgbb?.data?.data?.url,
                deleteURL: uploadPhotoOnImgbb?.data?.data?.delete_url
            }
            // console.log(imageOptions);

            const userInfo = {
                username, email, institutionType, institutionName, classGrade, department, year,
                ...imageOptions
            }

            // create user with firebase
            createUser(email, password)
                .then(result => {
                    // console.log("user new account created.", result);

                    const updateObject = {
                        displayName: username,
                        photoURL: imageOptions.photoURL
                    }

                    // update name and photo in firebase
                    setUserProfile(updateObject)
                        .then(async () => {
                            console.log("user info updated in the firebase");

                            // upload user info in the server
                            const res = await axiosPublic.post('/create-user', userInfo)
                            // console.log(res.data);
                            if (res?.data?.insertedId) {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Sign Up Successful',
                                    text: `Welcome, ${username}! Your account has been created.`,
                                    customClass: {
                                        popup: 'swal-container', // Target .swal2-popup
                                        title: 'swal-title',
                                        htmlContainer: 'swal-text', // Target .swal2-html-container
                                        confirmButton: 'swal-confirm-button'
                                    }
                                });
                            }
                            setLoading(false);
                            navigate(from ? from : '/')

                        })

                })
                .catch(err => {
                    console.error('error updating user profile', err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Profile Update Failed',
                        text: 'There was an issue updating your profile. Please try again.',
                        customClass: {
                            popup: 'swal-container', // Target .swal2-popup
                            title: 'swal-title',
                            htmlContainer: 'swal-text', // Target .swal2-html-container
                            confirmButton: 'swal-confirm-button'
                        }
                    });
                    setLoading(false);
                })


        }
        catch (err) {
            console.error('error creating new user with credentials', err);
            Swal.fire({
                icon: 'error',
                title: 'Sign Up Failed',
                text: 'There was an issue creating your account. Please check your credentials and try again.',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
            setLoading(false);
        }


    };

    const handleNavigate = () => {
        console.log('Back to Home clicked');
        navigate('/');
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col justify-center items-center w-full max-w-md p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] roboto"
        >
            <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">Sign Up for StudySphere</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Your Username" isRequired={true} />
                <FileInput
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                    name='photo' type='file' />

                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" isRequired={true} />
                <div className='relative'>
                    <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" isRequired={true} />
                    <span onClick={() => setShowPassword(!showPassword)} className='absolute  right-3 top-3'>
                        {
                            !showPassword ? <FaRegEye /> : <FaRegEyeSlash />
                        }
                    </span>
                </div>
                {passErr && (
                    <p className="text-red-500 text-sm font-medium">{passErr}</p>
                )}
                <div className="flex flex-col gap-2">
                    <label className="text-[#5F6368] dark:text-[#D1D5DB] text-sm font-medium">
                        Institution Type
                    </label>
                    <select
                        name="institutionType"
                        value={institutionType}
                        required
                        onChange={(e) => setInstitutionType(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] roboto text-base"
                        aria-label="Select Institution Type"
                    >
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                    </select>
                </div>
                <Input type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Enter Institution Name" isRequired={true} />
                {institutionType === 'School' ? (
                    <Input type="text" name="classGrade" value={formData.classGrade} onChange={handleChange} placeholder="Enter Class (e.g., Grade 10)" isRequired={true} />
                ) : (
                    <div className="flex items-center justify-center gap-4">
                        <div className="flex-1">
                            <label className="text-[#5F6368] dark:text-[#D1D5DB] text-sm font-medium">
                                Year
                            </label>
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] roboto text-base"
                                aria-label="Select Year"
                            >
                                <option value="1st">1st Year</option>
                                <option value="2nd">2nd Year</option>
                                <option value="3rd">3rd Year</option>
                                <option value="4th">4th Year</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="text-[#5F6368] dark:text-[#D1D5DB] text-sm font-medium">
                                Department
                            </label>
                            <Input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Department (e.g., Computer Science)" isRequired={true} />
                        </div>
                    </div>
                )}
                <Button variant="primary" type="submit" text="Sign Up" disabled={loading} loading={loading} />
            </form>
            <div className="relative my-6 w-full">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#DADCE0] dark:border-[#374151]"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#FFFFFF] dark:bg-[#1F2937] text-[#5F6368] dark:text-[#D1D5DB]">
                        OR Sign Up With
                    </span>
                </div>
            </div>
            <GoogleButton register={true} />
            <div className="relative mt-5 flex justify-center text-sm">
                <span className="px-2 bg-[#FFFFFF] dark:bg-[#1F2937] text-[#5F6368] dark:text-[#D1D5DB]">
                    Already have an account?{' '}
                    <Link state={from} to="/auth/signin" className="text-[#4285F4] dark:text-[#8AB4F8] hover:underline">
                        Sign In
                    </Link>
                </span>
            </div>
            <Button variant="primary" type="button" text="Back to Home" onClick={handleNavigate} className="mt-4" />
        </motion.section>
    );
};

export default SignUp;