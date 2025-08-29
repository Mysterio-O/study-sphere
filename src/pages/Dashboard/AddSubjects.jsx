import React, { useState } from 'react';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';
import axios from 'axios';
import Input from '../../components/atoms/Input';
import Button from '../../components/atoms/Button';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LottieAnimation from '../../shared/LottieAnimation';
import animation from '../../assets/animation/add-subjects-animation.json'

const AddSubjects = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [inputPairs, setInputPairs] = useState([{ id: Date.now(), subjectName: '', teacherName: '', teacherNumber: "" }]);

    const handleInputChange = (id, e) => {
        const { name, value } = e.target;
        setInputPairs(
            inputPairs.map((pair) =>
                pair.id === id ? { ...pair, [name]: value } : pair
            )
        );
    };

    const addInputPair = () => {
        setInputPairs([...inputPairs, { id: Date.now(), subjectName: '', teacherName: '', teacherNumber:"" }]);
    };

    const removeInputPair = (id) => {
        if (inputPairs.length === 1) {
            Swal.fire({
                icon: 'warning',
                title: 'Cannot Remove',
                text: 'At least one subject-teacher pair is required.',
                confirmButtonText: 'OK',
            });
            return;
        }
        setInputPairs(inputPairs.filter((pair) => pair.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const invalidPairs = inputPairs.filter((pair) => !pair.subjectName || !pair.teacherName);
        if (invalidPairs.length > 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please fill in all subject and teacher names.',
                confirmButtonText: 'OK',
            });
            return;
        }

        const data = {
            userEmail: user?.email, // Assuming Firebase auth with UID
            subjects: inputPairs.map((pair) => ({
                subjectName: pair.subjectName,
                teacherName: pair.teacherName,
                teacherNumber: pair.teacherNumber
            })),
        };
        console.log(data);

        try {
            const res = await axiosSecure.post(`/add-subjects?email=${user?.email}`, data)
            // console.log(res);
            if (res.data?.insertedId || res.data?.modifiedCount > 0) {
                Swal.fire({
                    icon: 'success',
                    title: 'Added',
                    text: `${inputPairs.length} subject${inputPairs.length > 1 ? 's' : ''} added successfully!`,
                    confirmButtonText: 'OK',
                    customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
                });
                setInputPairs([{ id: Date.now(), subjectName: '', teacherName: '' }]);
            }
        } catch (error) {
            console.error("error adding subjects", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to add subjects. Please try again.',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-container', // Target .swal2-popup
                    title: 'swal-title',
                    htmlContainer: 'swal-text', // Target .swal2-html-container
                    confirmButton: 'swal-confirm-button'
                }
            });
        }
    };

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col md:flex-row justify-center items-center w-full p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
        >
            <div className='w-1/2'>
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6">
                    Add Subjects
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full mb-6">
                    {inputPairs.map((pair) => (
                        <div key={pair.id} className="flex flex-col gap-4 border-b border-[#DADCE0] dark:border-[#374151] pb-4 last:border-b-0">
                            <Input
                                type="text"
                                name="subjectName"
                                placeholder="Enter Subject Name"
                                value={pair.subjectName}
                                onChange={(e) => handleInputChange(pair.id, e)}
                            />
                            <Input
                                type="text"
                                name="teacherName"
                                placeholder="Enter Teacher Name"
                                value={pair.teacherName}
                                onChange={(e) => handleInputChange(pair.id, e)}
                            />
                            <Input
                                type="number"
                                name="teacherNumber"
                                placeholder="Enter Teacher Number"
                                value={pair.teacherNumber}
                                onChange={(e) => handleInputChange(pair.id, e)}
                            />
                            <Button
                                variant="error"
                                type="button"
                                text="Remove Pair"
                                onClick={() => removeInputPair(pair.id)}
                                className="self-end"
                            />
                        </div>
                    ))}
                    <Button
                        variant="sec_light"
                        type="button"
                        text="Add Another Subject"
                        onClick={addInputPair}
                        className="self-end"
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        text="Add Subjects"
                    />
                </form>
            </div>
            <div className='w-1/2'>
                <LottieAnimation animationData={animation} />
            </div>
        </motion.section>
    );
};

export default AddSubjects;