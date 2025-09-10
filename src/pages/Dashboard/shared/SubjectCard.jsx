import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { PhoneIcon } from '@heroicons/react/24/solid';
import Button from '../../../components/atoms/Button';

const SubjectCard = ({ subject, handleSubjectChange, showModal, scheduleModal }) => {


  const handleDelete = async (subjectDetails) => {
    // console.log(subjectDetails);
    Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: `Do you want to delete ${subject.subjectName}?`,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'swal-container', // Targets .swal2-popup.swal-container
        title: 'swal-title', // Targets .swal2-popup .swal-title
        htmlContainer: 'swal-text', // Targets .swal2-popup .swal-text
        confirmButton: 'swal-confirm-button', // Targets .swal2-popup .swal-confirm-button
        cancelButton: 'swal-cancel-button' // Targets .swal2-popup .swal-cancel-button
      }
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          handleSubjectChange(subjectDetails)
        } catch (error) {
          console.error("error deleting subject", error);

        }
      }
    });
  };

  const handleSchedule = (subjectDetails) => {
    // console.log(subject);
    scheduleModal(subjectDetails)
  };

  const handleEdit = (subjectDetails) => {

    if (subjectDetails) {
      showModal(subjectDetails);
    }
  }

  return (
    <motion.li
      whileHover={{ scale: 1.02 }}
      className="p-4 rounded-lg bg-[#F8F9FA] dark:bg-[#2D3748] border border-[#DADCE0] dark:border-[#374151] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:shadow-[0_2px_8px_rgba(255,255,255,0.1)]"
    >
      <div className="flex justify-between gap-4 items-center">
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
        <div className="flex flex-wrap-reverse gap-2">
          <Button
            onClick={() => handleSchedule(subject)}
            variant='primary'
            type='button'
            text="Schedule" />
          <Button
            variant="sec_light"
            type="button"
            text="Edit"
            onClick={() => handleEdit(subject)}
            className="text-[#202124] dark:text-[#F9FAFB]"
          />
          <Button
            variant="error"
            type="button"
            text="Delete"
            onClick={() => handleDelete(subject)}
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