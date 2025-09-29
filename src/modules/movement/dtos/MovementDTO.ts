import { z } from "zod"
import { MovementSchemaRequest, MovementSchemaResponse, MovementSchemaFindQuery } from "../validations/MovementValidation"

type TMovementCreateDTO = z.infer<typeof MovementSchemaRequest>
type TMovementResponseDTO = z.infer<typeof MovementSchemaResponse>

type TMovementFindParamsDTO = z.infer<typeof MovementSchemaFindQuery> & {
    dateStart?: Date
}

type MovementType = "earning" | "expense"
type MovementClass = "financial" | "fixed"
type MovementFrequency = "unique" | "monthly" | "yearly"
type MovementCategory = "credit" | "dependent" | "fixed"

export type {
    TMovementCreateDTO,
    TMovementResponseDTO,
    TMovementFindParamsDTO,
    MovementType,
    MovementClass,
    MovementFrequency,
    MovementCategory
}