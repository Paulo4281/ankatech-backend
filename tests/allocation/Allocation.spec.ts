import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { AllocationRoutes } from "../../src/routes/allocation.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { IAllocationRepository } from "../../src/modules/allocation/repositories/interfaces/IAllocationRepository"

describe("POST /allocation", () => {
    let app: ReturnType<typeof Fastify>

    const allocationRepositoryMock: IAllocationRepository = {
        save: jest.fn(),
        find: jest.fn(),
        updateUpdatedAt: jest.fn()
    }

    beforeAll(async () => {
        container.register<IAllocationRepository>("AllocationRepository", {
            useValue: allocationRepositoryMock
        })

        app = Fastify()
        app.register(AllocationRoutes, { prefix: "/allocation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should create an allocation", async () => {
        (allocationRepositoryMock.save as jest.Mock).mockResolvedValueOnce({})

        const response = await supertest(app.server)
        .post("/allocation")
        .send({
            types: ["f8248cb3-0cb2-43ca-bd59-f803de603d1c"],
            title: "CDB Banco HCBC",
            value: "R$ 500,00",
            dateStart: "01/01/2025",
            familyMemberId: "0",
            dateEnd: "01/01/2026",
            installments: "12",
            interestRate: "5",
            entryValue: "R$ 100,00"
        })

        expect(response.statusCode).toBe(201)
    })
})

describe("GET /allocation", () => {
    let app: ReturnType<typeof Fastify>

    const allocationRepositoryMock: IAllocationRepository = {
        save: jest.fn(),
        find: jest.fn(),
        updateUpdatedAt: jest.fn()
    }

    beforeAll(async () => {
        container.register<IAllocationRepository>("AllocationRepository", {
            useValue: allocationRepositoryMock
        })

        app = Fastify()
        app.register(AllocationRoutes, { prefix: "/allocation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return all allocations", async () => {
        (allocationRepositoryMock.find as jest.Mock).mockResolvedValueOnce([])
        
        const response = await supertest(app.server)
        .get("/allocation?familyMemberId=0&allocationTypeId=1")

        expect(response.body).toBeInstanceOf(Array)
    })
})