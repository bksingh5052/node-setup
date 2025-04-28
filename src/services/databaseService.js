import mongoose from 'mongoose'
import config from '../configs/config.js'

export default {
     connect: async () => {
          try {
               await mongoose.connect(config.DATABASE_URL)
               return mongoose.connection
          } catch (err) {
               throw err
          }
     }
}
