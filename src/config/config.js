import dotenvFlow from 'dotenv-flow'
dotenvFlow.config()

export default {
     ENV: process.env.ENV,
     PORT: process.env.PORT,
     SERVER_URL: process.env.SERVER_URL,
     DATABASE_URL: process.env.DATABASE_URL
}
