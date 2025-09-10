import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import Loader from '../components/Loader/Loader';
// This component is used to protect routes that require authentication
const PrivateRoute = ({ children }) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    // console.log(location);
    const from = location?.pathname;

    if (loading) {
        return <Loader />
    }

    if (!user) {
        return <Navigate state={from} to='/auth/signin' />
    }

    return children
};

export default PrivateRoute;