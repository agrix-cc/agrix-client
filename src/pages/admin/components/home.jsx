import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

export default function AdminHome() {
    const [userDistribution, setUserDistribution] = useState({});
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUserDistribution = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/user-distribution`);
                if (response.data.status === "success") {
                    const distribution = response.data.data.reduce((acc, item) => {
                        acc[item.profile_type] = item.count;
                        return acc;
                    }, {});
                    setUserDistribution(distribution);

                    // Calculate total users
                    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
                    setTotalUsers(total);
                } else {
                    alert("Failed to fetch user distribution: " + response.data.message);
                }
            } catch (error) {
                alert("Error fetching user distribution: " + error.message);
            }
        };

        fetchUserDistribution();
    }, []);

    const chartData = {
        labels: ["Farmers", "Sellers", "Storage", "Transport", "Admin"],
        datasets: [
            {
                data: [
                    userDistribution.farmer || 0,
                    userDistribution.seller || 0,
                    userDistribution.storage || 0,
                    userDistribution.transport || 0,
                    userDistribution.admin || 0,
                ],
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            },
        ],
    };

    return (
        <div className="p-6 h-full">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-gray-700">Admin Dashboard</p>
            </div>
            <div className="flex items-center mb-8">
                {/* Chart on the Left */}
                <div className="w-1/2 lg:w-1/3">
                    <Doughnut data={chartData} />
                </div>

                {/* User Distribution Details on the Right */}
                <div className="w-1/2 lg:w-2/3 pl-8">
                    <p className="text-lg font-semibold text-gray-700 mb-2">User Distribution</p>
                    <ul className="list-disc list-inside text-gray-600">
                        <li className="py-1">Farmers: {userDistribution.farmer || 0}</li>
                        <li className="py-1">Sellers: {userDistribution.seller || 0}</li>
                        <li className="py-1">Storage: {userDistribution.storage || 0}</li>
                        <li className="py-1">Transport: {userDistribution.transport || 0}</li>
                        <li className="py-1">Admin: {userDistribution.admin || 0}</li>
                    </ul>
                    <p className="text-lg font-semibold text-gray-700 mt-4">Total Users: {totalUsers}</p>
                </div>
            </div>
        </div>
    );
}
//Title - Admin Dashboard
//Revenue Generated : (value)
//Revenue is Mostly Generated From : (type of user here farming or selling or storage or transport)
//sub title - User Variations
//Chart Generated for users.jsx 
//Create a personlized algorithm that analyze least registered users and their type, and give a personalized insight for the admin
//sub title - Transport Orders 
//Generated the chart for most used transport orders location
//Then a personalized insight for admin
//sub title - Storage Orders
//Generate reports for about storage faciliies
//sub title - Sellers
//Generate reports about sellers, like most selling product, most selling location (2 charts)
//overall insights for admin 