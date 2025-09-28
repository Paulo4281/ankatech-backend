import { inject, injectable } from "tsyringe"
import type { TMovementCreateDTO, TMovementResponseDTO, TMovementFindParamsDTO } from "../dtos/MovementDTO"
import { IMovementRepository } from "../repositories/interfaces/IMovementRepository"

@injectable()
export class MovementService {
    constructor(
        @inject("MovementRepository")
        private movementRepository: IMovementRepository
    ) {}

    async save(params: TMovementCreateDTO): Promise<void> {
        await this.movementRepository.save(params)
    }

    async find(params: TMovementFindParamsDTO): Promise<TMovementResponseDTO[]> {
        return this.movementRepository.find(params)
    }
}