import express from "express";
import Product from "../models/Product.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* ADD PRODUCT */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, description, imageUrl } = req.body;

    if (!name || !category || !price || !description) {
      return res.status(400).json({
        success: false,
        message: "All product fields are required",
      });
    }

    let image = "";

    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      image = imageUrl;
    } else {
      return res.status(400).json({
        success: false,
        message: "Product image or image URL is required",
      });
    }

    const product = await Product.create({
      name,
      category,
      price,
      description,
      image,
      isAvailable: true,
    });

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* PUBLIC PRODUCTS */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* ADMIN ALL PRODUCTS */
router.get("/admin/all", async (req, res) => {
  try {
    const products = await Product.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* UPDATE PRODUCT */
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, category, price, description, imageUrl, isAvailable } =
      req.body;

    const updateData = {
      name,
      category,
      price,
      description,
    };

    if (typeof isAvailable !== "undefined") {
      updateData.isAvailable = isAvailable === "true" || isAvailable === true;
    }

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* TOGGLE AVAILABLE / UNAVAILABLE */
router.patch("/availability/:id", async (req, res) => {
  try {
    const { isAvailable } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isAvailable },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
      message: product.isAvailable
        ? "Product is now available"
        : "Product is now unavailable",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

/* SAFE DELETE DISABLED */
router.delete("/:id", async (req, res) => {
  return res.status(403).json({
    success: false,
    message:
      "Delete is disabled for safety. Mark product unavailable instead.",
  });
});

export default router;