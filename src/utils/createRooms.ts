import { IRoom } from "../model/room.model";

const rooms: IRoom[] = [
  // Floor 1: Rooms 101-110
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${101 + i}`,
    floor: 1,
    roomNumber: 101 + i,
    status: "available",
  })),
  // Floor 2: Rooms 201-210
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${201 + i}`,
    floor: 2,
    roomNumber: 201 + i,
    status: "available",
  })),
  // Floor 3: Rooms 301-310
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${301 + i}`,
    floor: 3,
    roomNumber: 301 + i,
    status: "available",
  })),
  // Floor 4: Rooms 401-410
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${401 + i}`,
    floor: 4,
    roomNumber: 401 + i,
    status: "available",
  })),

  // Floor 5: Rooms 501-510
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${501 + i}`,
    floor: 5,
    roomNumber: 501 + i,
    status: "available",
  })),

  // Floor 6: Rooms 601-610
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${601 + i}`,
    floor: 6,
    roomNumber: 601 + i,
    status: "available",
  })),

  // Floor 7: Rooms 701-710
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${701 + i}`,
    floor: 7,
    roomNumber: 701 + i,
    status: "available",
  })),

  // Floor 8: Rooms 801-810
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${801 + i}`,
    floor: 8,
    roomNumber: 801 + i,
    status: "available",
  })),

  // Floor 9: Rooms 901-910
  ...Array.from({ length: 10 }, (_, i) => ({
    roomId: `${901 + i}`,
    floor: 9,
    roomNumber: 901 + i,
    status: "available",
  })),

  // Floor 10: Rooms 1001-1007
  ...Array.from({ length: 7 }, (_, i) => ({
    roomId: `${1001 + i}`,
    floor: 10,
    roomNumber: 1001 + i,
    status: "available",
  })),
];

export default rooms;
