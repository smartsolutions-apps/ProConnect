
import { Event } from '../types';

export const EVENTS: Event[] = [
  {
    id: "evt_cityscape",
    name: "Cityscape Egypt 2026",
    date: "Sep 20 - Sep 23, 2025",
    venue: "Egypt International Exhibition Center (EIEC)",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    description: "The biggest real estate event in Egypt. Connect with top developers and find the best investment opportunities. Hiring 200+ property consultants and ushers.",
    roles: ["Property Consultants", "Sales Reps", "Bilingual Hosts", "Crowd Management"],
    attendeeCount: 120,
    dailyRate: 750
  },
  {
    id: "evt_real_gate",
    name: "The Real Gate Exhibition 2026",
    date: "May 15 - May 18, 2026",
    venue: "Egypt International Exhibition Center (EIEC)",
    imageUrl: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?auto=format&fit=crop&w=800&q=80",
    description: "Focusing on luxury real estate and international investment. High demand for multilingual staff and VIP concierges.",
    roles: ["VIP Concierge", "Project Presenters", "Sales Support"],
    attendeeCount: 95,
    dailyRate: 900
  },
  {
    id: "evt_cairo_ict",
    name: "Cairo ICT 2026",
    date: "Nov 22 - Nov 25, 2025",
    venue: "Egypt International Exhibition Center (EIEC)",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80",
    description: "The leading technology exhibition in Africa and the Middle East. Hiring promoters, tech support, and registration staff.",
    roles: ["Tech Support", "Registration Staff", "Booth Ushers"],
    attendeeCount: 450,
    dailyRate: 500
  },
  {
    id: "evt_sahara",
    name: "Sahara Expo 2025",
    date: "Sep 10 - Sep 13, 2025",
    venue: "Cairo International Conference Centre (CICC)",
    imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80",
    description: "The international agricultural exhibition for Africa and the Middle East.",
    roles: ["Information Desk", "Logistics Support"],
    attendeeCount: 85,
    dailyRate: 400
  }
];
