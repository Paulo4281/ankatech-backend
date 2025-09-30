import "reflect-metadata"
import Fastify from "fastify"
import supertest from "supertest"
import { FamilyMemberRoutes } from "../../src/routes/familymember.routes"
import { serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { container } from "tsyringe"
import { IFamilyMemberRepository } from "../../src/modules/familyMember/repositories/interfaces/IFamilyMemberRepository"

describe("GET /family-member", () => {
    let app: ReturnType<typeof Fastify>

    const familyMemberRepositoryMock: IFamilyMemberRepository = {
        find: jest.fn()
    }

    beforeAll(async () => {
        container.register<IFamilyMemberRepository>("FamilyMemberRepository", {
            useValue: familyMemberRepositoryMock
        })

        app = Fastify()
        app.register(FamilyMemberRoutes, { prefix: "/family-member" })
        app.setValidatorCompiler(validatorCompiler)
        app.setSerializerCompiler(serializerCompiler)
        await app.ready()
    })

    it("should return the members of a family", async () => {
        (familyMemberRepositoryMock.find as jest.Mock).mockResolvedValueOnce([])

        const response = await supertest(app.server)
        .get("/family-member?familyId=0")

        expect(response.body).toBeInstanceOf(Array)
    })
})