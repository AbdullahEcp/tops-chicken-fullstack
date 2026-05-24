import { useEffect, useState } from "react";

import {
  FaCheckCircle,
  FaUtensils,
  FaMotorcycle,
  FaHome,
  FaSearch,
  FaClock,
} from "react-icons/fa";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Tracking() {
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const trackOrder = async () => {
    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API}/api/orders/latest/${email}`
      );

      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        alert("No order found");
      }
    } catch (error) {
      console.log(error);
      alert("Tracking failed");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: "Order Confirmed",
      icon: <FaCheckCircle />,
      color: "bg-yellow-400 text-black",
    },

    {
      title: "Preparing Your Food",
      icon: <FaUtensils />,
      color: "bg-orange-500 text-white",
    },

    {
      title: "Out for Delivery",
      icon: <FaMotorcycle />,
      color: "bg-blue-600 text-white",
    },

    {
      title: "Delivered",
      icon: <FaHome />,
      color: "bg-green-600 text-white",
    },
  ];

  const getStepIndex = () => {
    switch (order?.orderStatus) {
      case "Order Confirmed":
        return 0;

      case "Preparing Your Food":
        return 1;

      case "Out for Delivery":
        return 2;

      case "Delivered":
        return 3;

      default:
        return 0;
    }
  };

  const currentStep = getStepIndex();

  return (
    <main className="min-h-screen bg-[#f5f5f5] px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-black via-red-950 to-red-700 p-8 text-white shadow-2xl">
          <p className="text-sm font-black uppercase tracking-[4px] text-yellow-300">
            Live Tracking
          </p>

          <h1 className="mt-3 text-5xl font-black">
            Track Your Order
          </h1>

          <p className="mt-3 max-w-3xl font-semibold text-gray-200">
            Enter your email to view live restaurant order updates.
          </p>

          <div className="mt-8 flex flex-col gap-4 md:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-full bg-white px-5 py-4 text-black shadow-2xl">
              <FaSearch className="text-red-700" />

              <input
                type="email"
                placeholder="Enter your order email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent font-bold outline-none"
              />
            </div>

            <button
              onClick={trackOrder}
              className="rounded-full bg-yellow-400 px-8 py-4 text-lg font-black text-black transition hover:bg-white"
            >
              {loading ? "Searching..." : "Track Order"}
            </button>
          </div>
        </div>

        {!order ? (
          <div className="mt-10 rounded-[40px] bg-white p-10 text-center shadow-2xl">
            <FaMotorcycle className="mx-auto text-7xl text-red-700" />

            <h2 className="mt-6 text-4xl font-black">
              Waiting For Order
            </h2>

            <p className="mt-3 font-semibold text-gray-500">
              Search your order using customer email.
            </p>
          </div>
        ) : (
          <div className="mt-10">
            <div className="rounded-[40px] bg-white p-8 shadow-2xl">
              <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
                <div>
                  <p className="text-sm font-black uppercase tracking-[3px] text-red-700">
                    Order Number
                  </p>

                  <h2 className="mt-2 text-5xl font-black">
                    {order.orderNumber}
                  </h2>

                  <p className="mt-3 font-semibold text-gray-500">
                    {order.customer?.fullName}
                  </p>
                </div>

                <div className="rounded-[32px] bg-gradient-to-r from-black to-red-950 p-6 text-white">
                  <p className="text-sm font-black uppercase tracking-[3px] text-yellow-300">
                    Current Status
                  </p>

                  <h2 className="mt-2 text-3xl font-black">
                    {order.orderStatus}
                  </h2>
                </div>
              </div>

              <div className="relative mt-16">
                <div className="absolute left-0 top-[45px] h-3 w-full rounded-full bg-gray-200"></div>

                <div
                  className="absolute left-0 top-[45px] h-3 rounded-full bg-gradient-to-r from-yellow-400 via-red-600 to-green-600 transition-all duration-1000"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                  }}
                ></div>

                <div className="relative grid gap-8 md:grid-cols-4">
                  {steps.map((step, index) => {
                    const active = index <= currentStep;

                    return (
                      <div
                        key={step.title}
                        className="text-center"
                      >
                        <div
                          className={`mx-auto flex h-24 w-24 items-center justify-center rounded-full text-4xl shadow-2xl transition-all duration-500 ${
                            active
                              ? step.color
                              : "bg-gray-200 text-gray-400"
                          }`}
                        >
                          {step.icon}
                        </div>

                        <h3
                          className={`mt-5 text-xl font-black ${
                            active
                              ? "text-black"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </h3>

                        <p
                          className={`mt-2 text-sm font-bold ${
                            active
                              ? "text-gray-600"
                              : "text-gray-400"
                          }`}
                        >
                          {active
                            ? "Completed"
                            : "Waiting"}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.7fr]">
              <div className="rounded-[40px] bg-white p-8 shadow-2xl">
                <h2 className="text-3xl font-black">
                  Ordered Items
                </h2>

                <div className="mt-6 space-y-4">
                  {order.items?.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-3xl bg-gray-100 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-24 w-24 rounded-2xl object-cover"
                      />

                      <div className="flex-1">
                        <h3 className="text-2xl font-black">
                          {item.name}
                        </h3>

                        <p className="mt-1 font-semibold text-gray-500">
                          Qty: {item.qty}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-500">
                          Price
                        </p>

                        <h3 className="text-3xl font-black">
                          {item.price}
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[40px] bg-gradient-to-b from-black to-red-950 p-8 text-white shadow-2xl">
                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-yellow-400 text-5xl text-black shadow-2xl">
                  <FaClock />
                </div>

                <h2 className="mt-8 text-4xl font-black">
                  Delivery Details
                </h2>

                <div className="mt-8 space-y-5">
                  <Info
                    title="Customer"
                    value={order.customer?.fullName}
                  />

                  <Info
                    title="Phone"
                    value={order.customer?.phone}
                  />

                  <Info
                    title="Address"
                    value={`${order.customer?.address}, ${order.customer?.postcode}`}
                  />

                  <Info
                    title="Payment"
                    value={order.paymentMethod || order.customer?.payment}
                  />

                  <Info
                    title="Payment Status"
                    value={order.paymentStatus}
                  />

                  <Info
                    title="Order Type"
                    value={order.customer?.orderType}
                  />
                </div>

                <div className="mt-8 rounded-3xl bg-yellow-400 p-5 text-black">
                  <p className="text-sm font-black uppercase tracking-[3px]">
                    Grand Total
                  </p>

                  <h3 className="mt-2 text-5xl font-black">
                    £{order.total}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Info({ title, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <p className="text-sm font-bold text-gray-300">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-black">
        {value || "N/A"}
      </h3>
    </div>
  );
}