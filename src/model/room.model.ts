import mongoose, { Document, Schema } from "mongoose";

export interface IRoom {
  roomId: string;
  floor: number;
  roomNumber: number;
  status: string;
}

export interface IRoomDocument extends IRoom, Document {}

const roomSchema = new Schema<IRoomDocument>({
  roomId: { type: String, required: true, unique: true },
  floor: { type: Number, required: true },
  roomNumber: { type: Number, required: true },
  status: { type: String, enum: ["available", "booked"], default: "available" },
});

const RoomModel = mongoose.model<IRoomDocument>("Room", roomSchema);
export default RoomModel;
