import { FastifyInstance } from "fastify"
import { z } from "zod"
import { MovementController } from "../modules/movement/controllers/MovementController"
import { MovementSchemaRequest, MovementSchemaResponse, MovementSchemaFindQuery } from "../modules/movement/validations/MovementValidation"

const movementController = new MovementController()

function MovementRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Movement"],
                body: MovementSchemaRequest
            }
        },
        (request, response) => movementController.save(request, response)
    )
    app.get(
        "/",
        {
            schema: {
                tags: ["Movement"],
                querystring: MovementSchemaFindQuery,
                response: {
                    200: z.array(MovementSchemaResponse)
                }
            }
        },
        (request, response) => movementController.find(request, response)
    )
}

export {
    MovementRoutes
}