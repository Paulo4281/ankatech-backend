import { z } from "zod"

const InsuranceSchemaRequest = z.object({
    type: z.string().min(1, { error: "Campo 'type' é obrigatório" }),
    title: z.string().min(1, { error: "Campo 'title' é obrigatório" }),
    value: z.string().min(1, { error: "Campo 'value' é obrigatório" }),
    dateStart: z.string().min(1, { error: "Campo 'dateStart' é obrigatório" }),
    duration: z.string().min(1, { error: "Campo 'duration' é obrigatório" }),
    prize: z.string().min(1, { error: "Campo 'prize' é obrigatório" }),
    familyMemberId: z.string().min(1, { error: "Campo 'familyMemberId' é obrigatório" })
})

const InsuranceSchemaResponse = z.object({
    id: z.string(),
    type: z.string(),
    title: z.string(),
    value: z.number(),
    dateStart: z.date(),
    duration: z.number(),
    prize: z.number(),
    familyMemberId: z.string(),
    createdAt: z.date()
})

const InsuranceSchemaFindQuery = z.object({
    familyMemberId: z.string()
})

export {
    InsuranceSchemaRequest,
    InsuranceSchemaResponse,
    InsuranceSchemaFindQuery
}