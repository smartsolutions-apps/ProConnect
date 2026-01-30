
import { Squad, User } from '../types';
import { USERS } from './users';

// Helper to calculate reliability
const calculateReliability = (user: User) => {
    if (!user.shiftsBooked || user.shiftsBooked === 0) return 100; // New users start fresh
    return Math.round((user.shiftsCompleted! / user.shiftsBooked) * 100);
};

// Creating subsets of users for squads
const membersSquad1 = [USERS[0], USERS[3], USERS[4], USERS[7]]; // Mohamed, Laila, Omar, Dina
const membersSquad2 = [USERS[2], USERS[5], USERS[6]]; // Ahmed, Nour, Youssef
const membersSquad3 = [USERS[3], USERS[4], USERS[7]]; // Laila, Omar, Dina

// Calculation Helpers
const getAvgRel = (members: User[]) => Math.round(members.reduce((acc, m) => acc + calculateReliability(m), 0) / members.length);
const getAvgRating = (members: User[]) => Number((members.reduce((acc, m) => acc + (m.rating || 0), 0) / members.length).toFixed(1));
const getTotalShifts = (members: User[]) => members.reduce((acc, m) => acc + (m.shiftsCompleted || 0), 0);

export const SQUADS: Squad[] = [
    {
        id: "sq_1",
        name: "The Zamalek Team",
        members: membersSquad1,
        averageReliability: getAvgRel(membersSquad1),
        averageRating: getAvgRating(membersSquad1),
        totalShiftsCompleted: getTotalShifts(membersSquad1),
        vibe: ["Tech Savvy", "Bilingual", "High Energy"]
    },
    {
        id: "sq_2",
        name: "Cairo Sales Force",
        members: membersSquad2,
        averageReliability: getAvgRel(membersSquad2),
        averageRating: getAvgRating(membersSquad2),
        totalShiftsCompleted: getTotalShifts(membersSquad2),
        vibe: ["Closers", "Aggressive", "Automotive Experts"]
    },
    {
        id: "sq_3",
        name: "Alexandria Ushers",
        members: membersSquad3,
        averageReliability: getAvgRel(membersSquad3),
        averageRating: getAvgRating(membersSquad3),
        totalShiftsCompleted: getTotalShifts(membersSquad3),
        vibe: ["Hospitality", "Premium", "Reliable"]
    }
];
