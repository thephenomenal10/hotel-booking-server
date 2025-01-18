import { Router } from "express";
import { asyncHandler } from "../middleware/asyncHandler.middleware";
import { RoomRepository } from "../repositories";
import { RoomService } from "../services/room.service";
import { RoomController } from "../controllers";

// Dependency Injection
const roomRepository = new RoomRepository();
const roomService = new RoomService(roomRepository);
const roomController = new RoomController(roomService);

export const router = Router();

router.get("/", asyncHandler(roomController.getAllRooms.bind(roomController)));

router.post("/", asyncHandler(roomController.createRooms.bind(roomController)));

router.post(
  "/booking",
  asyncHandler(roomController.bookRooms.bind(roomController))
);

router.post(
  "/random-occupancy",
  asyncHandler(roomController.generateRandomOccupancy.bind(roomController))
);

router.post(
  "/reset",
  asyncHandler(roomController.resetBookings.bind(roomController))
);
