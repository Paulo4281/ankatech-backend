import prisma from "../../../../database/postgres"
import { IAllocationRepository } from "../interfaces/IAllocationRepository"
import { TAllocationCreateDTO, TAllocationFindParamsDTO } from "../../dtos/AllocationDTO"
import { ValueUtils } from "../../../../utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils"
import { Allocation } from "@prisma/client"

export class AllocationRepository implements IAllocationRepository {
    private readonly repository = prisma.allocation

    async save(params: TAllocationCreateDTO): Promise<void> {
        await this.repository.create({
            data: {
                title: params.title,
                value: ValueUtils.currencyToCentsInt(params.value),
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                dateEnd: params.dateEnd ? new Date(DateUtils.formatDate(params.dateEnd, "YYYY-MM-DD")) : null,
                installments: Number(params.installments || 0),
                interestRate: Number(params.interestRate || 0),
                entryValue: params.entryValue ? ValueUtils.currencyToCentsInt(params.entryValue) : null,
                familyMemberId: params.familyMemberId,
                types: {
                    create: params.types.map((typeId: string) => ({
                        allocationType: { connect: { id: typeId } }
                    }))
                }
            }
        })
    }

    async find(params: TAllocationFindParamsDTO): Promise<Allocation[]> {
        return this.repository.findMany({
            where: {
                familyMemberId: params.familyMemberId,
                types: {
                    some: {
                        allocationType: {
                            id: { in: params.allocationTypeId }
                        }
                    }
                }
            },
            include: {
                types: {
                    include: {
                        allocationType: true
                    }
                },
                registries: {
                    orderBy: {
                        date: "desc"
                    }
                }
            }
        })
    }

    async updateUpdatedAt(id: string): Promise<void> {
        await this.repository.update({
            where: {
                id
            },
            data: {
                updatedAt: new Date()
            }
        })
    }
}