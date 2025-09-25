import Fastify from "fastify"
import "reflect-metadata"
import { HeritageRoutes } from "./routes/heritage.routes"
import { AllocationRoutes } from "./routes/allocation.routes"
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod"

const app = Fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

async function loadSwagger() {
  await app.register(swagger, {
    openapi: {
      info: {
        title: "Minha API",
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

app.register(HeritageRoutes, { prefix: "/heritage" })
app.register(AllocationRoutes, { prefix: "/allocation" })

const PORT = process.env.PORT || 8080

app
  .listen({
    port: Number(PORT),
    host: "0.0.0.0"
  })
  .then(() => console.log(`API Running on port ${PORT}`));
