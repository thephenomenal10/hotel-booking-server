import express, { NextFunction, Request, Response } from "express";
import { configDotenv } from "dotenv";
import { pinoHttp } from "pino-http";
import cors, { CorsOptions } from "cors";
import { errorHandler } from "./middleware/errorHandler.middleware";
import { RoomRouter } from "./router";
import AppError from "./utils/appError";

const app = express();

configDotenv();
app.use(express.json({ limit: "60mb" }));

//cors
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [];
// Configure CORS
const corsOptions: CorsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin: (origin: any, callback: any) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(
        new AppError({
          statusCode: 403,
          message: "Not allowed by CORS",
        })
      );
    }
  },
};
app.use(cors({ ...corsOptions }));
app.use(pinoHttp());

// Define routes
app.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.send("Booking Management server is up and running 🚀");
});

app.use("/api/rooms", RoomRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
