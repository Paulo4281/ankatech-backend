import { z } from "zod"
import { HeritageSchemaRequest, HeritageSchemaResponse } from "../validations/HeritageValidation"

type THeritageCreate = z.infer<typeof HeritageSchemaRequest>

type THeritageResponse = z.infer<typeof HeritageSchemaResponse>

export type {
    THeritageCreate,
    THeritageResponse
}