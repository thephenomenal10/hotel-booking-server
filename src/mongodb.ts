
import mongoose from "mongoose";
import logger from "./logger";

export const mongodbConnection = async () => {
  try {
    const mongooseOpt: mongoose.ConnectOptions = {
      dbName: process.env.DB_NAME,
    };

    await mongoose.connect(process.env.MONGODB_URI || "", mongooseOpt);

    logger.info("Database connected successfully");
  } catch (error) {
    logger.error(error);
  }
};

