interface ENV {
    DATABASE_URL : string,
    JWT_SECRET : string,
    PORT: string,
}

if(!process.env.DATABASE_URL) throw new Error ("No DATABASE_URL PROVIDED")
if(!process.env.JWT_SECRET) throw new Error ("No JWT_SECRET PROVIDED")
if(!process.env.PORT) throw new Error ("No PORT PROVIDED")



export const Env:ENV = {
    DATABASE_URL : process.env.DATABASE_URL,
    JWT_SECRET : process.env.JWT_SECRET,
    PORT : process.env.PORT 
}