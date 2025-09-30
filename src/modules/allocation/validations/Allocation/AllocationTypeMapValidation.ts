import { z } from "zod"
import { AllocationTypeSchema } from "./AllocationTypeValidation"

const AllocationTypeMapSchema = z.object({
  id: z.string(),
  allocationTypeId: z.string(),
  allocationId: z.string(),
  createdAt: z.date(),
  allocationType: AllocationTypeSchema
})

export {
    AllocationTypeMapSchema
}