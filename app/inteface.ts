export interface User {
  id: string
  username: string
  email: string
  avatar: string
  status: 'online' | 'offline' | 'away'
  statusText?: string
}

export interface Channel {
  id: string
  name: string
  description: string
  type: 'global' | 'group'
  createdById?: string
  createdAt: string
  memberCount: number
}

export interface Message {
  id: string
  channelId: string
  senderId: string
  senderName: string
  senderAvatar: string
  content: string
  timestamp: string // ISO string
  isSystem?: boolean
}

