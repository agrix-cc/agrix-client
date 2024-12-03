import React, { useEffect, useState } from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
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

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const serverUri = process.env.REACT_APP_SERVER_URL;

        const response = await axios.get(`${serverUri}/reports/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const orderStats = response.data.orderStats;
        const listingStats = response.data.listingStats;
        const salesData = response.data.salesByMonth;

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

        setLoading(false);
      } catch (err) {
        setError("Failed to load reports. Please try again later.");
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

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
      <div className="flex flex-col lg:flex-row items-start mb-12">
        {orderChartData && (
          <div className="lg:w-1/2 flex flex-col items-center mb-6 lg:mb-0">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
              Order Stats
            </h2>
            <div style={{ width: "350px", height: "350px" }}>
              <Pie
                data={orderChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
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
          <div className="lg:w-1/2 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
              Listing Stats
            </h2>
            <div style={{ width: "350px", height: "350px" }}>
              <Pie
                data={listingChartData}
                options={{ responsive: true, maintainAspectRatio: false }}
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
      <hr className="my-8" />
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Sales by Month
      </h2>
      {salesByMonthData && (
        <div className="flex justify-center">
          <div style={{ width: "100%", maxWidth: "1000px", height: "500px" }}>
            <Bar
              data={salesByMonthData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: { beginAtZero: true, max: 100, stepSize: 10 },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
