import prisma from "../../../../database/postgres"
import { ISimulationRepository } from "../interfaces/ISimulationRepository"
import type { TSimulationCreateDTO, TSimulationFindQuery, TSimulationUpdateDTO } from "../../dtos/SimulationDTO"
import { Simulation } from "@prisma/client";
import { DateUtils } from "../../../../utils/helpers/DateUtils/DateUtils";

export class SimulationRepository implements ISimulationRepository {
    private readonly repository = prisma.simulation

    async save(params: TSimulationCreateDTO): Promise<Simulation> {
        return this.repository.create({
            data: {
                name: params.name,
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                rate: Number(params.rate),
                familyMemberId: params.familyMemberId
            }
        })
    }

    async list(params: TSimulationFindQuery): Promise<Simulation[]> {
        return this.repository.findMany({
            where: {
                familyMemberId: params.familyMemberId
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async find(params: TSimulationFindQuery): Promise<Simulation> {
        return this.repository.findFirst({
            where: {
                AND: [
                    { id: params.id },
                    { familyMemberId: params.familyMemberId }
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async findAll(params: TSimulationFindQuery): Promise<Simulation[]> {
        return this.repository.findMany({
            where: {
                OR: [
                    { id: params.id },
                    { familyMemberId: params.familyMemberId }
                ]
            },
            orderBy: {
                createdAt: "desc"
            }
        })
    }

    async update(params: TSimulationUpdateDTO): Promise<Simulation> {
        return this.repository.update({
            where: {
                id: params.id,
                familyMemberId: params.familyMemberId
            },
            data: {
                name: params.name,
                dateStart: new Date(DateUtils.formatDate(params.dateStart, "YYYY-MM-DD")),
                rate: Number(params.rate)
            }
        })
    }

    async updateUpdatedAt(id: string): Promise<void> {
        await this.repository.update({
            where: {
                id: id
            },
            data: {
                updatedAt: new Date()
            }
        })
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete({
            where: {
                id: id
            }
        })
    }
}