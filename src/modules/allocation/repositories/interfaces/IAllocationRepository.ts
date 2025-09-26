import { Allocation } from "../../../../generated/prisma"
import { TAllocationCreateDTO, TAllocationFindParamsDTO } from "../../dtos/AllocationDTO"

interface IAllocationRepository {
    save(params: TAllocationCreateDTO): Promise<void>
    find(params: TAllocationFindParamsDTO): Promise<Allocation[]>
}

export type {
    IAllocationRepository
}