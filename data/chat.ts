
import { ChatMessage } from '../types';
import { USERS, COMPANIES } from './index';

export const CHAT_HISTORY: ChatMessage[] = [
  {
    id: 'msg_1',
    senderId: COMPANIES[0].id, // Vodafone
    senderName: 'Command Center (Admin)',
    role: 'admin',
    type: 'broadcast',
    content: '🚨 URGENT: Gate 4 is currently overwhelmed. We need 3 ushers from Hall 2 to redeploy immediately.',
    timestamp: '09:15 AM',
    avatarUrl: COMPANIES[0].logoUrl
  },
  {
    id: 'msg_2',
    senderId: USERS[2].id, // Ahmed
    senderName: USERS[2].name,
    role: 'user',
    type: 'message',
    content: 'I am at Hall 2, moving to Gate 4 now.',
    timestamp: '09:17 AM',
    avatarUrl: USERS[2].avatarUrl
  },
  {
    id: 'msg_3',
    senderId: USERS[3].id, // Laila
    senderName: USERS[3].name,
    role: 'user',
    type: 'message',
    content: 'Security is asking for the special VIP badges for the delegation. Where are they?',
    timestamp: '09:20 AM',
    avatarUrl: USERS[3].avatarUrl
  },
  {
    id: 'msg_4',
    senderId: COMPANIES[0].id,
    senderName: 'Sarah (Admin)',
    role: 'admin',
    type: 'message',
    content: '@Laila They are with Mahmoud at the Registration Desk. Tell security to radio him.',
    timestamp: '09:21 AM',
    avatarUrl: USERS[1].avatarUrl // Sarah (HR Director)
  },
  {
    id: 'msg_5',
    senderId: USERS[0].id, // Mohamed (Me)
    senderName: USERS[0].name,
    role: 'user',
    type: 'message',
    content: 'Shift A checked in completely. We are ready at the main booth.',
    timestamp: '09:30 AM',
    avatarUrl: USERS[0].avatarUrl
  },
  {
    id: 'msg_6',
    senderId: COMPANIES[0].id,
    senderName: 'Command Center (Admin)',
    role: 'admin',
    type: 'broadcast',
    content: '🍱 LUNCH BREAK UPDATE: Group A break starts at 12:00 PM. Group B at 1:00 PM. Pick up vouchers from the supervisor.',
    timestamp: '11:00 AM',
    avatarUrl: COMPANIES[0].logoUrl
  }
];
