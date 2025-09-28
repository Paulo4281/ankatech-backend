import type { TInsuranceCreateDTO, TInsuranceFindParamsDTO } from "../../dtos/InsuranceDTO"
import { Insurance } from "@prisma/client"

interface IInsuranceRepository {
    save(params: TInsuranceCreateDTO): Promise<void>
    find(params: TInsuranceFindParamsDTO): Promise<Insurance[]>
}

export type {
    IInsuranceRepository
}