import type { TSimulationCreateDTO, TSimulationUpdateDTO, TSimulationFindQuery } from "../../dtos/SimulationDTO"
import { Simulation } from "@prisma/client"

interface ISimulationRepository {
    save(params: TSimulationCreateDTO): Promise<Simulation>
    list(params: TSimulationFindQuery): Promise<Simulation[]>
    find(params: TSimulationFindQuery): Promise<Simulation>
    findAll(params: TSimulationFindQuery): Promise<Simulation[]>
    update(params: TSimulationUpdateDTO): Promise<Simulation>
    updateUpdatedAt(id: string): Promise<void>
    deleteById(id: string): Promise<void>
}

export type {
    ISimulationRepository
}