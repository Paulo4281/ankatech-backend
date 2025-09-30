import { z } from "zod"

const MovementSchemaRequest = z.object({
    title: z.string().min(1, { error: "Campo 'title' é obrigatório" }),
    value: z.string().min(1, { error: "Campo 'value' é obrigatório" }),
    dateStart: z.string().min(1, { error: "Campo 'dateStart' é obrigatório" }),
    type: z.string().min(1, { error: "Campo 'type' é obrigatório" }),
    class: z.string().min(1, { error: "Campo 'class' é obrigatório" }),
    frequency: z.string().min(1, { error: "Campo 'frequency' é obrigatório" }),
    category: z.string().min(1, { error: "Campo 'category' é obrigatório" }),
    familyMemberId: z.string().min(1, { error: "Campo 'familyMemberId' é obrigatório" }),

    dateEnd: z.string().nullable()
})

const MovementSchemaResponse = z.object({
    id: z.string(),
    title: z.string(),
    value: z.number(),
    dateStart: z.date(),
    dateEnd: z.date().nullable(),
    type: z.string(),
    class: z.string(),
    frequency: z.string(),
    category: z.string(),
    familyMemberId: z.string(),
    createdAt: z.date()
})

const MovementSchemaFindQuery = z.object({
    familyMemberId: z.string(),
    class: z.preprocess(
        (value) => (typeof value === "string" ? [value] : value),
        z.array(z.string()).nonempty({ error: "Campo 'class' é obrigatório" })
    )
})

export {
    MovementSchemaRequest,
    MovementSchemaResponse,
    MovementSchemaFindQuery
}