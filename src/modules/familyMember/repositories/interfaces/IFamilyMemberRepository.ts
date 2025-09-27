import { FamilyMember } from "@prisma/client"

interface IFamilyMemberRepository {
    find(familyId: string): Promise<FamilyMember[]>
}

export type {
    IFamilyMemberRepository
}