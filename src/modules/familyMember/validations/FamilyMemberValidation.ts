import { z } from "zod"

const FamilyMemberFindParamsSchema = z.object({
    familyId: z.string().nonempty({ error: "Campo 'familyId' é obrigatório" })
})

const FamilyMemberSchemaResponse = z.object({
    id: z.string(),
    name: z.string(),
    familyId: z.string(),
    createdAt: z.date()
})

export {
    FamilyMemberSchemaResponse,
    FamilyMemberFindParamsSchema
}