import 'dotenv/config';
import mongoose from 'mongoose';
import Category from '../models/Category.js';

const categories = [
  "Cleaning",
  "Pets",
  "Errands",
  "Laundry",
  "Shopping",
  "Academic Assistance",
  "Workers",
  "Farming Help",
  "Gardening",
  "Harvesting",
  "Planting",
  "House Repairs",
  "Carpentry",
  "Plumbing",
  "Electrical Help",
  "Cooking",
  "Food Preparation",
  "Delivery",
  "Motorcycle Service",
  "Water Fetching",
  "Firewood Collection",
  "Elderly Care",
  "Child Care",
  "Tutoring",
  "Tech Assistance",
  "Phone Repair",
  "Computer Help",
  "Construction Labor",
  "Painting",
  "Moving Assistance",
  "Market Selling Help",
  "Store Assistance",
  "Event Setup",
  "Security/Watchman",
  "Driver/Transport",
  "Massage/Wellness"
];  


const run = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME || "MicroJob",
    });

    for (const name of categories) {
      await Category.updateOne({ name }, { $setOnInsert: { name } }, { upsert: true });
    }

    console.log("Categories seeded:", categories.join(", "));
    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to seed categories:", error.message);
    process.exit(1);
  }
};

run();
