import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTruck,
  FaChartLine,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Dashboard({ setPage }) {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    paidOrders: 0,
    deliveredOrders: 0,
    totalRevenue: "0.00",
  });

  const loadDashboard = async () => {
    const res = await fetch(`${API}/api/orders/admin/all`);
    const data = await res.json();

    if (data.success) {
      setOrders(data.orders || []);
      setStats(data.stats || stats);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const recentOrders = orders.slice(0, 5);

  return (
    <div>
      <div className="rounded-[40px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
          Admin Dashboard
        </p>

        <h1 className="mt-3 text-5xl font-black">TOPS CHICKEN Control Panel</h1>

        <p className="mt-3 max-w-3xl font-semibold text-gray-200">
          Monitor revenue, paid orders, delivery progress and recent customer
          activity.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat title="Total Orders" value={stats.totalOrders} icon={<FaShoppingBag />} />
        <Stat title="Paid Orders" value={stats.paidOrders} icon={<FaMoneyBillWave />} />
        <Stat title="Delivered" value={stats.deliveredOrders} icon={<FaCheckCircle />} />
        <Stat title="Revenue" value={`£${stats.totalRevenue}`} icon={<FaChartLine />} />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-[1fr_0.65fr]">
        <div className="rounded-[36px] bg-white p-6 shadow-2xl">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                Recent Orders
              </p>

              <h2 className="mt-2 text-3xl font-black">Latest Paid Orders</h2>
            </div>

            <button
              onClick={() => setPage("orders")}
              className="rounded-full bg-red-700 px-6 py-3 font-black text-white hover:bg-black"
            >
              View All Orders
            </button>
          </div>

          <div className="mt-6 space-y-4">
            {recentOrders.length === 0 ? (
              <div className="rounded-3xl bg-gray-100 p-8 text-center">
                <h3 className="text-2xl font-black">No orders yet</h3>
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="grid gap-4 rounded-3xl bg-gray-100 p-4 md:grid-cols-[1fr_auto]"
                >
                  <div>
                    <h3 className="text-xl font-black">
                      {order.customer?.fullName || "Customer"}
                    </h3>

                    <p className="mt-1 font-bold text-gray-500">
                      {order.orderNumber} • £{order.total} • {order.paymentStatus}
                    </p>

                    <p className="mt-1 text-sm font-bold text-gray-500">
                      {order.customer?.phone}
                    </p>
                  </div>

                  <div className="rounded-full bg-black px-5 py-3 text-center font-black text-yellow-300">
                    {order.status}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-[36px] bg-gradient-to-b from-black to-red-950 p-6 text-white shadow-2xl">
          <FaTruck className="text-5xl text-yellow-300" />

          <h2 className="mt-5 text-3xl font-black">Admin Actions</h2>

          <p className="mt-3 font-semibold leading-7 text-gray-300">
            Quickly manage restaurant workflow from orders, users and analytics.
          </p>

          <div className="mt-6 grid gap-3">
            <button
              onClick={() => setPage("orders")}
              className="rounded-full bg-yellow-400 px-6 py-4 font-black text-black hover:bg-white"
            >
              Manage Orders
            </button>

            <button
              onClick={() => setPage("users")}
              className="rounded-full bg-white/10 px-6 py-4 font-black text-white hover:bg-red-700"
            >
              View Customers
            </button>

            <button
              onClick={() => setPage("analytics")}
              className="rounded-full bg-white/10 px-6 py-4 font-black text-white hover:bg-red-700"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-[32px] bg-white p-6 shadow-xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-3xl text-yellow-300">
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase tracking-[3px] text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-4xl font-black text-black">{value}</h2>
    </div>
  );
}