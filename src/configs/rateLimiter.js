import { RateLimiterMongo } from 'rate-limiter-flexible'

export let rateLimiterMongo = null

const DURATION = 60
const POINTS = 10

export const initRateLimiter = (mongooseConnection) => {
     rateLimiterMongo = new RateLimiterMongo({
          storeClient: mongooseConnection,
          points: POINTS,
          duration: DURATION
     })
}
