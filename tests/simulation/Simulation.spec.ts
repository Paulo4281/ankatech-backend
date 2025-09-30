import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { SimulationRoutes } from "../../src/routes/simulation.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { ISimulationRepository } from "../../src/modules/simulation/repositories/interfaces/ISimulationRepository"
import { IMovementRepository } from "../../src/modules/movement/repositories/interfaces/IMovementRepository"

describe("POST /simulation", () => {
    let app: ReturnType<typeof Fastify>

    const simulationRegistryRepositoryMock: ISimulationRepository = {
        save: jest.fn(),
        list: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        updateUpdatedAt: jest.fn(),
        deleteById: jest.fn()
    }

    const movementRepositoryMock: Partial<IMovementRepository> = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<ISimulationRepository>("SimulationRepository", {
            useValue: simulationRegistryRepositoryMock
        })
        container.register<Partial<IMovementRepository>>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(SimulationRoutes, { prefix: "/simulation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should create a simulation", async () => {
        (simulationRegistryRepositoryMock.save as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .post("/simulation")
        .send({
            name: "Plano original",
            dateStart: "01/01/2025",
            rate: "4",
            familyMemberId: "0"
        })

        expect(response.statusCode).toBe(201)
    })
})

describe("GET /simulation/list-history", () => {
    let app: ReturnType<typeof Fastify>

    const simulationRegistryRepositoryMock: ISimulationRepository = {
        save: jest.fn(),
        list: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        updateUpdatedAt: jest.fn(),
        deleteById: jest.fn()
    }

    const movementRepositoryMock: Partial<IMovementRepository> = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<ISimulationRepository>("SimulationRepository", {
            useValue: simulationRegistryRepositoryMock
        })
        container.register<Partial<IMovementRepository>>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(SimulationRoutes, { prefix: "/simulation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return the history list of all simulations", async () => {
        (simulationRegistryRepositoryMock.list as jest.Mock).mockResolvedValueOnce([])

        const response = await supertest(app.server)
        .get("/simulation/list-history?familyMemberId=0")

        expect(response.body).toBeInstanceOf(Array)
    })
})

describe("GET /simulation", () => {
    let app: ReturnType<typeof Fastify>

    const simulationRegistryRepositoryMock: ISimulationRepository = {
        save: jest.fn(),
        list: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        updateUpdatedAt: jest.fn(),
        deleteById: jest.fn()
    }

    const movementRepositoryMock: Partial<IMovementRepository> = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<ISimulationRepository>("SimulationRepository", {
            useValue: simulationRegistryRepositoryMock
        })
        container.register<Partial<IMovementRepository>>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(SimulationRoutes, { prefix: "/simulation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return a simulation", async () => {
        (simulationRegistryRepositoryMock.find as jest.Mock).mockResolvedValueOnce({})

        const response = await supertest(app.server)
        .get("/simulation?familyMemberId=0&id=1")

        expect(response.body).toBeInstanceOf(Object)
    })
})

describe("PUT /simulation", () => {
    let app: ReturnType<typeof Fastify>

    const simulationRegistryRepositoryMock: ISimulationRepository = {
        save: jest.fn(),
        list: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        updateUpdatedAt: jest.fn(),
        deleteById: jest.fn()
    }

    const movementRepositoryMock: Partial<IMovementRepository> = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<ISimulationRepository>("SimulationRepository", {
            useValue: simulationRegistryRepositoryMock
        })
        container.register<Partial<IMovementRepository>>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(SimulationRoutes, { prefix: "/simulation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should update a simulation. If id is not provided, a new one shall be created", async () => {
        (simulationRegistryRepositoryMock.update as jest.Mock).mockResolvedValueOnce({})

        const response = await supertest(app.server)
        .put("/simulation")
        .send({
            id: null,
            name: "Plano original",
            dateStart: "01/01/2025",
            rate: "4",
            familyMemberId: "0"
        })

        expect(response.body).toBeInstanceOf(Object)
    })
})

describe("DELETE /simulation", () => {
    let app: ReturnType<typeof Fastify>

    const simulationRegistryRepositoryMock: ISimulationRepository = {
        save: jest.fn(),
        list: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
        updateUpdatedAt: jest.fn(),
        deleteById: jest.fn()
    }

    const movementRepositoryMock: Partial<IMovementRepository> = {
        save: jest.fn(),
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<ISimulationRepository>("SimulationRepository", {
            useValue: simulationRegistryRepositoryMock
        })
        container.register<Partial<IMovementRepository>>("MovementRepository", {
            useValue: movementRepositoryMock
        })

        app = Fastify()
        app.register(SimulationRoutes, { prefix: "/simulation" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should delete a simulation", async () => {
        (simulationRegistryRepositoryMock.deleteById as jest.Mock).mockResolvedValueOnce(undefined)

        const response = await supertest(app.server)
        .delete("/simulation/1")

        expect(response.statusCode).toBe(200)
    })
})