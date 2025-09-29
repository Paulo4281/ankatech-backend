import { inject, injectable } from "tsyringe"
import type { TSimulationResponse, TSimulationUpdateDTO, TSimulationCreateDTO, TSimulationFindQuery } from "../dtos/SimulationDTO"
import { ISimulationRepository } from "../repositories/interfaces/ISimulationRepository"
import { Simulation } from "@prisma/client"

@injectable()
export class SimulationService {
    constructor(
        @inject("SimulationRepository")
        private simulationRepository: ISimulationRepository
    ) {}

    async save(params: TSimulationCreateDTO): Promise<Simulation> {
        const simulation = await this.simulationRepository.save(params)
        return simulation
    }

    async find(params: TSimulationFindQuery): Promise<TSimulationResponse> {
        return this.simulationRepository.find(params)
    }

    async update(params: TSimulationUpdateDTO): Promise<TSimulationResponse> {
        let simulation: Simulation
        if (!params.id) {
            simulation = await this.save({
                name: params.name,
                dateStart: params.dateStart,
                rate: params.rate,
                familyMemberId: params.familyMemberId
            })
        } else {
            simulation = await this.simulationRepository.update(params)
            await this.simulationRepository.updateUpdatedAt(params.id)
        }


        return simulation
    }
}