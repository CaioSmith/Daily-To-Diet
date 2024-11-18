import { FastifyReply, FastifyRequest } from "fastify";

export async function checkSessionIdExists(request: FastifyRequest, reply: FastifyReply){
    let sessionId = await request.cookies.sessionId

    if(!sessionId) {
        return reply.status(401).send(
            {
                message: "User not authorized to access this service"
            }
        )
    }
}