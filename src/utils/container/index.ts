import { delay, container } from "tsyringe"
import { AllocationRepository } from "../../modules/allocation/repositories/classes/AllocationRepository"
import { IAllocationRepository } from "../../modules/allocation/repositories/interfaces/IAllocationRepository"
import { AllocationRegistryRepository } from "../../modules/allocation/repositories/classes/AllocationRegistryRepository"
import { IAllocationRegistryRepository } from "../../modules/allocation/repositories/interfaces/IAllocationRegistryRepository"
import { FamilyMemberRepository } from "../../modules/familyMember/repositories/classes/FamilyMemberRepository"
import { IFamilyMemberRepository } from "../../modules/familyMember/repositories/interfaces/IFamilyMemberRepository"

container.registerSingleton<IAllocationRepository>(
    "AllocationRepository",
    delay(() => AllocationRepository)
)

container.registerSingleton<IAllocationRegistryRepository>(
    "AllocationRegistryRepository",
    delay(() => AllocationRegistryRepository)
)

container.registerSingleton<IFamilyMemberRepository>(
    "FamilyMemberRepository",
    delay(() => FamilyMemberRepository)
)