import prisma from "../../../../database/postgres"
import { IInsuranceRepository } from "../interfaces/IInsuranceRepository"
import type { TInsuranceCreateDTO, TInsuranceResponseDTO, TInsuranceFindParamsDTO } from "../../dtos/InsuranceDTO"
import { Insurance } from "@prisma/client"
import { ValueUtils } from "../../../../utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils"

export class InsuranceRepository implements IInsuranceRepository {
    private readonly repository = prisma.insurance

    async save(params: TInsuranceCreateDTO): Promise<void> {
        await this.repository.create({
            data: {
                type: params.type as Insurance["type"],
                title: params.title,
                value: ValueUtils.currencyToCentsInt(params.value),
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                duration: Number(params.duration || 0),
                prize: ValueUtils.currencyToCentsInt(params.prize),
                familyMemberId: params.familyMemberId
            }
        })
    }

    async find(params: TInsuranceFindParamsDTO): Promise<Insurance[]> {
        return this.repository.findMany({
            where: {
                familyMemberId: params.familyMemberId
            }
        })
    }
}