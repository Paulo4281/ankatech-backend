import { z } from "zod"

const AllocationTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date()
})

export {
    AllocationTypeSchema
}