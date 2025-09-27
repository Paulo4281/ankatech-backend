import { FastifyInstance } from "fastify"
import { z } from "zod"
import { FamilyMemberController } from "../modules/familyMember/controllers/FamilyMemberController"
import { FamilyMemberSchemaResponse, FamilyMemberFindParamsSchema } from "../modules/familyMember/validations/FamilyMemberValidation"

const familyMemberController = new FamilyMemberController()

function FamilyMemberRoutes(app: FastifyInstance) {
    app.get(
        "/",
        {
            schema: {
                tags: ["Family Member"],
                querystring: FamilyMemberFindParamsSchema,
                response: {
                    200: z.array(FamilyMemberSchemaResponse)
                }
            }
        },
        (request, response ) => familyMemberController.find(request, response)
    )
}

export {
    FamilyMemberRoutes
}