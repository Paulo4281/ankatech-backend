import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { AllocationRegistryRoutes } from "../../src/routes/allocationregistry.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { IAllocationRegistryRepository } from "../../src/modules/allocation/repositories/interfaces/IAllocationRegistryRepository"
import { IAllocationRepository } from "../../src/modules/allocation/repositories/interfaces/IAllocationRepository"

describe("POST /allocation-registry", () => {
    let app: ReturnType<typeof Fastify>

    const allocationRegistryRepositoryMock: IAllocationRegistryRepository = {
        save: jest.fn(),
        update: jest.fn()
    }

    const allocationRepositoryMock: Partial<IAllocationRepository> = {
        updateUpdatedAt: jest.fn()
    }

    beforeAll(async () => {
        container.register<IAllocationRegistryRepository>("AllocationRegistryRepository", {
            useValue: allocationRegistryRepositoryMock
        })
        container.register<Partial<IAllocationRepository>>("AllocationRepository", {
            useValue: allocationRepositoryMock
        })

        app = Fastify()
        app.register(AllocationRegistryRoutes, { prefix: "/allocation-registry" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should create an allocation registry", async () => {
        (allocationRegistryRepositoryMock.save as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .post("/allocation-registry")
        .send({
            date: "01/01/2025",
            value: "R$ 500,00",
            allocationId: "0"
        })

        expect(response.statusCode).toBe(201)
    })
})

describe("PUT /allocation-registry", () => {
    let app: ReturnType<typeof Fastify>

    const allocationRegistryRepositoryMock: IAllocationRegistryRepository = {
        save: jest.fn(),
        update: jest.fn()
    }

    beforeAll(async () => {
        container.register<IAllocationRegistryRepository>("AllocationRegistryRepository", {
            useValue: allocationRegistryRepositoryMock
        })

        app = Fastify()
        app.register(AllocationRegistryRoutes, { prefix: "/allocation-registry" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should update an allocation registry", async () => {
        (allocationRegistryRepositoryMock.update as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .put("/allocation-registry")
        .send({
            id: "0",
            date: "01/01/2025",
            value: "R$ 500,00",
            allocationId: "0"
        })

        expect(response.statusCode).toBe(200)
    })
})