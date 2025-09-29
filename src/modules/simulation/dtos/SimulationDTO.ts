import { z } from "zod"
import { SimulationSchemaFindQuery, SimulationSchemaRequest, SimulationSchemaResponse, SimulationSchemaUpdateRequest } from "../validations/SimulationValidation"

type TSimulationCreateDTO = z.infer<typeof SimulationSchemaRequest>
type TSimulationUpdateDTO = z.infer<typeof SimulationSchemaUpdateRequest>
type TSimulationFindQuery = z.infer<typeof SimulationSchemaFindQuery>
type TSimulationResponse = z.infer<typeof SimulationSchemaResponse>

export type {
    TSimulationCreateDTO,
    TSimulationUpdateDTO,
    TSimulationFindQuery,
    TSimulationResponse
}