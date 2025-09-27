import { z } from "zod"
import { AllocationTypeMapSchema } from "./AllocationTypeMapValidation"
import { AllocationRegistrySchemaResponse } from "../AllocationRegistry/AllocationRegistryValidation"

const AllocationTypes = [
    {
        value: "75679762-aaf6-4393-8113-03a9309f0add",
        label: "Imobilizada"
    },
    {
        value: "f8248cb3-0cb2-43ca-bd59-f803de603d1c",
        label: "Financiada"
    },
    {
        value: "983b8fee-1957-47a4-8785-8d4e1819137d",
        label: "Financeira Manual"
    }
]

const AllocationSchemaRequest = z.object({
    types: z.array(
        z.enum(
            AllocationTypes.map((type) => type.value)
        )
    ).nonempty({ error: "Campo 'types' é obrigatório" }),
    title: z.string().min(1, { error: "Campo 'title' é obrigatório" }),
    value: z.string().min(1, { error: "Campo 'value' é obrigatório" }),
    dateStart: z.string().min(1, { error: "Campo 'startDate' é obrigatório" }),
    
    dateEnd: z.string().optional(),
    installments: z.string().optional(),
    interestRate: z.string().optional(),
    entryValue: z.string().optional()
}).superRefine((data, ctx) => {
    if (data.types.includes("f8248cb3-0cb2-43ca-bd59-f803de603d1c")) {
        if (!data.dateEnd) {
        ctx.addIssue({ path: ["startDate"], code: "custom", message: "Campo 'startDate' é obrigatório" })
        }
        if (!data.installments) {
        ctx.addIssue({ path: ["installments"], code: "custom", message: "Campo 'installments' é obrigatório" })
        }
        if (!data.interestRate) {
        ctx.addIssue({ path: ["interestRate"], code: "custom", message: "Campo 'interestRate' é obrigatório" })
        }
        if (!data.entryValue) {
        ctx.addIssue({ path: ["entryValue"], code: "custom", message: "Campo 'entryValue' é obrigatório" })
        }
    }
})

const AllocationSchemaResponse = z.object({
    id: z.string(),
    title: z.string(),
    value: z.number(),
    dateStart: z.date(),
    dateEnd: z.date().nullable(),
    installments: z.number().nullable(),
    interestRate: z.number().nullable(),
    entryValue: z.number().nullable(),
    updatedAt: z.date().nullable(),
    createdAt: z.date(),
    types: z.array(AllocationTypeMapSchema),
    registries: z.array(AllocationRegistrySchemaResponse)
})

const AllocationSchemaFindQuery = z.object({
    allocationTypeId: z.preprocess(
        (val) => (typeof val === 'string' ? [val] : val),
        z.array(z.string()).nonempty({ error: "Campo 'allocationTypeId' é obrigatório" })
    )
})

export {
    AllocationSchemaRequest,
    AllocationSchemaResponse,
    AllocationSchemaFindQuery
}