import { FaCreditCard, FaLock } from "react-icons/fa";

export default function PaymentMethod({ value, onChange }) {
  const selectPayment = () => {
    onChange({
      target: {
        name: "payment",
        value: "Card Payment",
      },
    });
  };

  return (
    <div>
      <label className="mb-3 block text-sm font-black text-gray-700">
        Payment Method
      </label>

      <button
        type="button"
        onClick={selectPayment}
        className={`flex w-full items-center gap-4 rounded-3xl border-2 p-5 text-left transition ${
          value === "Card Payment"
            ? "border-red-700 bg-red-700 text-white"
            : "border-gray-100 bg-gray-50 hover:border-red-400"
        }`}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-400 text-2xl text-black">
          <FaCreditCard />
        </div>

        <div>
          <h4 className="font-black">Card Payment</h4>
          <p className="flex items-center gap-2 text-sm font-semibold text-white/80">
            <FaLock />
            Fill all booking details first, then click Book Order to pay.
          </p>
        </div>
      </button>
    </div>
  );
}