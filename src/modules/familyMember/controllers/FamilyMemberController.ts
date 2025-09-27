import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { FamilyMemberService } from "../services/FamilyMemberService"
import { TFamilyMemberFindParams } from "../dtos/FamilyMemberDTO"

export class FamilyMemberController {
    async find(request: FastifyRequest, response: FastifyReply) {
        const { familyId } = request.query as TFamilyMemberFindParams
        const service = container.resolve(FamilyMemberService)
        const familyMembers = await service.find(familyId)
        return response.send(familyMembers)
    }
}