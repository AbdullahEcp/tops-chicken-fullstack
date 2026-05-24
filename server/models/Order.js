import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    customerEmail: {
      type: String,
      default: "",
    },

    customer: {
      fullName: String,
      phone: String,
      email: String,
      address: String,
      postcode: String,
      orderType: String,
      payment: String,
      note: String,
    },

    items: [
      {
        id: String,
        name: String,
        category: String,
        price: String,
        image: String,
        desc: String,
        qty: {
          type: Number,
          default: 1,
        },
      },
    ],

    total: {
      type: Number,
      required: true,
      default: 0,
    },

    paymentMethod: {
      type: String,
      default: "Card Payment",
    },

    paymentStatus: {
      type: String,
      default: "Paid",
    },

    status: {
      type: String,
      default: "Order Confirmed",
    },

    orderNumber: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = `TC-${Date.now()}`;
  }

  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;