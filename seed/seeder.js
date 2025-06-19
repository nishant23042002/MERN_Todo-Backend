import { dummyTodoData } from "./data/dummyTodoData.js"
import connectDB from "../DB.js"
import dotenv from "dotenv"
import TodoModel from "../model/Todo.model.js"


dotenv.config()

const seedData = async () => {
  try {
    await connectDB();
    console.log("DB connected");

    await TodoModel.deleteMany();
    await TodoModel.insertMany(dummyTodoData);

    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seedData();