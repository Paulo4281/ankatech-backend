import { z } from "zod"

const HeritageSchemaRequest = z.object({
    value: z.int({ error: "Campo 'value' é obrigatório" })
})

const HeritageSchemaResponse = z.object({
    id: z.string(),
    value: z.int(),
    createdAt: z.date()
})

export {
    HeritageSchemaRequest,
    HeritageSchemaResponse
}