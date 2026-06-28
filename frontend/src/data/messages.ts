import type { Message } from "../interfaces";

export default <Message[]>[
  {
    id: 1,
    groupId: 1,
    userId: 2,
    content: "Hello everyone 👋",
    createdAt: "10:20 AM",
    replyTo: null,
    reports: 0,
    reactions: [
      {
        emoji: "👍",
        count: 3
      },
      {
        emoji: "❤️",
        count: 2
      }
    ]
  },
  {
    id: 2,
    groupId: 1,
    userId: 4,
    content: "Welcome to Us-APP!",
    createdAt: "10:22 AM",
    replyTo: 1,
    reports: 1,
    reactions: [
      {
        emoji: "🔥",
        count: 6
      }
    ]
  }
];
