import { inject, injectable } from "tsyringe"
import type { TInsuranceCreateDTO, TInsuranceFindParamsDTO, TInsuranceResponseDTO } from "../dtos/InsuranceDTO"
import { IInsuranceRepository } from "../repositories/interfaces/IInsuranceRepository"

@injectable()
export class InsuranceService {
    constructor(
        @inject("InsuranceRepository")
        private insuranceRepository: IInsuranceRepository
    ) {}

    async save(params: TInsuranceCreateDTO): Promise<void> {
        await this.insuranceRepository.save(params)
    }

    async find(params: TInsuranceFindParamsDTO): Promise<TInsuranceResponseDTO[]> {
        return this.insuranceRepository.find(params)
    }
}