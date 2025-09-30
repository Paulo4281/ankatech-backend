import { z } from "zod"

const SimulationSchemaRequest = z.object({
    name: z.string().min(1, { error: "Campo 'name' é obrigatório" }),
    dateStart: z.string().min(1, { error: "Campo 'dateStart' é obrigatório" }),
    rate: z.union([
        z.string().min(1, { error: "Campo 'rate' é obrigatório" }),
        z.number().min(1, { error: "Campo 'rate' é obrigatório" })
    ]),
    familyMemberId: z.string().min(1, { error: "Campo 'familyMemberId' é obrigatório" })
})

const SimulationSchemaUpdateRequest = z.object({
    id: z.union([
        z.string().min(1, { error: "Campo 'id' é obrigatório" }),
        z.null()
    ]),
    name: z.string().min(1, { error: "Campo 'name' é obrigatório" }),
    dateStart: z.string().min(1, { error: "Campo 'dateStart' é obrigatório" }),
    rate: z.union([
        z.string().min(1, { error: "Campo 'rate' é obrigatório" }),
        z.number().min(1, { error: "Campo 'rate' é obrigatório" })
    ]),
    familyMemberId: z.string().min(1, { error: "Campo 'familyMemberId' é obrigatório" })
})

const SimulationSchemaListHistoryResponse = z.object({
    id: z.string(),
    name: z.string(),
    dateStart: z.date(),
    rate: z.number(),
    familyMemberId: z.string(),
    updatedAt: z.date().nullable(),
    createdAt: z.date(),
})

const SimulationSchemaResponse = z.object({
    id: z.string(),
    name: z.string(),
    dateStart: z.date(),
    rate: z.number(),
    familyMemberId: z.string(),
    updatedAt: z.date().nullable(),
    createdAt: z.date(),
    chartInfo: z.record(
        z.string(),
        z.object({
            original: z.number(),
            current: z.number(),
            done: z.number(),
        })
    ).nullable().optional()
}).nullable()

const SimulationSchemaListHistoryFindQuery = z.object({
    familyMemberId: z.string()
})

const SimulationSchemaFindQuery = z.object({
    familyMemberId: z.string(),
    id: z.string().nullable(),
    status: z.string().nullable()
})

export {
    SimulationSchemaFindQuery,
    SimulationSchemaRequest,
    SimulationSchemaResponse,
    SimulationSchemaUpdateRequest,
    SimulationSchemaListHistoryFindQuery,
    SimulationSchemaListHistoryResponse
}