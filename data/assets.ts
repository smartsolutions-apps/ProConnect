
import { Asset } from '../types';
import { USERS } from './users';

export const ASSETS: Asset[] = [
  {
    id: "a1",
    type: "Uniform",
    name: "T-Shirt Size M",
    status: "ASSIGNED",
    assignedTo: USERS[0].id, // Mohamed (Current User) - Blocking Payout
    assignedToName: USERS[0].name,
    lastUpdated: "Today, 08:30 AM"
  },
  {
    id: "a2",
    type: "Uniform",
    name: "T-Shirt Size L",
    status: "AVAILABLE",
    lastUpdated: "Yesterday"
  },
  {
    id: "a3",
    type: "Access",
    name: "VIP Badge #042",
    status: "ASSIGNED",
    assignedTo: USERS[0].id, // Mohamed (Current User) - Blocking Payout
    assignedToName: USERS[0].name,
    lastUpdated: "Today, 08:35 AM"
  },
  {
    id: "a4",
    type: "Tech",
    name: "iPad Pro #12",
    status: "AVAILABLE",
    lastUpdated: "Yesterday"
  },
  {
    id: "a5",
    type: "Tech",
    name: "iPad Pro #08",
    status: "RETURNED",
    assignedTo: USERS[2].id, // Ahmed
    assignedToName: USERS[2].name,
    lastUpdated: "Today, 04:00 PM"
  },
  {
    id: "a6",
    type: "Access",
    name: "Staff Badge #101",
    status: "LOST",
    assignedTo: USERS[3].id, // Laila
    assignedToName: USERS[3].name,
    lastUpdated: "Yesterday"
  }
];
