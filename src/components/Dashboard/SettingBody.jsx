import React from 'react';
import Button from '../atoms/Button';
import { useNavigate } from 'react-router';

const SettingBody = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='flex flex-col gap-2'>
                <h4 className='text-xl font-medium'>
                    Profile Setting
                </h4>
                <Button
            variant='primary'
            text="Update Profile"
            onClick={()=> navigate('/dashboard/update-profile')}
            />
            </div>
        </div>
    );
};

export default SettingBody;