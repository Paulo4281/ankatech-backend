import { inject, injectable } from "tsyringe"
import type { TAllocationCreateDTO, TAllocationFindParamsDTO, TAllocationResponseDTO } from "../dtos/AllocationDTO"
import type { Allocation } from "../../../generated/prisma"
import { IAllocationRepository } from "../repositories/interfaces/IAllocationRepository"

@injectable()
export class AllocationService {
    constructor(
        @inject("AllocationRepository")
        private allocationRepository: IAllocationRepository
    ) {}

    async find(params: TAllocationFindParamsDTO): Promise<TAllocationResponseDTO[]> {
        return this.allocationRepository.find(params) as unknown as TAllocationResponseDTO[]
    }

    async save(params: TAllocationCreateDTO): Promise<void> {
        await this.allocationRepository.save(params)
    }
}