import Faslify, { RouteGenericInterface } from "fastify"
import websocket, { WebSocket } from "@fastify/websocket"
import { ormyx } from "ormyx"

import SocketControl from './websocket.ts'

import index from './endpoints'

const app = Faslify()
const db = ormyx("testmode", "db.ormyx")
const PORT = 3000

db.create("users", {
  "id": "string",
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

await app.register(websocket)

app.get("/", index)

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
