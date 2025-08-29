import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { PhoneIcon } from '@heroicons/react/24/solid';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Button from '../../../components/atoms/Button';

const SubjectCard = ({ subject }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${subject.subjectName}?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = await user.getIdToken();
          await axiosSecure.delete(`/api/subjects/${subject._id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          queryClient.invalidateQueries(['my-subjects', user?.email]);
          Swal.fire({
            icon: 'success',
            title: 'Deleted',
            text: `${subject.subjectName} deleted successfully!`,
            confirmButtonText: 'OK',
          });
        } catch (error) {
            console.error("error deleting subject",error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete subject. Please try again.',
            confirmButtonText: 'OK',
          });
        }
      }
    });
  };

  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
    >
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-base font-medium text-[#202124] dark:text-[#F9FAFB]">
            {subject.subjectName}
          </h4>
          <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
            Teacher: {subject.teacherName}
          </p>
          <p className="text-sm text-[#5F6368] dark:text-[#D1D5DB]">
            Contact: {subject.teacherNumber}
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="sec_light"
            type="button"
            text="Edit"
            onClick={() => (
              <Link
                to={`/dashboard/edit-subject/${subject._id}`}
                aria-label={`Edit ${subject.subjectName}`}
              />
            )}
            className="text-[#202124] dark:text-[#F9FAFB]"
          />
          <Button
            variant="error"
            type="button"
            text="Delete"
            onClick={handleDelete}
            aria-label={`Delete ${subject.subjectName}`}
          />
          <Button
            variant="primary"
            type="button"
            text={<PhoneIcon className="w-5 h-5" />}
            onClick={() => window.open(`tel:${subject.teacherNumber}`, '_self')}
            aria-label={`Call ${subject.teacherName} at ${subject.teacherNumber}`}
          />
        </div>
      </div>
    </motion.li>
  );
};

export default SubjectCard;