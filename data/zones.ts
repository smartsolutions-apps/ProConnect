
import { Zone, User } from '../types';
import { USERS } from './users';

export const INITIAL_ZONES: Zone[] = [
  {
    id: "z_entrance",
    name: "Main Entrance",
    x: 10,
    y: 50,
    capacity: 4,
    assignedUsers: [USERS[2], USERS[3]] // Ahmed, Laila
  },
  {
    id: "z_vip",
    name: "VIP Lounge",
    x: 80,
    y: 20,
    capacity: 3,
    assignedUsers: [USERS[0]] // Mohamed
  },
  {
    id: "z_booth_a",
    name: "Vodafone Booth",
    x: 40,
    y: 35,
    capacity: 5,
    assignedUsers: [USERS[4], USERS[5], USERS[6]] // Omar, Nour, Youssef
  },
  {
    id: "z_booth_b",
    name: "CIB Booth",
    x: 40,
    y: 65,
    capacity: 5,
    assignedUsers: []
  },
  {
    id: "z_reg",
    name: "Registration Desk",
    x: 20,
    y: 85,
    capacity: 6,
    assignedUsers: [USERS[7]] // Dina
  },
  {
    id: "z_stage",
    name: "Main Stage",
    x: 80,
    y: 70,
    capacity: 4,
    assignedUsers: []
  }
];

export const STANDBY_STAFF: User[] = [
    // Simulating users from the user list who aren't assigned yet
    { ...USERS[1], name: "Hassan (Standby)" }, 
    { ...USERS[2], id: "u_temp_1", name: "Karim (Standby)" },
    { ...USERS[3], id: "u_temp_2", name: "Mona (Standby)" }
];

export const STANDBY_POOL: User[] = [
    { ...USERS[4], name: "Mostafa (Pool)", id: "pool_1" },
    { ...USERS[5], name: "Rana (Pool)", id: "pool_2" },
    { ...USERS[6], name: "Ali (Pool)", id: "pool_3" }
];
