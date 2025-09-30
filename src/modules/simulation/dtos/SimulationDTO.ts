import { z } from "zod"
import { SimulationSchemaFindQuery, SimulationSchemaRequest, SimulationSchemaResponse, SimulationSchemaUpdateRequest, SimulationSchemaListHistoryFindQuery } from "../validations/SimulationValidation"

type TSimulationCreateDTO = z.infer<typeof SimulationSchemaRequest>
type TSimulationUpdateDTO = z.infer<typeof SimulationSchemaUpdateRequest>
type TSimulationFindQuery = z.infer<typeof SimulationSchemaFindQuery>
type TSimulationResponse = z.infer<typeof SimulationSchemaResponse>
type TSimulationListHistoryFindQuery = z.infer<typeof SimulationSchemaListHistoryFindQuery>

export type {
    TSimulationCreateDTO,
    TSimulationUpdateDTO,
    TSimulationFindQuery,
    TSimulationResponse,
    TSimulationListHistoryFindQuery
}