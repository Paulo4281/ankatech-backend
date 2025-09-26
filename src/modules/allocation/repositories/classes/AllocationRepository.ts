import prisma from "../../../../database/postgres"
import { IAllocationRepository } from "../interfaces/IAllocationRepository"
import { TAllocationCreateDTO, TAllocationFindParamsDTO } from "../../dtos/AllocationDTO"
import { ValueUtils } from "../../../../utils/helpers/ValueUtils/ValueUtils"
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils"
import { Allocation } from "@prisma/client"

export class AllocationRepository implements IAllocationRepository {
    private repository = prisma.allocation

    async save(params: TAllocationCreateDTO): Promise<void> {
        await this.repository.create({
            data: {
                title: params.title,
                value: ValueUtils.currencyToCentsInt(params.value),
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                installments: Number(params.installments),
                interestRate: Number(params.interestRate),
                entryValue: Number(params.entryValue),
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
                }
            }
        })
    }
}