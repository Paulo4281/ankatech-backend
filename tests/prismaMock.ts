import { jest } from "@jest/globals"

const prismaMock = {
    movement: {
        save: jest.fn(),
        find: jest.fn()
    }
}

export {
    prismaMock
}