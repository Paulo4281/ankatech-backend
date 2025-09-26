import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { AllocationService } from "../services/AllocationService"
import { TAllocationCreateDTO, TAllocationFindParamsDTO } from "../dtos/AllocationDTO"

export class AllocationController {
    async find(request: FastifyRequest, response: FastifyReply) {
        const service = container.resolve(AllocationService)
        const allocations = await service.find(request.query as TAllocationFindParamsDTO)
        return response.status(200).send(allocations)
    }

    async save(request: FastifyRequest, response: FastifyReply) {
        const service = container.resolve(AllocationService)
        console.log("a")
        await service.save(request.body as TAllocationCreateDTO)
        return response.status(201).send()
    }
}