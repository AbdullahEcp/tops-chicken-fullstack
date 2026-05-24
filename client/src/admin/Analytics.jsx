import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  FaChartLine,
  FaMoneyBillWave,
  FaShoppingBag,
  FaFire,
  FaTruck,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Analytics() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    paidOrders: 0,
    deliveredOrders: 0,
    totalRevenue: "0.00",
  });

  const loadAnalytics = async () => {
    const res = await fetch(`${API}/api/orders/admin/all`);
    const data = await res.json();

    if (data.success) {
      setOrders(data.orders || []);
      setStats(data.stats || stats);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  const bestSelling = useMemo(() => {
    return Object.values(
      orders
        .flatMap((order) => order.items || [])
        .reduce((acc, item) => {
          if (!acc[item.name]) {
            acc[item.name] = {
              name: item.name,
              sold: 0,
              revenue: 0,
            };
          }

          const price = Number(String(item.price || "0").replace("£", ""));
          const qty = Number(item.qty || 1);

          acc[item.name].sold += qty;
          acc[item.name].revenue += price * qty;

          return acc;
        }, {})
    ).sort((a, b) => b.sold - a.sold);
  }, [orders]);

  const statusData = useMemo(() => {
    return Object.values(
      orders.reduce((acc, order) => {
        const status = order.status || "Order Confirmed";

        if (!acc[status]) {
          acc[status] = { name: status, value: 0 };
        }

        acc[status].value += 1;
        return acc;
      }, {})
    );
  }, [orders]);

  const paymentData = useMemo(() => {
    return Object.values(
      orders.reduce((acc, order) => {
        const payment = order.paymentStatus || "Pending";

        if (!acc[payment]) {
          acc[payment] = { name: payment, value: 0 };
        }

        acc[payment].value += 1;
        return acc;
      }, {})
    );
  }, [orders]);

  const revenueData = useMemo(() => {
    return orders
      .slice()
      .reverse()
      .slice(-10)
      .map((order, index) => ({
        order: `#${index + 1}`,
        revenue: Number(order.total || 0),
      }));
  }, [orders]);

  return (
    <div>
      <div className="rounded-[40px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
          Business Analytics
        </p>

        <h1 className="mt-3 text-5xl font-black">
          Revenue & Orders Report
        </h1>

        <p className="mt-3 max-w-3xl font-semibold text-gray-200">
          Track revenue, best-selling food items, delivery progress and payment
          performance.
        </p>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Card title="Total Revenue" value={`£${stats.totalRevenue}`} icon={<FaMoneyBillWave />} />
        <Card title="Total Orders" value={stats.totalOrders} icon={<FaShoppingBag />} />
        <Card title="Delivered" value={stats.deliveredOrders} icon={<FaTruck />} />
        <Card title="Best Seller" value={bestSelling[0]?.name || "No Data"} icon={<FaFire />} />
      </div>

      <div className="mt-8 grid gap-8 xl:grid-cols-2">
        <ChartCard title="Recent Revenue">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={revenueData}>
              <XAxis dataKey="order" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#b91c1c"
                strokeWidth={4}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Best-Selling Items">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={bestSelling.slice(0, 7)}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sold" fill="#b91c1c" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Order Status Breakdown">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      ["#b91c1c", "#facc15", "#16a34a", "#111111", "#f97316"][
                        index % 5
                      ]
                    }
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Payment Status">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={paymentData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#facc15" radius={[12, 12, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="mt-8 rounded-[40px] bg-white p-6 shadow-2xl">
        <h2 className="text-3xl font-black">Top Food Items</h2>

        <div className="mt-5 grid gap-4">
          {bestSelling.length === 0 ? (
            <div className="rounded-3xl bg-gray-100 p-8 text-center">
              <h3 className="text-2xl font-black">No sales data yet</h3>
            </div>
          ) : (
            bestSelling.slice(0, 8).map((item, index) => (
              <div
                key={item.name}
                className="flex flex-col justify-between gap-4 rounded-3xl bg-gray-100 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                    Rank #{index + 1}
                  </p>

                  <h3 className="mt-1 text-2xl font-black">{item.name}</h3>
                </div>

                <div className="flex gap-3">
                  <span className="rounded-full bg-red-700 px-5 py-3 font-black text-white">
                    Sold: {item.sold}
                  </span>

                  <span className="rounded-full bg-yellow-400 px-5 py-3 font-black text-black">
                    £{item.revenue.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function Card({ title, value, icon }) {
  return (
    <div className="rounded-[34px] bg-white p-6 shadow-2xl">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-700 text-3xl text-yellow-300">
        {icon}
      </div>

      <p className="mt-5 text-sm font-black uppercase tracking-[3px] text-gray-500">
        {title}
      </p>

      <h2 className="mt-2 text-2xl font-black text-black">{value}</h2>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="rounded-[40px] bg-white p-6 shadow-2xl">
      <h2 className="mb-6 text-3xl font-black text-black">{title}</h2>
      {children}
    </div>
  );
}