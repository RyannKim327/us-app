import Faslify, { fastify, RouteGenericInterface } from "fastify"
import websocket, { WebSocket } from "@fastify/websocket"
import cors from "@fastify/cors"
import { ormyx } from "ormyx"

import SocketControl from './websocket.ts'

import index from './endpoints'
import avatars from "./endpoints/avatars.ts"
import create_user from "./endpoints/create-user.ts"

const app = Faslify()
const db = ormyx("testmode", "us-app")
const PORT = 3000


// TODO: Cors setup
await app.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    'Content-Type', 'Authorization'
  ],
  credentials: true,
  maxAge: 86400
})


// TODO: To setup information about the used databased (ormyx)
db.create("users", {
  "id": "string",
  "avatar": "string",
  "username": "string",
  "password": "string"
}, {
  unique: "id",
  autoincrement: false
})

db.create("groups", {
  "owner": "string",
  "members": "string"
})

db.create("messages", {
  "message": "string",
  "user": "string",
  "group": "number"
})

db.create("reports", {
  "message": "number",
  "violation": "string"
})

// TODO: App Registry, endpoints and websockets
await app.register(websocket)

app.get("/", index)

app.get('/avatars', avatars)

app.post('/register', create_user)

app.get('/ws', { websocket: true }, (socket: WebSocket) => {
  SocketControl(socket, db)
})

await app.listen({ port: PORT }, (err, addr) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(`Running on ${addr}`)
})
