import { useEffect } from "react";
import {
  FaTimes,
  FaCheckCircle,
  FaUtensils,
  FaTruck,
  FaClock,
  FaReceipt,
  FaSyncAlt,
} from "react-icons/fa";
import { useCart } from "../context/CartContext";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function TrackingModal() {
  const {
    trackingOpen,
    setTrackingOpen,
    trackingOrder,
    setTrackingOrder,
  } = useCart();

  const refreshSingleOrder = async () => {
    if (!trackingOrder?.orderNumber) return;

    const res = await fetch(
      `${API}/api/orders/track/${trackingOrder.orderNumber}`
    );

    const data = await res.json();

    if (data.success) {
      setTrackingOrder(data.order);
    }
  };

  useEffect(() => {
    if (!trackingOpen) return;

    refreshSingleOrder();

    const interval = setInterval(() => {
      refreshSingleOrder();
    }, 3000);

    return () => clearInterval(interval);
  }, [trackingOpen, trackingOrder?.orderNumber]);

  if (!trackingOpen || !trackingOrder) return null;

  const status = trackingOrder.status || "Order Confirmed";

  const normalizeStatus = (value) => {
    const statusText = String(value || "").toLowerCase().trim();

    if (statusText.includes("cancel")) return -1;
    if (statusText.includes("confirm")) return 0;
    if (statusText.includes("prepar")) return 1;
    if (statusText.includes("out")) return 2;
    if (statusText.includes("deliver")) return 3;

    return 0;
  };

  const currentIndex = normalizeStatus(status);

  const steps = [
    { title: "Order Confirmed", icon: <FaCheckCircle /> },
    { title: "Preparing", icon: <FaUtensils /> },
    { title: "Out for Delivery", icon: <FaTruck /> },
    { title: "Delivered", icon: <FaClock /> },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-md"></div>

      <div className="fixed inset-0 z-[100] flex items-center justify-center px-3 py-5">
        <div className="relative max-h-[94vh] w-full max-w-6xl overflow-y-auto rounded-[36px] bg-white shadow-2xl">
          <button
            type="button"
            onClick={() => setTrackingOpen(false)}
            className="absolute right-4 top-4 z-20 rounded-full bg-black p-4 text-white"
          >
            <FaTimes />
          </button>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
            <div className="bg-gradient-to-b from-black via-red-950 to-red-800 p-6 text-white sm:p-10">
              <p className="text-sm font-black uppercase tracking-[5px] text-yellow-300">
                Live Order Tracking
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                TOPS CHICKEN Delivery Status
              </h2>

              <p className="mt-5 font-semibold leading-8 text-gray-200">
                Your order status updates automatically when admin changes it.
              </p>

              <button
                type="button"
                onClick={refreshSingleOrder}
                className="mt-7 flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-4 font-black text-black"
              >
                <FaSyncAlt />
                Refresh Status
              </button>

              {status === "Cancelled" && (
                <div className="mt-6 rounded-3xl bg-red-700 p-5 font-black text-white">
                  This order has been cancelled.
                </div>
              )}

              <div className="mt-8 space-y-4">
                {steps.map((step, index) => {
                  const active = currentIndex >= index;

                  return (
                    <div
                      key={step.title}
                      className={`flex items-center gap-4 rounded-3xl p-5 font-black transition ${
                        active
                          ? "bg-yellow-400 text-black"
                          : "bg-white/10 text-white"
                      }`}
                    >
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${
                          active
                            ? "bg-black text-yellow-400"
                            : "bg-red-700 text-white"
                        }`}
                      >
                        {step.icon}
                      </div>

                      <span>{step.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="p-6 sm:p-10">
              <div className="rounded-[30px] bg-gray-100 p-6">
                <p className="text-sm font-black uppercase tracking-[4px] text-red-700">
                  Order Number
                </p>

                <h2 className="mt-2 break-all text-4xl font-black text-black">
                  {trackingOrder.orderNumber}
                </h2>

                <span className="mt-4 inline-block rounded-full bg-red-700 px-5 py-2 text-sm font-black text-white">
                  {status}
                </span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Info title="Customer" value={trackingOrder.customer?.fullName} />
                <Info title="Phone" value={trackingOrder.customer?.phone} />

                <Info
                  title="Address"
                  value={`${trackingOrder.customer?.address || ""}, ${
                    trackingOrder.customer?.postcode || ""
                  }`}
                />

                <Info title="Total" value={`£${trackingOrder.total}`} yellow />
                <Info title="Payment" value={trackingOrder.paymentMethod} />
                <Info
                  title="Payment Status"
                  value={trackingOrder.paymentStatus}
                />
              </div>

              <div className="mt-6 rounded-[30px] bg-black p-6 text-white">
                <h3 className="flex items-center gap-2 text-2xl font-black text-yellow-300">
                  <FaReceipt />
                  Ordered Items
                </h3>

                <div className="mt-5 space-y-3">
                  {trackingOrder.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl bg-white/10 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-16 w-16 rounded-xl object-cover"
                      />

                      <div>
                        <h4 className="font-black">{item.name}</h4>
                        <p className="text-sm font-bold text-gray-300">
                          Qty: {item.qty || 1} • {item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <p className="mt-5 text-sm font-bold text-gray-500">
                Ordered at:{" "}
                {trackingOrder.createdAt
                  ? new Date(trackingOrder.createdAt).toLocaleString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Info({ title, value, yellow }) {
  return (
    <div
      className={`rounded-2xl p-4 ${
        yellow ? "bg-yellow-400 text-black" : "bg-gray-100 text-black"
      }`}
    >
      <p className="text-sm font-semibold text-gray-600">{title}</p>
      <h4 className="mt-1 break-all font-black">{value || "N/A"}</h4>
    </div>
  );
}