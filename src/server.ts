import Fastify from "fastify"
import cors from "@fastify/cors"
import "reflect-metadata"
import "./utils/container"
import { AllocationRoutes } from "./routes/allocation.routes"
import swagger from "@fastify/swagger"
import swaggerUI from "@fastify/swagger-ui"
import "./database/postgres"
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"
import { AllocationRegistryRoutes } from "./routes/allocationregistry.routes"
import { FamilyMemberRoutes } from "./routes/familymember.routes"
import { MovementRoutes } from "./routes/movement.routes"
import { InsuranceRoutes } from "./routes/insurrance.routes"
import { SimulationRoutes } from "./routes/simulation.routes"

const app = Fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(cors, {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
  credentials: true
})

async function loadSwagger() {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "API - Multi Family Office",
        description: "Documentação da API",
        version: "1.0.0",
      }
    },
    transform: jsonSchemaTransform
  });
  
  await app.register(swaggerUI, {
    routePrefix: "/docs",
  })
}

loadSwagger()

app.register(AllocationRoutes, { prefix: "/allocation" })
app.register(AllocationRegistryRoutes, { prefix: "/allocation-registry" })
app.register(FamilyMemberRoutes, { prefix: "/family-member" })
app.register(MovementRoutes, { prefix: "/movement" })
app.register(InsuranceRoutes, { prefix: "/insurance" })
app.register(SimulationRoutes, { prefix: "/simulation" })

const PORT = process.env.PORT || 8080

app
  .listen({
    port: Number(PORT),
    host: "0.0.0.0"
  })
  .then(() => console.log(`API Running on port ${PORT}`));
