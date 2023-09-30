import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { auth } from '../../Firebase/Firebase';

function ProtectedRoute() {
    const user = auth.currentUser

    return (
        user ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute;