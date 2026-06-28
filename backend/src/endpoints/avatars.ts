import { FastifyRequest, RouteGenericInterface } from "fastify";
import _avatars from "./../data/avatars"

export default function avatars(request: FastifyRequest<RouteGenericInterface>) {
  return _avatars
}
