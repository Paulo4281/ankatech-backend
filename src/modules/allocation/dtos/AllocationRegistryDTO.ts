import { z } from "zod"
import { AllocationRegistrySchemaRequest, AllocationRegistrySchemaResponse, AllocationRegistrySchemaUpdateRequest } from "../validations/AllocationRegistry/AllocationRegistryValidation"

type TAllocationRegistryCreateDTO = z.infer<typeof AllocationRegistrySchemaRequest>
type TAllocationRegistryResponseDTO = z.infer<typeof AllocationRegistrySchemaResponse>

type TAllocationRegistryUpdateDTO = z.infer<typeof AllocationRegistrySchemaUpdateRequest>

export type {
    TAllocationRegistryCreateDTO,
    TAllocationRegistryResponseDTO,
    TAllocationRegistryUpdateDTO
}