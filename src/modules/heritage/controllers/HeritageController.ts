import { FastifyRequest, FastifyReply } from "fastify"
import { container } from "tsyringe"
import { HeritageService } from "../services/HeritageService"

export class HeritageController {
  async save(request: FastifyRequest, response: FastifyReply) {
    const service = container.resolve(HeritageService)
    const data = await service.save()
    response.status(204).send({ msg: "This is it!" })
  }
}
