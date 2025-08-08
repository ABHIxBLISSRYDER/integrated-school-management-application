import { PrismaClient } from '@prisma/client'

// Function to create a new PrismaClient instance
const prismaClientSingleton = () => {
  return new PrismaClient()
}

// Extend globalThis with a custom `prismaGlobal` property
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

// Use the existing global Prisma instance if it exists,
// or create a new one (singleton pattern)
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

// In development, persist the Prisma instance on globalThis to avoid 
// creating a new client every time the server reloads due to HMR
if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma
