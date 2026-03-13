import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Env } from "./env";
import express from 'express'

const app = express()


const adapter = new PrismaPg({
    connectionString: Env.DATABASE_URL
})

export const prisma = new PrismaClient({adapter})

export const connectDB = async() => {
   try {
     await prisma.$connect()
     console.log("DB connection successful")
     app.listen(Env.PORT)
     console.log(`Listening on PORT ${Env.PORT}`)
     
    }catch(error : any){
        message: `Error connecting Db :  ${error.message}`
        console.log("connection failed")
    }
}






