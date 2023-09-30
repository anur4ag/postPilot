import React, { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userToken } from '../../Store/Getters';

function ProtectedRoute() {
    const token = useRecoilValue(userToken);
    console.log(token)

    return (
        token ? <Outlet /> : <Navigate to="/" />
    )
}

export default ProtectedRoute;