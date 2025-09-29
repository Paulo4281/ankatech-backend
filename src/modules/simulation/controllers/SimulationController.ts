import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { SimulationService } from "../services/SimulationService"
import type { TSimulationCreateDTO, TSimulationUpdateDTO, TSimulationFindQuery } from "../dtos/SimulationDTO"

export class SimulationController {
    async save(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.save(request.body as TSimulationCreateDTO)
        return response.status(201).send(simulation)
    }

    async find(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.find(request.query as TSimulationFindQuery)
        console.log(simulation)
        return response.status(200).send(simulation)
    }

    async update(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.update(request.body as TSimulationUpdateDTO)
        return response.status(200).send(simulation)
    }
}