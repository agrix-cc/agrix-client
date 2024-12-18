import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";

export default function AdminHome() {
    const [userDistribution, setUserDistribution] = useState({});
    const [totalUsers, setTotalUsers] = useState(0);
    const [demandStats, setDemandStats] = useState({
        mostDemandCrops: [],
        mostDemandDestinations: [],
        mostDemandStorageFacilities: []
    });
    const [leastUserType, setLeastUserType] = useState({});
    const [transportRecommendations, setTransportRecommendations] = useState("");
    const [sellerInsights, setSellerInsights] = useState({
        topProducts: [],
        topLocations: [],
        recommendations: ""
    });
    

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

                    const total = Object.values(distribution).reduce((sum, count) => sum + count, 0);
                    setTotalUsers(total);
                }
            } catch (error) {
                console.error("Error fetching user distribution:", error);
            }
        };

        const fetchDemandStats = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/demand-stats`);
                if (response.data.status === "success") {
                    setDemandStats(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching demand stats:", error);
            }
        };

        const fetchLeastUserType = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/least-user-type`);
                console.log("API Response for Least User Type:", response.data); // Log full API response
        
                if (response.data.status === "success" && response.data.data.profile_type) {
                    setLeastUserType(response.data.data);
                } else {
                    console.error("Invalid data format received:", response.data);
                    setLeastUserType({ profile_type: "Error", count: 0 });
                }
            } catch (error) {
                console.error("Error fetching least user type:", error.message);
                setLeastUserType({ profile_type: "Error", count: 0 });
            }
        };
        
        const fetchTransportRecommendations = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/recommend-transport-routes`);
                setTransportRecommendations(response.data.data.recommendation);
            } catch (error) {
                console.error("Error fetching transport recommendations:", error);
            }
        };

        const fetchSellerInsights = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/admin-reports/recommend-sellers`);
                if (response.data.status === "success") {
                    const { topProducts, topLocations, recommendations } = response.data.data;
                    setSellerInsights({ topProducts, topLocations, recommendations });
                }
            } catch (error) {
                console.error("Error fetching seller insights:", error);
            }
        };
        
        fetchUserDistribution();
        fetchDemandStats();
        fetchLeastUserType();
        fetchTransportRecommendations();
        fetchSellerInsights();
    }, []);

    const userDistributionColors = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"];
    const demandCropsColors = ["#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB", "#9966FF"];
    const demandDestinationsColors = ["#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB"];
    const demandStorageColors = ["#9966FF", "#FF6384", "#FF9F40", "#FFCD56", "#4BC0C0"];

    const generateChartData = (data, labelKey, valueKey, colors) => ({
        labels: data.map(item => item[labelKey]),
        datasets: [
            {
                data: data.map(item => item[valueKey]),
                backgroundColor: colors,
                hoverBackgroundColor: colors,
            },
        ],
    });

    return (
        <div className="p-6 h-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <p className="text-xl font-semibold text-gray-700">Admin Dashboard</p>
            </div>

            {/* User Distribution */}
            <div className="flex items-center mb-8">
                <div className="w-1/2 lg:w-1/3">
                    <Doughnut
                        data={{
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
                                    backgroundColor: userDistributionColors,
                                },
                            ],
                        }}
                    />
                </div>
                <div className="w-1/2 lg:w-2/3 pl-8">
                    <p className="text-lg font-semibold mb-2">User Distribution</p>
                    <ul>
                        <li>Farmers: {userDistribution.farmer || 0}</li>
                        <li>Sellers: {userDistribution.seller || 0}</li>
                        <li>Storage: {userDistribution.storage || 0}</li>
                        <li>Transport: {userDistribution.transport || 0}</li>
                        <li>Admin: {userDistribution.admin || 0}</li>
                    </ul>
                    <p className="mt-4 font-semibold">Total Users: {totalUsers}</p>
                </div>
            </div>

            {/* Least User Type */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Least User Type</h2>
                {leastUserType.profile_type && leastUserType.profile_type !== "Error" ? (
                    <>
                        <p>
                            {leastUserType.profile_type} has the least number of users: {leastUserType.count}
                        </p>
                        <p>
                            Recommendation: Attract more {leastUserType.profile_type} users through campaigns.
                        </p>
                    </>
                ) : (
                    <p>Loading or no data available...</p>
                )}
            </div>

            {/* Demand Stats */}
            <hr className="my-8" />
            <div>
                <p className="text-xl font-semibold mb-4">Demand Stats</p>
                <div className="flex justify-between">
                    <div className="w-1/3">
                        <Doughnut data={generateChartData(demandStats.mostDemandCrops, 'crop_name', 'order_count', demandCropsColors)} />
                        <p className="text-center mt-2">Most Demand Crops</p>
                    </div>
                    <div className="w-1/3">
                        <Doughnut data={generateChartData(demandStats.mostDemandDestinations, 'destination_address', 'order_count', demandDestinationsColors)} />
                        <p className="text-center mt-2">Most Demand Destinations</p>
                    </div>
                    <div className="w-1/3">
                        <Doughnut data={generateChartData(demandStats.mostDemandStorageFacilities, 'storage_type', 'order_count', demandStorageColors)} />
                        <p className="text-center mt-2">Most Demand Storage Facilities</p>
                    </div>
                </div>
            </div>

            {/* Transport Recommendations */}
            <div className="mt-8">
                <h2 className="text-lg font-semibold mb-2">Transport Recommendations</h2>
                <p>{transportRecommendations || "Loading recommendations..."}</p>
            </div>

            {/* Seller Insights */}
{/* Seller Insights */}
<div className="mt-8 bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-6 text-gray-700">Seller Insights</h2>
    
    <div className="flex items-center gap-12">
        {/* Top-Selling Products */}
        <div className="flex flex-col items-center">
            <div style={{ width: "220px", height: "220px" }}>
                <Doughnut
                    data={{
                        labels: sellerInsights.topProducts.map(item => item.crop_name),
                        datasets: [
                            {
                                data: sellerInsights.topProducts.map(item => item.sales_count),
                                backgroundColor: ["#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB", "#9966FF"],
                                hoverBackgroundColor: ["#FF9F40", "#FFCD56", "#4BC0C0", "#36A2EB", "#9966FF"],
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    boxWidth: 12,
                                    padding: 8,
                                    font: { size: 12 },
                                },
                            },
                        },
                    }}
                />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-600">Top-Selling Products</p>
        </div>

        {/* Top-Selling Locations */}
        <div className="flex flex-col items-center">
            <div style={{ width: "220px", height: "220px" }}>
                <Doughnut
                    data={{
                        labels: sellerInsights.topLocations.map(item => item.placed_address),
                        datasets: [
                            {
                                data: sellerInsights.topLocations.map(item => item.sales_count),
                                backgroundColor: ["#FF6384", "#FF9F40", "#FFCE56", "#4BC0C0", "#9966FF"],
                                hoverBackgroundColor: ["#FF6384", "#FF9F40", "#FFCE56", "#4BC0C0", "#9966FF"],
                            },
                        ],
                    }}
                    options={{
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: "bottom",
                                labels: {
                                    boxWidth: 12,
                                    padding: 8,
                                    font: { size: 12 },
                                },
                            },
                        },
                    }}
                />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-600">Top-Selling Locations</p>
        </div>
    </div>

    {/* Recommendations */}
    {sellerInsights.recommendations && (
        <div className="mt-6">
            <p className="text-sm font-semibold text-gray-700">Recommendations:</p>
            <p className="text-gray-600 text-sm mt-1">{sellerInsights.recommendations}</p>
        </div>
    )}
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