import { useEffect, useState } from "react";
import {
  FaShoppingBag,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTrash,
  FaPrint,
  FaTruck,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaReceipt,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    paidOrders: 0,
    deliveredOrders: 0,
    totalRevenue: "0.00",
  });

  const loadOrders = async () => {
    const res = await fetch(`${API}/api/orders/admin/all`);
    const data = await res.json();

    if (data.success) {
      setOrders(data.orders);
      setStats(data.stats);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const res = await fetch(`${API}/api/orders/admin/status/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const data = await res.json();

    if (data.success) {
      loadOrders();
    } else {
      alert(data.message || "Status update failed");
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm("Delete this order from admin history?")) return;

    const res = await fetch(`${API}/api/orders/admin/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      loadOrders();
    } else {
      alert(data.message || "Delete failed");
    }
  };

  const printOrder = (order) => {
    const items = order.items
      ?.map(
        (item) => `
          <tr>
            <td>
              <div class="item-box">
                <img src="${item.image}" />
                <div>
                  <strong>${item.name}</strong>
                  <small>${item.desc || "TOPS CHICKEN premium meal"}</small>
                </div>
              </div>
            </td>
            <td>${item.qty || 1}</td>
            <td>${item.price}</td>
          </tr>
        `
      )
      .join("");

    const win = window.open("", "_blank");

    win.document.write(`
      <html>
        <head>
          <title>Invoice ${order.orderNumber}</title>
          <style>
            * { box-sizing: border-box; }

            body {
              margin: 0;
              font-family: Arial, sans-serif;
              background: #111;
              padding: 30px;
              color: #111;
            }

            .invoice {
              max-width: 900px;
              margin: auto;
              background: #fff;
              border-radius: 26px;
              overflow: hidden;
            }

            .top {
              background: linear-gradient(135deg, #000 0%, #3b0000 45%, #d00000 100%);
              color: white;
              padding: 34px;
            }

            .brand-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              gap: 20px;
            }

            .brand {
              display: flex;
              align-items: center;
              gap: 16px;
            }

            .logo {
              width: 82px;
              height: 82px;
              border-radius: 50%;
              background: #fff;
              object-fit: contain;
              padding: 8px;
              border: 4px solid #facc15;
            }

            .brand h1 {
              margin: 0;
              font-size: 34px;
              letter-spacing: 1px;
            }

            .brand p {
              margin: 5px 0 0;
              color: #facc15;
              font-weight: 900;
            }

            .invoice-title {
              text-align: right;
            }

            .invoice-title h2 {
              margin: 0;
              font-size: 32px;
            }

            .invoice-title p {
              margin: 7px 0 0;
              color: #facc15;
              font-weight: 900;
            }

            .content {
              padding: 32px;
            }

            .status-row {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 14px;
              margin-bottom: 22px;
            }

            .status-card {
              background: #f3f4f6;
              border-radius: 18px;
              padding: 16px;
            }

            .label {
              font-size: 11px;
              font-weight: 900;
              color: #b91c1c;
              letter-spacing: 2px;
              text-transform: uppercase;
            }

            .value {
              margin-top: 8px;
              font-size: 17px;
              font-weight: 900;
            }

            .info-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 14px;
              margin-bottom: 28px;
            }

            .info {
              background: #fafafa;
              border: 1px solid #eee;
              border-radius: 18px;
              padding: 16px;
            }

            table {
              width: 100%;
              border-collapse: separate;
              border-spacing: 0 12px;
            }

            th {
              background: #000;
              color: #facc15;
              padding: 16px;
              text-align: left;
              font-size: 13px;
              letter-spacing: 2px;
              text-transform: uppercase;
            }

            th:first-child {
              border-radius: 16px 0 0 16px;
            }

            th:last-child {
              border-radius: 0 16px 16px 0;
            }

            td {
              background: #f3f4f6;
              padding: 14px 16px;
              font-weight: 900;
              vertical-align: middle;
            }

            td:first-child {
              border-radius: 16px 0 0 16px;
            }

            td:last-child {
              border-radius: 0 16px 16px 0;
            }

            .item-box {
              display: flex;
              align-items: center;
              gap: 14px;
            }

            .item-box img {
              width: 62px;
              height: 62px;
              object-fit: cover;
              border-radius: 14px;
            }

            .item-box small {
              display: block;
              margin-top: 4px;
              color: #666;
              font-weight: 700;
            }

            .total-box {
              margin-top: 20px;
              display: flex;
              justify-content: space-between;
              align-items: center;
              background: #facc15;
              border-radius: 20px;
              padding: 22px 26px;
            }

            .total-box span {
              font-size: 20px;
              font-weight: 900;
            }

            .total-box strong {
              font-size: 36px;
              font-weight: 900;
            }

            .footer-note {
              margin-top: 24px;
              background: #111;
              color: white;
              border-radius: 18px;
              padding: 18px;
              text-align: center;
              font-weight: 800;
            }

            .actions {
              display: flex;
              justify-content: center;
              gap: 14px;
              padding: 26px 32px 34px;
            }

            button {
              border: 0;
              border-radius: 999px;
              padding: 14px 30px;
              font-size: 15px;
              font-weight: 900;
              cursor: pointer;
            }

            .print {
              background: #d00000;
              color: white;
            }

            .back {
              background: #000;
              color: white;
            }

            @media print {
              body {
                background: white;
                padding: 0;
              }

              .invoice {
                border-radius: 0;
              }

              .actions {
                display: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="invoice">
            <div class="top">
              <div class="brand-row">
                <div class="brand">
                  <img class="logo" src="${window.location.origin}/logo.png" />
                  <div>
                    <h1>TOPS CHICKEN</h1>
                    <p>Peri Peri Restaurant</p>
                  </div>
                </div>

                <div class="invoice-title">
                  <h2>INVOICE</h2>
                  <p>${order.orderNumber}</p>
                </div>
              </div>
            </div>

            <div class="content">
              <div class="status-row">
                <div class="status-card">
                  <div class="label">Payment</div>
                  <div class="value">${order.paymentStatus}</div>
                </div>

                <div class="status-card">
                  <div class="label">Order Status</div>
                  <div class="value">${order.status}</div>
                </div>

                <div class="status-card">
                  <div class="label">Date</div>
                  <div class="value">${new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
              </div>

              <div class="info-grid">
                <div class="info">
                  <div class="label">Customer</div>
                  <div class="value">${order.customer?.fullName || "N/A"}</div>
                </div>

                <div class="info">
                  <div class="label">Phone</div>
                  <div class="value">${order.customer?.phone || "N/A"}</div>
                </div>

                <div class="info">
                  <div class="label">Address</div>
                  <div class="value">${order.customer?.address || "N/A"}</div>
                </div>

                <div class="info">
                  <div class="label">Postcode</div>
                  <div class="value">${order.customer?.postcode || "N/A"}</div>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Ordered Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                  </tr>
                </thead>

                <tbody>
                  ${items}
                </tbody>
              </table>

              <div class="total-box">
                <span>Grand Total</span>
                <strong>£${order.total}</strong>
              </div>

              <div class="footer-note">
                Thank you for ordering from TOPS CHICKEN. Fresh halal food, fast service and premium peri peri taste.
              </div>
            </div>

            <div class="actions">
              <button class="print" onclick="window.print()">Print Invoice</button>
              <button class="back" onclick="window.close()">Back to Admin</button>
            </div>
          </div>
        </body>
      </html>
    `);

    win.document.close();
  };

  return (
    <div>
      <div className="rounded-[42px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
        <p className="text-sm font-black uppercase tracking-[5px] text-yellow-300">
          Premium Order Management
        </p>

        <h1 className="mt-3 text-4xl font-black leading-tight md:text-6xl">
          TOPS CHICKEN Orders
        </h1>

        <p className="mt-4 max-w-3xl font-semibold leading-7 text-gray-200">
          Manage paid orders, update delivery status, print invoices and remove
          completed order history.
        </p>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <Stat
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingBag />}
        />

        <Stat
          title="Paid Orders"
          value={stats.paidOrders}
          icon={<FaMoneyBillWave />}
        />

        <Stat
          title="Delivered"
          value={stats.deliveredOrders}
          icon={<FaCheckCircle />}
        />

        <Stat
          title="Revenue"
          value={`£${stats.totalRevenue}`}
          icon={<FaMoneyBillWave />}
        />
      </div>

      <div className="mt-8 grid gap-6">
        {orders.length === 0 ? (
          <div className="rounded-[34px] bg-white p-10 text-center shadow-xl">
            <h2 className="text-3xl font-black">No Orders Found</h2>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="overflow-hidden rounded-[38px] bg-white shadow-2xl ring-1 ring-black/5"
            >
              <div className="flex flex-col justify-between gap-5 bg-gradient-to-r from-black via-red-950 to-red-800 p-6 text-white lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
                    {order.orderNumber}
                  </p>

                  <h2 className="mt-2 text-4xl font-black">
                    {order.customer?.fullName || "Customer"}
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-3">
                    <Badge text={`Payment: ${order.paymentStatus}`} />
                    <Badge text={`Total: £${order.total}`} />
                    <Badge text={new Date(order.createdAt).toLocaleDateString()} />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => printOrder(order)}
                    className="rounded-full bg-yellow-400 px-5 py-3 font-black text-black shadow-xl hover:bg-white"
                  >
                    <FaPrint className="inline" /> Print
                  </button>

                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="rounded-full bg-red-700 px-5 py-3 font-black text-white shadow-xl hover:bg-black"
                  >
                    <FaTrash className="inline" /> Delete
                  </button>
                </div>
              </div>

              <div className="grid gap-6 p-6 xl:grid-cols-[1fr_0.45fr]">
                <div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Info
                      icon={<FaUser />}
                      title="Customer"
                      value={order.customer?.fullName}
                    />

                    <Info
                      icon={<FaPhone />}
                      title="Phone"
                      value={order.customer?.phone}
                    />

                    <Info
                      icon={<FaMapMarkerAlt />}
                      title="Address"
                      value={`${order.customer?.address || ""}, ${
                        order.customer?.postcode || ""
                      }`}
                    />
                  </div>

                  <div className="mt-5 rounded-[30px] bg-gray-100 p-5">
                    <h3 className="flex items-center gap-2 text-2xl font-black">
                      <FaReceipt className="text-red-700" />
                      Ordered Items
                    </h3>

                    <div className="mt-4 grid gap-3">
                      {order.items?.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-4 rounded-3xl bg-white p-4 shadow-sm"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 rounded-2xl object-cover"
                          />

                          <div className="flex-1">
                            <h4 className="text-lg font-black">{item.name}</h4>

                            <p className="text-sm font-bold text-gray-500">
                              Qty: {item.qty || 1} • {item.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[30px] bg-black p-6 text-white shadow-2xl">
                  <FaTruck className="text-5xl text-yellow-300" />

                  <h3 className="mt-4 text-3xl font-black">
                    Update Status
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-300">
                    Change order status. Customer tracking will update
                    automatically.
                  </p>

                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="mt-5 w-full rounded-2xl bg-white p-4 font-black text-black outline-none"
                  >
                    <option>Order Confirmed</option>
                    <option>Preparing</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>

                  <p className="mt-4 rounded-2xl bg-white/10 p-4 font-bold">
                    Current Status:{" "}
                    <span className="text-yellow-300">{order.status}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function Badge({ text }) {
  return (
    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-yellow-300">
      {text}
    </span>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="rounded-[34px] bg-white p-6 shadow-xl ring-1 ring-black/5">
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

function Info({ icon, title, value }) {
  return (
    <div className="rounded-3xl bg-gray-100 p-4">
      <div className="text-xl text-red-700">{icon}</div>

      <p className="mt-2 text-xs font-black uppercase tracking-[2px] text-gray-500">
        {title}
      </p>

      <h4 className="mt-1 break-all font-black">{value || "N/A"}</h4>
    </div>
  );
}