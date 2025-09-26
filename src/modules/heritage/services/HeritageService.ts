import { inject, injectable } from "tsyringe"
import { PrismaClient } from "../../../generated/prisma/client"

@injectable()
export class HeritageService {
  constructor() {}

  async save(): Promise<any> {
    const prisma = new PrismaClient()

    return
  }
}
