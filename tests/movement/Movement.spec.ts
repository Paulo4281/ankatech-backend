import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { MovementRoutes } from "../../src/routes/movement.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { IMovementRepository } from "../../src/modules/movement/repositories/interfaces/IMovementRepository"

describe("GET /movement", () => {
    let app: ReturnType<typeof Fastify>

    const movementRepositoryMock: IMovementRepository = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<IMovementRepository>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(MovementRoutes, { prefix: "/movement" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return all movements", async () => {
        (movementRepositoryMock.find as jest.Mock).mockResolvedValueOnce([])

        const response = await supertest(app.server)
        .get("/movement?familyMemberId=0&class=financial,fixed")

        expect(response.body).toBeInstanceOf(Array)
    })
})

describe("POST /movement", () => {
    let app: ReturnType<typeof Fastify>

    const movementRepositoryMock: IMovementRepository = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<IMovementRepository>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(MovementRoutes, { prefix: "/movement" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should create a movement", async () => {
        (movementRepositoryMock.save as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .post("/movement")
        .send({
            title: "Salário",
            value: "500,00",
            dateStart: "2025-01-01",
            dateEnd: "2026-01-01",
            type: "earning",
            class: "financial",
            frequency: "monthly",
            category: "credit",
            familyMemberId: "0"
        })

        expect(response.status).toBe(201)
    })

})