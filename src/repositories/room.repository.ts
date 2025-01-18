import RoomModel, { IRoom } from "../model/room.model";
import AppError from "../utils/appError";

export class RoomRepository {
  // Method to get all rooms
  public async getAllRooms(): Promise<IRoom[]> {
    return RoomModel.find();
  }

  public async createRooms(roomsData: IRoom[]): Promise<any> {
    return RoomModel.insertMany(roomsData);
  }

  // Find available rooms and prioritize the closest ones first
  public async findAvailableRooms(numRooms: number): Promise<IRoom[]> {
    // First, try to find rooms on the same floor
    const roomsByFloor: { [floor: number]: IRoom[] } = {};

    const availableRooms = await RoomModel.find({ status: "available" });
    if (availableRooms.length < numRooms) {
      throw new AppError({
        message:
          availableRooms.length === 0
            ? `No rooms available to book`
            : `Only ${availableRooms.length} rooms available to book`,
        statusCode: 500,
      });
    }
    // Organize available rooms by floor
    availableRooms.forEach((room) => {
      if (!roomsByFloor[room.floor]) {
        roomsByFloor[room.floor] = [];
      }
      roomsByFloor[room.floor].push(room);
    });

    let selectedRooms: IRoom[] = [];
    // Sort each floor's rooms by proximity (based on room numbers)
    for (const floor in roomsByFloor) {
      const roomsOnFloor = roomsByFloor[parseInt(floor)];
      roomsOnFloor.sort((a, b) => Math.abs(a.roomNumber - b.roomNumber)); // Sort by room proximity
      selectedRooms = selectedRooms.concat(
        roomsOnFloor.slice(0, numRooms - selectedRooms.length)
      );
      if (selectedRooms.length >= numRooms) break;
    }

    return selectedRooms;
  }

  public async bookRooms(roomsToBook: IRoom[]): Promise<IRoom[]> {
    const bookedRooms = [];

    for (const room of roomsToBook) {
      // Lock the room and update it to booked status
      const bookedRoom = await RoomModel.findOneAndUpdate(
        { roomId: room.roomId, status: "available" },
        { status: "booked" },
        { new: true, useFindAndModify: false }
      );

      if (!bookedRoom) {
        throw new Error(`Room ${room.roomId} could not be booked`);
      }
      bookedRooms.push(bookedRoom);
    }

    return bookedRooms;
  }

  public async generateRandomOccupancy(): Promise<void> {
    const rooms = await RoomModel.find({ status: "available" });
    const randomRooms = rooms.filter(() => Math.random() < 0.5);
    for (const room of randomRooms) {
      room.status = "booked";
      await room.save();
    }
  }

  public async resetBookings(): Promise<void> {
    await RoomModel.updateMany({}, { status: "available" });
  }
}
