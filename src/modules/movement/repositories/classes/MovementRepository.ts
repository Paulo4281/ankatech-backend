import prisma from "../../../../database/postgres"
import { IMovementRepository } from "../interfaces/IMovementRepository"
import type { TMovementCreateDTO, TMovementFindParamsDTO, MovementType, MovementFrequency, MovementCategory, MovementClass } from "../../dtos/MovementDTO"
import { Movement } from "@prisma/client"
import { ValueUtils } from "../../../../utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils"

export class MovementRepository implements IMovementRepository {
    private readonly repository = prisma.movement

    async save(params: TMovementCreateDTO): Promise<void> {
        await this.repository.create({
            data: {
                title: params.title,
                value: ValueUtils.currencyToCentsInt(params.value),
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                dateEnd: params.dateEnd ? new Date(DateUtils.formatDate(params.dateEnd, "YYYY-MM-DD")) : null,
                type: params.type as MovementType,
                class: params.class as MovementClass,
                frequency: params.frequency as MovementFrequency,
                category: params.category as MovementCategory,
                familyMemberId: params.familyMemberId
            }
        })
    }

    async find(params: TMovementFindParamsDTO): Promise<Movement[]> {
        return this.repository.findMany({
            where: {
                class: { in: params.class as MovementClass[] },
                familyMemberId: params.familyMemberId
            }
        })
    }
}