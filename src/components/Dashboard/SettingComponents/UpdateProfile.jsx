import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Input from '../../atoms/Input';
import Button from '../../atoms/Button';

const UpdateProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Get cover url
  const { data: userData = {}, isLoading: queryLoading } = useQuery({
    queryKey: ['user-details', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/user-details', {
        params: { email: user?.email },
      });
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    institutionName: '',
    institutionType: '',
    classGrade: '',
    year: '',
    department: '',
  });

  React.useEffect(() => {
    if (userData) {
      setFormData({
        username: userData.username || '',
        email: userData.email || '',
        institutionName: userData.institutionName || '',
        institutionType: userData.institutionType || '',
        classGrade: userData.classGrade || '',
        year: userData.year || '',
        department: userData.department || '',
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { mutateAsync: updateProfile, isLoading: mutationLoading } = useMutation({
    mutationKey: ['user-details', user?.email],
    mutationFn: async (updatedData) => {
      const res = await axiosSecure.patch(`/update-profile?email=${user?.email}`, updatedData);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: 'success',
        title: 'Profile Updated!',
        text: 'Profile Updated Successfully.',
        customClass: {
          popup: 'swal-container', // Target .swal2-popup
          title: 'swal-title',
          htmlContainer: 'swal-text', // Target .swal2-html-container
          confirmButton: 'swal-confirm-button'
        }
      });
      navigate('/dashboard/profile');
    },
    onError: (err) => {
      Swal.fire({
        title: 'Update Failed',
        text: err.message,
        icon: 'error',
        customClass: {
          popup: 'swal-container', // Target .swal2-popup
          title: 'swal-title',
          htmlContainer: 'swal-text', // Target .swal2-html-container
          confirmButton: 'swal-confirm-button'
        }
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
  };

  if (queryLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-[#4285F4] dark:text-[#8AB4F8]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="w-full max-w-2xl mx-auto p-6 bg-[#FFFFFF] dark:bg-[#1F2937] rounded-lg shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(255,255,255,0.1)] font-roboto"
    >
      {/* Back Button */}
      <div className="mb-6">
        <Button
          variant="sec_light"
          type="button"
          text="← Back"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-sm"
          aria-label="Go back"
        />
      </div>

      <h2 className="text-2xl font-bold text-[#202124] dark:text-[#F9FAFB] mb-6 text-center">
        Update Your Profile
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Username
          </label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            aria-label="Username"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Email
          </label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            isReadOnly={true}
            aria-label="Email (read-only)"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Institution Name
          </label>
          <Input
            type="text"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            placeholder="Enter your institution name"
            aria-label="Institution Name"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Institution Type
          </label>
          <Input
            type="text"
            name="institutionType"
            value={formData.institutionType}
            onChange={handleChange}
            placeholder="School, College, etc."
            aria-label="Institution Type"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Class/Grade
          </label>
          <Input
            type="text"
            name="classGrade"
            value={formData.classGrade}
            onChange={handleChange}
            placeholder="Enter your class or grade"
            aria-label="Class/Grade"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Year
          </label>
          <Input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Enter academic year"
            aria-label="Year"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-[#5F6368] dark:text-[#D1D5DB]">
            Department
          </label>
          <Input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="Enter your department"
            aria-label="Department"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button
            variant="primary"
            type="submit"
            text="Update Profile"
            loading={mutationLoading}
            disabled={mutationLoading}
            className="w-full max-w-xs"
            aria-label="Submit profile update"
          />
        </div>
      </form>
    </motion.section>
  );
};

export default UpdateProfile;