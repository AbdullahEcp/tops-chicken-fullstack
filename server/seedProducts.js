import dotenv from "dotenv";
import mongoose from "mongoose";
import Product from "./models/Product.js";

dotenv.config();

const products = [
  {
    name: "Tower Burger Meal",
    category: "Burgers",
    price: 6.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1200&auto=format&fit=crop",
    description: "Crispy tower burger with fries and drink.",
  },
  {
    name: "Chicken Burger Meal",
    category: "Burgers",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1200&auto=format&fit=crop",
    description: "Fresh chicken burger meal with fries and drink.",
  },
  {
    name: "Spicy Wings Meal",
    category: "Wings",
    price: 7.29,
    image:
      "https://images.unsplash.com/photo-1527477396000-e27163b481c2?q=80&w=1200&auto=format&fit=crop",
    description: "Hot spicy wings served with fries and dip.",
  },
  {
    name: "Half Peri Peri Chicken",
    category: "Peri Chicken",
    price: 8.49,
    image:
      "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=1200&auto=format&fit=crop",
    description: "Grilled half chicken with peri peri flavour.",
  },
  {
    name: "Whole Peri Peri Chicken",
    category: "Peri Chicken",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=1200&auto=format&fit=crop",
    description: "Full grilled peri peri chicken for sharing.",
  },
  {
    name: "Family Wings Box",
    category: "Deals",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?q=80&w=1200&auto=format&fit=crop",
    description: "Family wings deal with fries and drinks.",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("TOPS CHICKEN products seeded successfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();