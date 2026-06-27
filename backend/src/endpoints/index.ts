import { RouteGenericInterface } from "fastify";
import type { FastifyRequest, FastifyReply } from 'fastify'

export default function index(req: FastifyRequest<RouteGenericInterface>) {
  return {
    message: "This is a keep alive call of duty"
  }
}
