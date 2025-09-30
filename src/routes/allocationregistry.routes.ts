import { FastifyInstance } from "fastify"
import { AllocationRegistryController } from "../modules/allocation/controllers/AllocationRegistryController"
import { AllocationRegistrySchemaRequest, AllocationRegistrySchemaUpdateRequest } from "../modules/allocation/validations/AllocationRegistry/AllocationRegistryValidation"

const allocationRegistryController = new AllocationRegistryController()

function AllocationRegistryRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Allocation Registry"],
                body: AllocationRegistrySchemaRequest
            }
        },
        (request, response) => allocationRegistryController.save(request, response)
    )
    app.put(
        "/",
        {
            schema: {
                tags: ["Allocation Registry"],
                body: AllocationRegistrySchemaUpdateRequest
            }
        },
        (request, response) => allocationRegistryController.update(request, response)
    )
}

export {
    AllocationRegistryRoutes
}