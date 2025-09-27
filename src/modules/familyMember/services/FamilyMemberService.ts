import { inject, injectable } from "tsyringe"
import { IFamilyMemberRepository } from "../repositories/interfaces/IFamilyMemberRepository"

@injectable()
export class FamilyMemberService {
    constructor(
        @inject("FamilyMemberRepository")
        private familyMemberRepository: IFamilyMemberRepository
    ) {}

    async find(familyId: string): Promise<any> {
        return this.familyMemberRepository.find(familyId)
    }
}