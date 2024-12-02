import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";

const Reports = () => {
    const [reportData, setReportData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const response = await axios.get("/reports/user-reports", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setReportData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching reports:", error);
                setError(error.response ? error.response.data.message : error.message);
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching reports: {error}</p>;
    if (!reportData || !reportData.orders?.length) return <p>Not enough data to generate reports.</p>;

    const orderChartData = {
        labels: reportData.orders.map((order) => order.status),
        datasets: [
            {
                label: "Orders",
                data: reportData.orders.reduce((acc, order) => {
                    acc[order.status] = (acc[order.status] || 0) + 1;
                    return acc;
                }, {}),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
        ],
    };

    const listingChartData = reportData.listings && {
        labels: ["Current", "Pending", "Rejected"],
        datasets: [
            {
                label: "Listings",
                data: [reportData.listings.current, reportData.listings.pending, reportData.listings.rejected],
                backgroundColor: ["#4BC0C0", "#FF9F40", "#9966FF"],
            },
        ],
    };

    return (
        <div>
            <h1>Reports</h1>
            <div>
                <h2>Orders</h2>
                <Pie data={orderChartData} />
                <p>
                    Total Orders: {reportData.orders.length}. Breakdown:{" "}
                    {reportData.orders
                        .reduce((acc, order) => {
                            acc[order.status] = (acc[order.status] || 0) + 1;
                            return acc;
                        }, {})
                        .map((status, count) => `${status}: ${count}`)}
                </p>
            </div>
            {listingChartData && (
                <div>
                    <h2>Listings</h2>
                    <Pie data={listingChartData} />
                    <p>
                        Current: {reportData.listings.current}, Pending: {reportData.listings.pending}, Rejected:{" "}
                        {reportData.listings.rejected}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Reports;