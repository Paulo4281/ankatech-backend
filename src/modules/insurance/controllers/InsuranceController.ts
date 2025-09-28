import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { InsuranceService } from "../services/InsuranceService"
import type { TInsuranceCreateDTO, TInsuranceFindParamsDTO } from "../dtos/InsuranceDTO"

export class InsuranceController {
    async save(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(InsuranceService)
        await service.save(request.body as TInsuranceCreateDTO)
        return response.status(201).send()
    }

    async find(request: FastifyRequest, response: FastifyReply): Promise<FastifyReply> {
        const service = container.resolve(InsuranceService)
        const insurances = await service.find(request.query as TInsuranceFindParamsDTO)
        return response.status(200).send(insurances)
    }
}