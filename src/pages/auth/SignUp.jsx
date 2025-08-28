import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import GoogleButton from '../../components/shared/GoogleButton';
import FileInput from '../../components/atoms/FileInput';


const SignUp = () => {
    const navigate = useNavigate();
    const [institutionType, setInstitutionType] = useState('School');

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        institutionName: '',
        class: '',
        department: '',
        year: '',
        institutionType: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const institutionType = e.target.institutionType.value;

        formData.institutionType = institutionType;
        console.log(formData);
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
            className="flex flex-col justify-center items-center w-full max-w-md p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
        >
            <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">Sign Up for StudySphere</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Your Username" />
                <FileInput
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files[0] })}
                    name='photo' type='file' />

                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" />
                <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="********" />
                <div className="flex flex-col gap-2">
                    <label className="text-[#5F6368] dark:text-[#D1D5DB] text-sm font-medium">
                        Institution Type
                    </label>
                    <select
                        name="institutionType"
                        value={institutionType}
                        onChange={(e) => setInstitutionType(e.target.value)}
                        className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] font-roboto text-base"
                        aria-label="Select Institution Type"
                    >
                        <option value="School">School</option>
                        <option value="College">College</option>
                        <option value="University">University</option>
                    </select>
                </div>
                <Input type="text" name="institutionName" value={formData.institutionName} onChange={handleChange} placeholder="Enter Institution Name" />
                {institutionType === 'School' ? (
                    <Input type="text" name="class" value={formData.class} onChange={handleChange} placeholder="Enter Class (e.g., Grade 10)" />
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
                                className="w-full px-4 py-2 rounded-md bg-[#F8F9FA] dark:bg-[#1F2937] text-[#202124] dark:text-[#F9FAFB] border border-[#DADCE0] dark:border-[#374151] focus:outline-none focus:ring-2 focus:ring-[#4285F4] font-roboto text-base"
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
                            <Input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Department (e.g., Computer Science)" />
                        </div>
                    </div>
                )}
                <Button variant="primary" type="submit" text="Sign Up" />
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
            <GoogleButton />
            <div className="relative mt-5 flex justify-center text-sm">
                <span className="px-2 bg-[#FFFFFF] dark:bg-[#1F2937] text-[#5F6368] dark:text-[#D1D5DB]">
                    Already have an account?{' '}
                    <Link to="/auth/signin" className="text-[#4285F4] dark:text-[#8AB4F8] hover:underline">
                        Sign In
                    </Link>
                </span>
            </div>
            <Button variant="primary" type="button" text="Back to Home" onClick={handleNavigate} className="mt-4" />
        </motion.section>
    );
};

export default SignUp;