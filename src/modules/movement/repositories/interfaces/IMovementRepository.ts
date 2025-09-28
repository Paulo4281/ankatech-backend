import type { TMovementCreateDTO, TMovementFindParamsDTO } from "../../dtos/MovementDTO"
import { Movement } from "@prisma/client"

interface IMovementRepository {
    save(params: TMovementCreateDTO): Promise<void>
    find(params: TMovementFindParamsDTO): Promise<Movement[]>
}

export type {
    IMovementRepository
}