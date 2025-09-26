import { delay, container } from "tsyringe"
import { AllocationRepository } from "../../modules/allocation/repositories/classes/AllocationRepository"
import { IAllocationRepository } from "../../modules/allocation/repositories/interfaces/IAllocationRepository"

container.registerSingleton<IAllocationRepository>(
    "AllocationRepository",
    delay(() => AllocationRepository)
)