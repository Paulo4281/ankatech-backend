import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { InsuranceRoutes } from "../../src/routes/insurrance.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { IInsuranceRepository } from "../../src/modules/insurance/repositories/interfaces/IInsuranceRepository"

describe("POST /insurance", () => {
    let app: ReturnType<typeof Fastify>

    const insuranceRepositoryMock: IInsuranceRepository = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<IInsuranceRepository>("InsuranceRepository", {
            useValue: insuranceRepositoryMock
        })

        app = Fastify()
        app.register(InsuranceRoutes, { prefix: "/insurance" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should create an insurance", async () => {
        (insuranceRepositoryMock.save as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .post("/insurance")
        .send({
            type: "life",
            title: "Seguro de vida",
            value: "R$ 500,00",
            dateStart: "01/01/2025",
            duration: "12",
            prize: "R$ 750,00",
            familyMemberId: "0"
        })

        expect(response.statusCode).toBe(201)
    })
})

describe("GET /insurance", () => {
    let app: ReturnType<typeof Fastify>

    const insuranceRepositoryMock: IInsuranceRepository = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<IInsuranceRepository>("InsuranceRepository", {
            useValue: insuranceRepositoryMock
        })

        app = Fastify()
        app.register(InsuranceRoutes, { prefix: "/insurance" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return all insurances", async () => {
        (insuranceRepositoryMock.find as jest.Mock).mockResolvedValueOnce([])

        const response = await supertest(app.server)
        .get("/insurance?familyMemberId=0")

        expect(response.body).toBeInstanceOf(Array)
    })
})