import React, {useEffect, useState} from "react";
import axios from "axios";
import {Pie} from 'react-chartjs-2'; // Import the Pie chart component
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';
import randomColor from "randomcolor";

// Register the required components
ChartJS.register(ArcElement, Tooltip, Legend);

const Reports = () => {

    // TODO handle not enough data to generate reports
    // const [reportData, setReportData] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [orderChartData, setOrderChartData] = useState(null);
    const [listingChartData, setListingChartData] = useState(null);

    const [totalOrderCount, setTotalOrderCount] = useState(null);
    const [listingStatsCount, setListingStatsCount] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        const serverUri = process.env.REACT_APP_SERVER_URL;
        // Calling new api
        axios.get(serverUri + "/reports/stats", {
            headers: {Authorization: `Bearer ${token}`},
        })
            .then(res => {
                // Set total orders count regardless of status
                let orderTotal = 0;
                Object.values(res.data.orderStats).forEach(value => orderTotal += value);
                setTotalOrderCount(orderTotal);

                // Set listing stats counts
                setListingStatsCount({
                    confirmed: res.data.listingStats.confirmed,
                    pending: res.data.listingStats.pending,
                    rejected: res.data.listingStats.rejected,
                });

                // Generate random colors based on the stats keys count getting from the server
                // Or else can modified to have unique colors based on the profile type using (switch) or (if else)
                const colors = randomColor({
                    count: Object.keys(res.data.orderStats).length,
                    hue: "blue"
                })

                // Prepare data set for pie chat orders stats
                setOrderChartData({
                    // Get an array of keys in the response orderStats object
                    labels: Object.keys(res.data.orderStats),
                    datasets: [
                        {
                            label: 'Order stats',
                            // Get an array of values in the response orderStats object corresponding to the keys
                            data: Object.values(res.data.orderStats),
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                        },
                    ],
                });

                // Prepare data set for pie chat listings stats
                setListingChartData({
                    labels: ["Pending", "Confirmed", "Rejected"],
                    datasets: [
                        {
                            label: 'Listing stats',
                            data: [
                                res.data.listingStats.pending,
                                res.data.listingStats.confirmed,
                                res.data.listingStats.rejected,
                            ],
                            backgroundColor: [
                                "#f37324",
                                "#72b043",
                                "#e12729",
                            ],
                            borderColor: [
                                "#f37324",
                                "#72b043",
                                "#e12729",
                            ],
                            borderWidth: 1,
                        },
                    ],
                });

                setLoading(false);
                setError(null);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
                console.log(error.message);
            })
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching reports: {error}</p>;

    // TODO handle not enough data to generate reports
    // if (!reportData || !reportData.orders?.length) return <p>Not enough data to generate reports.</p>;

    return (
        <div>
            <h1>Reports</h1>
            <div>
                <h2>Orders</h2>
                {orderChartData && <Pie data={orderChartData}/>}

                {totalOrderCount &&
                    <p>Total Orders: {totalOrderCount}. Breakdown:{" "}</p>
                }
            </div>
            {listingChartData && (
                <div>
                    <h2>Listings</h2>
                    <Pie data={listingChartData}/>
                    <p>
                        Confirmed: {listingStatsCount.confirmed}, Pending: {listingStatsCount.pending},
                        Rejected:{listingStatsCount.rejected}
                    </p>
                </div>
            )}
        </div>
    );
};

export default Reports;