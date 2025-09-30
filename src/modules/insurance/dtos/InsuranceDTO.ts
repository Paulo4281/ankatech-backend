import { z } from "zod"
import { InsuranceSchemaRequest, InsuranceSchemaResponse, InsuranceSchemaFindQuery } from "../validations/InsuranceValidation"

type TInsuranceCreateDTO = z.infer<typeof InsuranceSchemaRequest>
type TInsuranceResponseDTO = z.infer<typeof InsuranceSchemaResponse>
type TInsuranceFindParamsDTO = z.infer<typeof InsuranceSchemaFindQuery>

export type {
    TInsuranceCreateDTO,
    TInsuranceResponseDTO,
    TInsuranceFindParamsDTO
}