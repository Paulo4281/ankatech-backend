import type { TAllocationRegistryCreateDTO, TAllocationRegistryUpdateDTO } from "../../dtos/AllocationRegistryDTO"

interface IAllocationRegistryRepository {
    save(params: TAllocationRegistryCreateDTO): Promise<void>
    update(params: TAllocationRegistryUpdateDTO): Promise<void>
}

export type {
    IAllocationRegistryRepository
}