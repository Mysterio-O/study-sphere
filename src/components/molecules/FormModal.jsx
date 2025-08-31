import React, { useState, useEffect } from 'react';
import Input from '../atoms/Input';
import Button from '../atoms/Button';
import { motion } from 'motion/react';
import Swal from 'sweetalert2';

const FormModal = ({ subject, setModalInView, handleUpdateSubject }) => {
    const [formData, setFormData] = useState({
        subjectName: '',
        teacherName: '',
        teacherNumber: ''
    });

    useEffect(() => {
        if (subject) {
            setFormData({
                subjectName: subject.subjectName || '',
                teacherName: subject.teacherName || '',
                teacherNumber: subject.teacherNumber || '',
            });
        }
    }, [subject]);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // keep your submit logic here
        console.log("Updated data:",subject, formData);
        const isSame = 
        subject.subjectName === formData.subjectName &&
        subject.teacherName === formData.teacherName &&
        subject.teacherNumber === formData.teacherNumber;

        if(isSame){
           return Swal.fire({
            icon: 'info',
            title: 'No Changes',
            text: 'You have not made any changes to update.',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal-container dark',
                title: 'swal-title',
                htmlContainer: 'swal-text',
                confirmButton: 'swal-confirm-button'
            }
        });
        }

        const newData = {
            oldData:subject,
            newData:formData
        }
        console.log(newData);
        handleUpdateSubject(newData);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="bg-white dark:bg-[#111827] rounded-2xl shadow-xl p-6 w-full max-w-lg mx-auto"
        >
            {/* Header */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB]">
                    Update Subject
                </h2>
                <p className="text-sm text-[#5F6368] dark:text-[#9CA3AF] mt-1">
                    Modify the details and save your changes.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="subjectName"
                        className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]"
                    >
                        Subject Name
                    </label>
                    <Input
                        type="text"
                        name="subjectName"
                        value={formData.subjectName}
                        onChange={handleOnChange}
                        placeholder="Enter subject name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="teacherName"
                        className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]"
                    >
                        Teacher Name
                    </label>
                    <Input
                        type="text"
                        name="teacherName"
                        value={formData.teacherName}
                        onChange={handleOnChange}
                        placeholder="Enter teacher's name"
                    />
                </div>

                <div>
                    <label
                        htmlFor="teacherNumber"
                        className="block mb-1 text-sm font-medium text-[#202124] dark:text-[#E5E7EB]"
                    >
                        Teacher Contact
                    </label>
                    <Input
                        type="text"
                        name="teacherNumber"
                        value={formData.teacherNumber}
                        onChange={handleOnChange}
                        placeholder="Enter teacher's phone number"
                    />
                </div>

                {/* Action buttons */}
                <div className="flex justify-end gap-3 pt-4">
                    <Button
                        variant="outline"
                        type="button"
                        text="Cancel"
                        className="px-6"
                        onClick={() => setModalInView(false)}
                    />
                    <Button
                        variant="primary"
                        type="submit"
                        text="Update"
                        className="px-6"
                    />
                </div>
            </form>
        </motion.div>
    );
};

export default FormModal;
