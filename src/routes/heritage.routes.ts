import { FastifyInstance } from "fastify"
import { HeritageController } from "../modules/heritage/controllers/HeritageController"
import { HeritageSchemaRequest, HeritageSchemaResponse } from "../modules/heritage/validations/HeritageValidation"

const heritageController = new HeritageController()

function HeritageRoutes(app: FastifyInstance) {
  app.post(
    "/",
    {
      schema: {
        tags: ["Heritage"],
        body: HeritageSchemaRequest,
        response: {
          201: HeritageSchemaResponse
        }
      }
    },
    (request, response) => heritageController.save(request, response)
  )
}

export { HeritageRoutes }
