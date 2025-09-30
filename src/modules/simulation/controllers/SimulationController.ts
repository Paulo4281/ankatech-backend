import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { SimulationService } from "../services/SimulationService"
import type { TSimulationCreateDTO, TSimulationUpdateDTO, TSimulationFindQuery, TSimulationListHistoryFindQuery } from "../dtos/SimulationDTO"

export class SimulationController {
    async save(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.save(request.body as TSimulationCreateDTO)
        return response.status(201).send(simulation)
    }

    async listHistory(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulationsHistory = await service.listHistory(request.query as TSimulationListHistoryFindQuery)
        return response.status(200).send(simulationsHistory)
    }

    async find(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.find(request.query as TSimulationFindQuery)
        return response.status(200).send(simulation)
    }

    async update(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(SimulationService)
        const simulation = await service.update(request.body as TSimulationUpdateDTO)
        return response.status(200).send(simulation)
    }

    async deleteById(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const { id } = request.params as { id: string }
        const service = container.resolve(SimulationService)
        await service.deleteById(id)
        return response.status(200).send()
    }
}