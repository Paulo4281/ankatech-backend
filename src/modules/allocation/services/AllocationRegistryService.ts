import { inject, injectable } from "tsyringe"
import { IAllocationRegistryRepository } from "../repositories/interfaces/IAllocationRegistryRepository"
import { TAllocationRegistryCreateDTO, TAllocationRegistryUpdateDTO } from "../dtos/AllocationRegistryDTO"

@injectable()
export class AllocationRegistryService {
    constructor(
        @inject("AllocationRegistryRepository")
        private allocationRegistryRepository: IAllocationRegistryRepository
    ) {}

    async save(params: TAllocationRegistryCreateDTO): Promise<void> {
        await this.allocationRegistryRepository.save(params)
    }

    async update(params: TAllocationRegistryUpdateDTO): Promise<void> {
        await this.allocationRegistryRepository.update(params)
    }
}