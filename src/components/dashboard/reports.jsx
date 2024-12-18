import React, {useEffect, useState} from "react";
import axios from "axios";
import {Pie, Bar} from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const Reports = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [orderChartData, setOrderChartData] = useState(null);
    const [listingChartData, setListingChartData] = useState(null);
    const [totalOrderCount, setTotalOrderCount] = useState(null);
    const [listingStatsCount, setListingStatsCount] = useState(null);
    const [salesByMonthData, setSalesByMonthData] = useState(null);
    const [mostSoldCropsChartData, setMostSoldCropsChartData] = useState(null);
    // const [additionalStats, setAdditionalStats] = useState(null);
    // const [userType, setUserType] = useState(null);
    const [personalizedInsights, setPersonalizedInsights] = useState(null);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const token = localStorage.getItem("jwtToken");
                const serverUri = process.env.REACT_APP_SERVER_URL;

                if (!token) {
                    throw new Error("JWT token is missing");
                }

                const response = await axios.get(`${serverUri}/reports/stats`, {
                    headers: {Authorization: `Bearer ${token}`},
                });

                const orderStats = response.data.orderStats;
                const listingStats = response.data.listingStats;
                const salesData = response.data.salesByMonth;
                const additionalStats = response.data.additionalStats;
                const userType = response.data.userType;

                setTotalOrderCount(
                    Object.values(orderStats).reduce((sum, value) => sum + value, 0)
                );

                setListingStatsCount({
                    confirmed: listingStats.confirmed,
                    pending: listingStats.pending,
                    rejected: listingStats.rejected,
                });

                const colors = {
                    pending: "#6D9EEB",
                    accepted: "#93C47D",
                    awaiting: "#FFD966",
                    instorage: "#76A5AF",
                    completed: "#F6B26B",
                    overdue: "#E06666",
                    abandoned: "#8E7CC3",
                    rejected: "#CC0000",
                    delivered: "#4CAF50",
                    processing: "#FF9800",
                    cancelled: "#F44336",
                };

                const orderColors = Object.keys(orderStats).map(
                    (label) => colors[label] || "#CCCCCC"
                );

                const listingColors = ["pending", "confirmed", "rejected"].map(
                    (label) => colors[label] || "#CCCCCC"
                );

                setOrderChartData({
                    labels: Object.keys(orderStats),
                    datasets: [
                        {
                            label: "Order Stats",
                            data: Object.values(orderStats),
                            backgroundColor: orderColors,
                            borderColor: orderColors,
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });

                setListingChartData({
                    labels: ["Pending", "Confirmed", "Rejected"],
                    datasets: [
                        {
                            label: "Listing Stats",
                            data: [
                                listingStats.pending,
                                listingStats.confirmed,
                                listingStats.rejected,
                            ],
                            backgroundColor: listingColors,
                            borderColor: listingColors,
                            borderWidth: 1,
                        },
                    ],
                    options: {
                        plugins: {
                            legend: {
                                display: false,
                            },
                        },
                    },
                });

                const labels = [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                ];

                setSalesByMonthData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Sales by Month",
                            data: salesData,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                        },
                    ],
                });

                if (additionalStats.mostSoldCrops) {
                    const cropLabels = additionalStats.mostSoldCrops
                        .filter(crop => crop.CropListing)
                        .map(crop => crop.CropListing.crop_name);
                    const cropCounts = additionalStats.mostSoldCrops.map(crop => crop.order_count);
                    const cropColors = cropLabels.map((_, index) => `hsl(${index * 60}, 70%, 50%)`);

                    setMostSoldCropsChartData({
                        labels: cropLabels,
                        datasets: [
                            {
                                label: "Most Sold Crops",
                                data: cropCounts,
                                backgroundColor: cropColors,
                                borderColor: cropColors,
                                borderWidth: 1,
                            },
                        ],
                    });
                } else if (additionalStats.mostCommonDestinations) {
                    const transportLabels = additionalStats.mostCommonDestinations.map(item =>
                        item.destination_address
                    )
                    const addressCount = additionalStats.mostCommonDestinations.map(item => item.count);
                    const colors = transportLabels.map((_, index) => `hsl(${index * 60}, 70%, 50%)`);
                    setMostSoldCropsChartData({
                        labels: transportLabels,
                        datasets: [
                            {
                                label: "Most rented destinations",
                                data: addressCount,
                                backgroundColor: colors,
                                borderColor: colors,
                                borderWidth: 1,
                            },
                        ],
                    });
                } else if (additionalStats.mostUsedFeatures) {
                    const storageLabels = Object.keys(additionalStats.mostUsedFeatures[0])
                    const featureCount = Object.values(additionalStats.mostUsedFeatures[0]).map(Number);
                    const colors = storageLabels.map((_, index) => `hsl(${index * 60}, 70%, 50%)`);
                    setMostSoldCropsChartData({
                        labels: storageLabels,
                        datasets: [
                            {
                                label: "Most used features",
                                data: featureCount,
                                backgroundColor: colors,
                                borderColor: colors,
                                borderWidth: 1,
                            },
                        ],
                    });
                }

                // setAdditionalStats(additionalStats);
                // setUserType(userType);
                setPersonalizedInsights(generatePersonalizedInsights(userType, additionalStats));

                setLoading(false);
            } catch (err) {
                console.error("Error fetching reports:", err);
                setError("Failed to load reports. Please try again later.");
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const generatePersonalizedInsights = (userType, stats) => {
        const insights = [];

        if (userType === 'farmer') {
            // Recommendation: Optimize crop yields
            const lowPerformingCrops = stats.salesByMonth.filter(sale => sale.count < 50); // Example threshold
            if (lowPerformingCrops.length) {
                insights.push(
                    `Consider focusing on improving yields for crops like ${lowPerformingCrops.map(crop => crop.name).join(', ')}. Explore better farming techniques or seed varieties.`
                );
            }

            // Recommendation: Reduce wastage
            if (stats.surplusCrops && stats.surplusCrops.length) {
                insights.push(
                    `To reduce wastage, consider storing or processing surplus crops such as ${stats.surplusCrops.map(crop => crop.name).join(', ')}.`
                );
            }

            // Recommendation: Leverage seasonal trends
            if (stats.seasonalTrends && stats.seasonalTrends.length) {
                insights.push(
                    `Based on seasonal trends, consider planting crops like ${stats.seasonalTrends.map(crop => crop.name).join(', ')}.`
                );
            }
        }

        if (userType === 'seller') {
            // Recommendation: Suggest alternate buyers
            const unsoldCrops = stats.unsoldInventory.filter(crop => crop.count > 0);
            if (unsoldCrops.length) {
                insights.push(
                    `There are unsold items such as ${unsoldCrops.map(crop => crop.name).join(', ')}. Connect with alternate buyers in nearby regions.`
                );
            }

            // Recommendation: Price optimization
            if (stats.priceTrends && stats.priceTrends.length) {
                const highDemandCrops = stats.priceTrends.filter(trend => trend.demand > trend.supply);
                if (highDemandCrops.length) {
                    insights.push(
                        `Consider increasing prices for high-demand crops like ${highDemandCrops.map(crop => crop.name).join(', ')}.`
                    );
                }
            }
        }

        if (userType === 'transport') {
            // Recommendation: Enhance logistics
            if (stats.delayedDeliveries && stats.delayedDeliveries.length) {
                insights.push(
                    `Optimize delivery routes to reduce delays. Consider alternate routes to destinations like ${stats.delayedDeliveries.map(dest => dest.name).join(', ')}.`
                );
            }

            // Recommendation: Common destinations
            if (stats.mostCommonDestinations && stats.mostCommonDestinations.length) {
                insights.push(
                    `Optimize routes to frequently visited destinations such as ${stats.mostCommonDestinations.map(dest => dest.destination_address).join(', ')} to improve efficiency.`
                );
            }
        }

        if (userType === 'storage') {
            // Recommendation: Optimize storage usage
            if (stats.mostUsedFeatures && stats.mostUsedFeatures.length) {
                const topFeature = Object.keys(stats.mostUsedFeatures[0])[0];
                insights.push(
                    `Enhance the usage of ${topFeature} to cater to growing demand.`
                );
            }

            // Recommendation: Manage surplus
            if (stats.surplusCrops && stats.surplusCrops.length) {
                insights.push(
                    `Store surplus crops such as ${stats.surplusCrops.map(crop => crop.name).join(', ')} to prevent wastage.`
                );
            }
        }

        // Default case: Generic recommendation
        if (insights.length === 0) {
            insights.push('No personalized insights available at this time. Check back later for updated recommendations.');
        }

        return {
            recommendations: insights,
        };
    };


    if (loading)
        return (
            <p className="text-center text-xl text-gray-600">Loading reports...</p>
        );
    if (error)
        return <p className="text-center text-xl text-red-600">{error}</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
                Reports
            </h1>
            <div className="flex flex-col lg:flex-row items-start mb-12 gap-20">
                {orderChartData && (
                    <div className="lg:w-1/2 flex flex-col items-center mb-6 lg:mb-0">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
                            Order Stats
                        </h2>
                        <div style={{width: "350px", height: "350px"}}>
                            <Pie
                                data={orderChartData}
                                options={{responsive: true, maintainAspectRatio: false}}
                            />
                        </div>
                        <p className="text-gray-600 text-lg mt-4 text-center">
                            Total Orders: <span className="font-bold">{totalOrderCount}</span>
                        </p>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-4">
                            {orderChartData.labels.map((label, index) => (
                                <li key={index} className="text-gray-600 text-md">
                                    <span className="font-medium">{label}</span>:{" "}
                                    {orderChartData.datasets[0].data[index]}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {listingChartData && (
                    <div className="lg:w-1/2 flex flex-col items-center mt-8 lg:mt-0">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
                            Listing Stats
                        </h2>
                        <div style={{width: "350px", height: "350px"}}>
                            <Pie
                                data={listingChartData}
                                options={{responsive: true, maintainAspectRatio: false}}
                            />
                        </div>
                        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-4">
                            <li className="text-gray-600 text-md">
                                <span className="font-medium">Confirmed</span>:{" "}
                                {listingStatsCount.confirmed}
                            </li>
                            <li className="text-gray-600 text-md">
                                <span className="font-medium">Pending</span>:{" "}
                                {listingStatsCount.pending}
                            </li>
                            <li className="text-gray-600 text-md">
                                <span className="font-medium">Rejected</span>:{" "}
                                {listingStatsCount.rejected}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
            <hr className="my-8"/>
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
                Sales by Month
            </h2>
            {salesByMonthData && (
                <div className="flex justify-center">
                    <div style={{width: "100%", maxWidth: "1000px", height: "500px"}}>
                        <Bar
                            data={salesByMonthData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {beginAtZero: true, stepSize: 10},
                                },
                            }}
                        />
                    </div>
                </div>
            )}
            {mostSoldCropsChartData && mostSoldCropsChartData.datasets[0].data.length > 0 ? (
                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
                        Demand stats
                    </h2>
                    <div className="flex">
                        <div className="w-1/2">
                            <div style={{width: "350px", height: "350px", margin: "0 auto"}}>
                                <Pie
                                    data={mostSoldCropsChartData}
                                    options={{responsive: true, maintainAspectRatio: false}}
                                />
                            </div>
                        </div>
                        <div className="w-1/2">
                            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center mt-4">
                                {mostSoldCropsChartData.labels.map((label, index) => (
                                    <li key={index} className="text-gray-600 text-md">
                                        <span className="font-medium">{label}</span>:{" "}
                                        {mostSoldCropsChartData.datasets[0].data[index]}
                                    </li>
                                ))}
                            </ul>
                            {personalizedInsights && (
                                <div className="mt-4">
                                    <h3 className="text-xl font-semibold text-gray-700">Personalized Insights</h3>
                                    {personalizedInsights.recommendations.map((recommendation, index) => (
                                        <p key={index} className="text-gray-600">{recommendation}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center text-xl text-gray-600">No items sold by you.</p>
            )}
        </div>
    );
};

export default Reports;