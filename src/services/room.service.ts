import logger from "../logger";
import { IRoom } from "../model/room.model";
import { RoomRepository } from "../repositories";
import AppError from "../utils/appError";
import rooms from "../utils/createRooms";

export class RoomService {
  private roomRepository: RoomRepository;

  constructor(roomRepository: RoomRepository) {
    this.roomRepository = roomRepository;
  }

  public async getAllRooms(): Promise<IRoom[]> {
    try {
      return this.roomRepository.getAllRooms();
    } catch (error) {
      logger.info({ error });
      throw new AppError({
        statusCode: 500,
        message: "ERROR: Fetching rooms failed",
      });
    }
  }

  public async createRooms(): Promise<IRoom[]> {
    try {
      const result = await this.roomRepository.createRooms(rooms);
      return result;
    } catch (error) {
      logger.info({ error });
      throw new AppError({
        statusCode: 500,
        message: "ERROR: Failed to create rooms",
      });
    }
  }

  public async bookRooms(roomsCount: number): Promise<IRoom[]> {
    const availableRooms = await this.roomRepository.findAvailableRooms(
      roomsCount
    );
    // Lock rooms and book them atomically
    await this.roomRepository.bookRooms(availableRooms);
    const allRooms = await this.getAllRooms();
    return allRooms;
  }

  public async generateRandomOccupancy(): Promise<IRoom[]> {
    // Generate random occupancy for rooms
    await this.roomRepository.generateRandomOccupancy();
    return await this.getAllRooms();
  }

  public async resetBookings(): Promise<IRoom[]> {
    // Reset all room bookings in the database
    await this.roomRepository.resetBookings();
    return await this.getAllRooms();
  }
}
