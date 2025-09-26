import { z } from "zod"
import { AllocationSchemaRequest, AllocationSchemaResponse, AllocationSchemaFindQuery } from "../validations/AllocationValidation"

type TAllocationCreateDTO = z.infer<typeof AllocationSchemaRequest>
type TAllocationResponseDTO = z.infer<typeof AllocationSchemaResponse>

type TAllocationFindParamsDTO = z.infer<typeof AllocationSchemaFindQuery>

export type {
    TAllocationCreateDTO,
    TAllocationResponseDTO,
    TAllocationFindParamsDTO
}
