import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { MovementService } from "../services/MovementService"
import type { TMovementCreateDTO, TMovementFindParamsDTO } from "../dtos/MovementDTO"

export class MovementController {
    async save(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(MovementService)
        await service.save(request.body as TMovementCreateDTO)
        return response.status(201).send()
    }

    async find(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(MovementService)
        const movements = await service.find(request.query as TMovementFindParamsDTO)
        return response.status(200).send(movements)
    }
}