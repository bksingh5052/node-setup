import util from 'util'
import 'winston-mongodb'
import { createLogger, format, transports } from 'winston'
import config from '../configs/config.js'
import { blue, red, yellow, green, magenta } from 'colorette'

const colorizeLevel = (level) => {
     switch (level) {
          case 'ERROR':
               return red(level)
          case 'INFO':
               return blue(level)
          case 'WARN':
               return yellow(level)
          default:
               return level
     }
}

const consoleLogFormat = format.printf((info) => {
     const { level, message, timestamp, meta = {} } = info

     const customLevel = colorizeLevel(level.toUpperCase())

     const customTimestamp = green(timestamp)

     const customMessage = message

     const customMeta = util.inspect(meta, {
          showHidden: false,
          depth: null,
          colors: true
     })

     const customLog = `${customLevel} [${customTimestamp}] ${customMessage}\n${magenta('META')} ${customMeta}\n`

     return customLog
})

const consoleTransport = () => {
     if (config.ENV === 'development') {
          return [
               new transports.Console({
                    level: 'info',
                    format: format.combine(format.timestamp(), consoleLogFormat)
               })
          ]
     }

     return []
}

const MongodbTransport = () => {
     return [
          new transports.MongoDB({
               level: 'info',
               db: config.DATABASE_URL,
               metaKey: 'meta',
               expireAfterSeconds: 3600 * 24 * 30,
               collection: 'application-logs'
          })
     ]
}

export default createLogger({
     defaultMeta: {
          meta: {}
     },
     transports: [...MongodbTransport(), ...consoleTransport()]
})
