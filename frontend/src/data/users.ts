import type { User } from "../interfaces.ts";

export default <User[]>[
  {
    id: 1,
    avatar: "😎",
    username: "Kimmy",
    online: true,
    role: "admin"
  },
  {
    id: 2,
    avatar: "🤖",
    username: "DevBot",
    online: true,
    role: "member"
  },
  {
    id: 3,
    avatar: "🐱",
    username: "Luna",
    online: false,
    role: "member"
  },
  {
    id: 4,
    avatar: "🦊",
    username: "Fox",
    online: true,
    role: "member"
  }
];
