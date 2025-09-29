import { inject, injectable } from "tsyringe"
import type { TSimulationResponse, TSimulationUpdateDTO, TSimulationCreateDTO, TSimulationFindQuery } from "../dtos/SimulationDTO"
import { ISimulationRepository } from "../repositories/interfaces/ISimulationRepository"
import { Simulation } from "@prisma/client"
import { IMovementRepository } from "../../movement/repositories/interfaces/IMovementRepository"
import { DateUtils } from "../../../utils/helpers/DateUtils/DateUtils"
import { ValueUtils } from "../../../utils/helpers/ValueUtils/ValueUtils"

@injectable()
export class SimulationService {
    constructor(
        @inject("SimulationRepository")
        private simulationRepository: ISimulationRepository,
        @inject("MovementRepository")
        private movementRepository: IMovementRepository
    ) {}

    async save(params: TSimulationCreateDTO): Promise<Simulation> {
        if (!params.rate) {
            params.rate = 4
        }

        const simulation = await this.simulationRepository.save(params)
        return simulation
    }

    async find(params: TSimulationFindQuery): Promise<TSimulationResponse> {
        const simulationInfo = await this.simulationRepository.find(params)

        const dateStart = simulationInfo.dateStart
        const rate = simulationInfo.rate

        const movements = await this.movementRepository.find({
            familyMemberId: params.familyMemberId,
            class: ["financial", "fixed"],
            dateStart: dateStart
        })

        const chartInfo: { [key: string]: { original: number, current: number, done: number } } = {
            "2025": { original: 0, current: 0, done: 0 },
            "2030": { original: 0, current: 0, done: 0 },
            "2035": { original: 0, current: 0, done: 0 },
            "2040": { original: 0, current: 0, done: 0 },
            "2045": { original: 0, current: 0, done: 0 },
            "2050": { original: 0, current: 0, done: 0 },
            "2055": { original: 0, current: 0, done: 0 },
            "2060": { original: 0, current: 0, done: 0 },
        }

        movements.forEach((movement) => {
            const yearStart = DateUtils.getYear(movement.dateStart)
            const yearEnd = movement.dateEnd ? DateUtils.getYear(movement.dateEnd) : yearStart

            const baseValue = movement.type === "earning" ? movement.value : -movement.value

            const closestStart = DateUtils.getClosestYear(yearStart, Object.keys(chartInfo).map(Number))
            const closestEnd = DateUtils.getClosestYear(yearEnd, Object.keys(chartInfo).map(Number))

            if (movement.frequency === "unique") {
                chartInfo[closestStart].original += baseValue
                chartInfo[closestStart].current += baseValue
                chartInfo[closestStart].done += baseValue
            } else if (movement.frequency === "monthly") {
                const months = DateUtils.howMuchTimeFromXInPeriod(movement.dateStart, movement.dateEnd, "monthly")
                const total = baseValue * months
                chartInfo[closestEnd].original += total
                chartInfo[closestEnd].current += total
                chartInfo[closestEnd].done += total
            } else if (movement.frequency === "yearly") {
                const years = DateUtils.howMuchTimeFromXInPeriod(movement.dateStart, movement.dateEnd, "yearly")
                const total = baseValue * years
                chartInfo[closestEnd].original += total
                chartInfo[closestEnd].current += total
                chartInfo[closestEnd].done += total
            }
        })

        let prevOriginal = 0
        let prevCurrent = 0
        let prevDone = 0

        Object.keys(chartInfo)
        .forEach((year, index) => {
            const originalByFive = index == 1 ? chartInfo[year].original / 5 : prevOriginal / 5
            const fivePercentOfOriginalByFive = ValueUtils.getValueByPercentage(5, originalByFive)

            chartInfo[year].original += Number((prevOriginal + (fivePercentOfOriginalByFive * rate)).toFixed(2))

            chartInfo[year].current += prevCurrent
            chartInfo[year].done += prevDone

            prevOriginal = chartInfo[year].original
            prevCurrent = chartInfo[year].current
            prevDone = chartInfo[year].done
        })

        return {
            ...simulationInfo,
            chartInfo: chartInfo
        }
    }

    async update(params: TSimulationUpdateDTO): Promise<TSimulationResponse> {
        let simulation: Simulation
        if (!params.id) {
            simulation = await this.save({
                name: params.name,
                dateStart: params.dateStart,
                rate: params.rate,
                familyMemberId: params.familyMemberId
            })
        } else {
            simulation = await this.simulationRepository.update(params)
            await this.simulationRepository.updateUpdatedAt(params.id)
        }


        return simulation
    }
}