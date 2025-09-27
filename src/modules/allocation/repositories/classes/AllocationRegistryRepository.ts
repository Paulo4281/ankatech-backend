import prisma from "../../../../database/postgres"
import { IAllocationRegistryRepository } from "../interfaces/IAllocationRegistryRepository"
import { TAllocationRegistryCreateDTO, TAllocationRegistryUpdateDTO } from "../../dtos/AllocationRegistryDTO"
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "../../../../utils/helpers/ValueUtils/ValueUtils"

export class AllocationRegistryRepository implements IAllocationRegistryRepository {
    private repository = prisma.allocationRegistry

    async save(params: TAllocationRegistryCreateDTO): Promise<void> {
        await this.repository.create({
            data: {
                date: new Date(DateUtils.formatDate(params.date, "YYYY-MM-DD")),
                value: ValueUtils.currencyToCentsInt(params.value),
                allocationId: params.allocationId
            }
        })
    }

    async update(params: TAllocationRegistryUpdateDTO): Promise<void> {
        await this.repository.update({
            where: {
                id: params.id,
                allocationId: params.allocationId
            },
            data: {
                date: new Date(DateUtils.formatDate(params.date, "YYYY-MM-DD")),
                value: ValueUtils.currencyToCentsInt(params.value)
            }
        })
    }
}