import { PrismaPg } from '@prisma/adapter-pg'
import { categories } from './data/categories'
import { products } from './data/products'
import { PrismaClient } from '@/src/generated/prisma/client' // prisma client interactua con la base de datos

import dotenv from 'dotenv'
dotenv.config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
})
 
const prisma = new PrismaClient({
  adapter,
})

async function main() {

    try {
        await prisma.category.createMany({
            data: categories
        })
        await prisma.product.createMany({
            data: products
        })
        console.log('Seeding finalizado')
    } catch(error) {
        console.log(error)
    }
    
}

main()
    .then(async () => {
        await prisma.$disconnect() // desconecta el cliente de la base de datos
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1) // esto detiene la ejecucion del programa en caso de error
    })