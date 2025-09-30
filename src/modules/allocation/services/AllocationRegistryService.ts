import { inject, injectable } from "tsyringe"
import { IAllocationRegistryRepository } from "../repositories/interfaces/IAllocationRegistryRepository"
import { TAllocationRegistryCreateDTO, TAllocationRegistryUpdateDTO } from "../dtos/AllocationRegistryDTO"
import { IAllocationRepository } from "../repositories/interfaces/IAllocationRepository"

@injectable()
export class AllocationRegistryService {
    constructor(
        @inject("AllocationRegistryRepository")
        private allocationRegistryRepository: IAllocationRegistryRepository,
        @inject("AllocationRepository")
        private allocationRepository: IAllocationRepository
    ) {}

    async save(params: TAllocationRegistryCreateDTO): Promise<void> {
        await this.allocationRegistryRepository.save(params)
        
        await this.allocationRepository.updateUpdatedAt(params.allocationId)
    }

    async update(params: TAllocationRegistryUpdateDTO): Promise<void> {
        await this.allocationRegistryRepository.update(params)

        await this.allocationRepository.updateUpdatedAt(params.allocationId)
    }
}