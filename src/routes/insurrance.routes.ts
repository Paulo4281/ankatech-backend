import { FastifyInstance } from "fastify"
import { z } from "zod"
import { InsuranceSchemaRequest, InsuranceSchemaResponse, InsuranceSchemaFindQuery } from "../modules/insurance/validations/InsuranceValidation"
import { InsuranceController } from "../modules/insurance/controllers/InsuranceController"

const insuranceController = new InsuranceController()

function InsuranceRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Insurance"],
                body: InsuranceSchemaRequest
            }
        },
        (request, response) => insuranceController.save(request, response)
    )
    app.get(
        "/",
        {
            schema: {
                tags: ["Insurance"],
                querystring: InsuranceSchemaFindQuery,
                response: {
                    200: z.array(InsuranceSchemaResponse)
                }
            }
        },
        (request, response) => insuranceController.find(request, response)
    )
}

export {
    InsuranceRoutes
}