import { PrismaClient } from '@prisma/postgres/client'

const prisma = new PrismaClient()

async function main() {

    // Create a new user
    await prisma.users.create({
        data: {
            email: 'titi@titi.fr',
            password: 'titi',
            role: 'admin',
        },
    })

    const allUsers = await prisma.users.findMany()
    console.dir(allUsers, { depth: null })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

