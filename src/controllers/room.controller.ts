import { NextFunction, Request, Response } from "express";
import { RoomService } from "../services/room.service";
import AppError from "../utils/appError";
import logger from "../logger";

export class RoomController {
  private roomService: RoomService;

  constructor(roomService: RoomService) {
    this.roomService = roomService;
  }

  public async getAllRooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rooms = await this.roomService.getAllRooms();
      res.status(200).json({ data: rooms, message: "All rooms fetched." });
    } catch (error) {
      next(error);
    }
  }

  // Method to create multiple rooms
  public async createRooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rooms = await this.roomService.createRooms();
      res.status(201).json({ data: rooms, message: "Rooms Created." }); // 201 for successful creation
    } catch (error) {
      next(error);
    }
  }

  public async bookRooms(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { roomsCount } = req.body;
    try {
      if (parseInt(roomsCount) > 5) {
        throw new AppError({
          statusCode: 400,
          message: "Maximum 5 rooms allowed to book.",
        });
      }

      const bookedRooms = await this.roomService.bookRooms(roomsCount);
      res
        .status(200)
        .json({ data: bookedRooms, message: "Required rooms booked!" });
    } catch (error) {
      next(error);
    }
  }

  public async generateRandomOccupancy(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const randomOccupancy = await this.roomService.generateRandomOccupancy();
      res
        .status(200)
        .json({ data: randomOccupancy, message: "Random booking done" });
    } catch (error) {
      next(error);
    }
  }

  public async resetBookings(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const rooms = await this.roomService.resetBookings();
      res
        .status(200)
        .json({ data: rooms, message: "All bookings reset successfully." });
    } catch (error) {
      next(error);
    }
  }
}
