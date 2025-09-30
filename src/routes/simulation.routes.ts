import { z } from "zod"
import { FastifyInstance } from "fastify"
import { SimulationSchemaFindQuery, SimulationSchemaListHistoryFindQuery, SimulationSchemaRequest, SimulationSchemaListHistoryResponse, SimulationSchemaResponse, SimulationSchemaUpdateRequest } from "../modules/simulation/validations/SimulationValidation"
import { SimulationController } from "../modules/simulation/controllers/SimulationController"

const simulationController = new SimulationController()

function SimulationRoutes(app: FastifyInstance) {
    app.post(
        "/",
        {
            schema: {
                tags: ["Simulation"],
                body: SimulationSchemaRequest,
                response: {
                    201: SimulationSchemaResponse
                }
            }
        },
        (request, response) => simulationController.save(request, response)
    )
    app.get(
        "/list-history",
        {
            schema: {
                tags: ["Simulation"],
                queryString: SimulationSchemaListHistoryFindQuery,
                response: {
                    200: z.array(SimulationSchemaListHistoryResponse)
                }
            }
        },
        (request, response) => simulationController.listHistory(request, response)
    )
    app.get(
        "/",
        {
            schema: {
                tags: ["Simulation"],
                querystring: SimulationSchemaFindQuery,
                response: {
                    200: SimulationSchemaResponse
                }
            }
        },
        (request, response) => simulationController.find(request, response)
    )
    app.put(
        "/",
        {
            schema: {
                tags: ["Simulation"],
                body: SimulationSchemaUpdateRequest,
                response: {
                    200: SimulationSchemaResponse
                }
            }
        },
        (request, response) => simulationController.update(request, response)
    )
    app.delete(
        "/:id",
        {
            schema: {
                tags: ["Simulation"]
            }
        },
        (request, response) => simulationController.deleteById(request, response)
    )
}

export {
    SimulationRoutes
}