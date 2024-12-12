import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";
import axios from "axios";

export const ProtectedRoutes = () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
        return <Navigate to='/onboarding'/>
    }
    return <Outlet/>;
}

export const AdminProtected = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const authenticateUser = async () => {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('jwtToken');
            const BASE_URL = process.env.REACT_APP_SERVER_URL;

            try {
                await axios.post(`${BASE_URL}/auth/admin`);
                setIsAuthenticated(true);
            } catch (err) {
                setIsAuthenticated(false);
            }
        };

        authenticateUser();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/onboarding" />;
};