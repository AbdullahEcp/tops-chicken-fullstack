import express from "express";
import Order from "../models/Order.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/", async (req, res) => {
  try {
    const {
      customerEmail,
      customer,
      items,
      total,
      paymentMethod,
      paymentStatus,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No order items",
      });
    }

    const order = await Order.create({
      userId: req.user?._id || null,
      customerEmail: customerEmail || customer?.email || "",
      customer,
      items,
      total: Number(total || 0),
      paymentMethod: paymentMethod || "Card Payment",
      paymentStatus: paymentStatus || "Paid",
      status: "Order Confirmed",
      orderNumber: `TC-${Date.now()}`,
    });

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log("ORDER SAVE ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* PUBLIC TRACK ORDER BY ORDER NUMBER */
router.get("/track/:orderNumber", async (req, res) => {
  try {
    const order = await Order.findOne({
      orderNumber: req.params.orderNumber,
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* MY ORDERS */
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [
        { userId: req.user._id },
        { customerEmail: req.user.email },
        { "customer.email": req.user.email },
      ],
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADMIN ALL ORDERS */
router.get("/admin/all", async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "fullName email role")
      .sort({ createdAt: -1 });

    const totalRevenue = orders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const paidOrders = orders.filter((o) => o.paymentStatus === "Paid").length;

    const deliveredOrders = orders.filter(
      (o) => o.status === "Delivered"
    ).length;

    res.json({
      success: true,
      orders,
      stats: {
        totalOrders: orders.length,
        paidOrders,
        deliveredOrders,
        totalRevenue: totalRevenue.toFixed(2),
      },
    });
  } catch (error) {
    console.log("ADMIN ORDER LOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE STATUS */
router.patch("/admin/status/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* DELETE ORDER */
router.delete("/admin/delete/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

export default router;