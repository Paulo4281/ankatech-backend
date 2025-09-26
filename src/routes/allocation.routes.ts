import { FastifyInstance } from "fastify"
import { z } from "zod"
import { AllocationSchemaRequest, AllocationSchemaResponse, AllocationSchemaFindQuery } from "../modules/allocation/validations/AllocationValidation"
import { AllocationController } from "../modules/allocation/controllers/AllocationController"

const allocationController = new AllocationController()

function AllocationRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Allocation"],
        body: AllocationSchemaRequest,
        response: {
          201: AllocationSchemaResponse
        }
      }
    },
    (request, response) => allocationController.save(request, response)
  )

  app.get(
    "/",
    {
      schema: {
        tags: ["Allocation"],
        querystring: AllocationSchemaFindQuery,
        response: {
          200: z.array(AllocationSchemaResponse)
        },
      },
    },
    (request, response) => allocationController.find(request, response)
  )
}

export { AllocationRoutes }
