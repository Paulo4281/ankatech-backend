import prisma from "../../../../database/postgres"
import { IFamilyMemberRepository } from "../interfaces/IFamilyMemberRepository"
import { FamilyMember } from "@prisma/client"

export class FamilyMemberRepository implements IFamilyMemberRepository {
    private readonly repository = prisma.familyMember

    async find(familyId: string): Promise<FamilyMember[]> {
        return this.repository.findMany({
            where: {
                familyId
            }
        })
    }
}