import React from "react";
import {Navigate, Outlet} from "react-router-dom";

const ProtectedRoutes = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return <Navigate to='/onboarding'/>
    }
    return <Outlet/>;
}

export default ProtectedRoutes;