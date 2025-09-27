import { inject, injectable } from "tsyringe"
import type { TAllocationCreateDTO, TAllocationFindParamsDTO, TAllocationResponseDTO } from "../dtos/AllocationDTO"
import { IAllocationRepository } from "../repositories/interfaces/IAllocationRepository"

@injectable()
export class AllocationService {
    constructor(
        @inject("AllocationRepository")
        private allocationRepository: IAllocationRepository
    ) {}

    async find(params: TAllocationFindParamsDTO): Promise<TAllocationResponseDTO[]> {
        const parsedAllocationTypes = params.allocationTypeId[0]?.split(",")

        const allocations = await this.allocationRepository.find({
            allocationTypeId: parsedAllocationTypes
        }) as TAllocationResponseDTO[]

        allocations.forEach((allocation) => {
            if (allocation.registries?.length) {
                allocation.value += allocation.registries.reduce((total, registry) => total += registry.value, 0)
            }
        })

        return allocations
    }

    async save(params: TAllocationCreateDTO): Promise<void> {
        await this.allocationRepository.save(params)
    }
}