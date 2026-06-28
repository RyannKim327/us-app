import { FastifyRequest, RouteGenericInterface } from "fastify";

export default function create_user(request: FastifyRequest<RouteGenericInterface>) {
  const body = request.body
  return {
    user: body.user ?? "No user"
  }
}
