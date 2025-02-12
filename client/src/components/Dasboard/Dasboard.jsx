import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký các thành phần cần thiết của Chart.js
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Hủy biểu đồ cũ nếu có để tránh lỗi
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      chartInstance.current = new ChartJS(ctx, {
        type: "line",
        data: {
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [
            {
              label: "Sales",
              data: [10, 20, 30, 40, 50, 60, 70],
              borderColor: "blue",
              borderWidth: 2,
              pointRadius: 4,
              pointBackgroundColor: "blue",
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "Weekly Sales Data",
            },
          },
        },
      });
    }

    // Cleanup khi component unmount để tránh rò rỉ bộ nhớ
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <main className="w-full bg-gray-200 min-h-screen transition-all">
      <div className="p-6">
        {/* Thống kê */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold">2</div>
                <div className="text-sm font-medium text-gray-400">Users</div>
              </div>
            </div>
            <a
              href="/users"
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>

          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold">15</div>
                <div className="text-sm font-medium text-gray-400">Orders</div>
              </div>
            </div>
            <a
              href="/orders"
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>

          <div className="bg-white rounded-md border border-gray-100 p-6 shadow-md shadow-black/5">
            <div className="flex justify-between mb-6">
              <div>
                <div className="text-2xl font-semibold">$500</div>
                <div className="text-sm font-medium text-gray-400">Revenue</div>
              </div>
            </div>
            <a
              href="/revenue"
              className="text-[#f84525] font-medium text-sm hover:text-red-800"
            >
              View
            </a>
          </div>
        </div>

        {/* Biểu đồ */}
        <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
          <div className="font-medium mb-4">Order Statistics</div>
          <div className="h-64">
            <canvas ref={chartRef}></canvas>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
