import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { AllocationRegistryService } from "../services/AllocationRegistryService"
import type { TAllocationRegistryCreateDTO, TAllocationRegistryUpdateDTO } from "../dtos/AllocationRegistryDTO"

export class AllocationRegistryController {
    async save(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(AllocationRegistryService)
        await service.save(request.body as TAllocationRegistryCreateDTO)
        return response.status(201).send()
    }

    async update(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(AllocationRegistryService)
        await service.update(request.body as TAllocationRegistryUpdateDTO)
        return response.status(200).send()
    }
}