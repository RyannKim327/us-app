export interface User {
  id: number;
  avatar: string;
  username: string;
  online: boolean;
  role: "admin" | "member";
}

export interface Group {
  id: number;
  emoji: string;
  name: string;
  description: string;
  createdAt: string;
  adminId: number;
}

export interface Reaction {
  emoji: string;
  count: number;
}

export interface Message {
  id: number;
  groupId: number;
  userId: number;
  content: string;
  createdAt: string;
  replyTo: number | null;
  reactions: Reaction[];
  reports: number;
}

export interface Report {
  id: number;
  messageId: number;
  reporterId: number;
  reason: string;
  createdAt: string;
}
