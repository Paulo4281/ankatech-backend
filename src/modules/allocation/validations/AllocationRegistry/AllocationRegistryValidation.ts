import { z } from "zod"

const AllocationRegistrySchemaRequest = z.object({
    date: z.string().min(1, { error: "Campo 'date' é obrigatório" }),
    value: z.string().min(1, { error: "Campo 'value' é obrigatório" }),
    allocationId: z.string().min(1, { error: "Campo 'allocationId' é obrigatório" })
})

const AllocationRegistrySchemaUpdateRequest = z.object({
    id: z.string().min(1, { error: "Campo 'id' é obrigatório" }),
    date: z.string().min(1, { error: "Campo 'date' é obrigatório" }),
    value: z.string().min(1, { error: "Campo 'value' é obrigatório" }),
    allocationId: z.string().min(1, { error: "Campo 'allocationId' é obrigatório" })
})

const AllocationRegistrySchemaResponse = z.object({
    id: z.string(),
    date: z.date(),
    value: z.number(),
    allocationId: z.string(),
    updatedAt: z.date().nullable(),
    createdAt: z.date()
})

export {
    AllocationRegistrySchemaRequest,
    AllocationRegistrySchemaResponse,
    AllocationRegistrySchemaUpdateRequest
}