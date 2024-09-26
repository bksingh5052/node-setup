import util from 'util'
import { createLogger, format, transports } from 'winston'
import config from '../config/config.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import path from 'path'
import { blue, red, yellow, green, magenta } from 'colorette'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

const fileLogFormat = format.printf((info) => {
     const { level, message, timestamp, meta = {} } = info
     const logMeta = {}
     for (const [key, value] of Object.entries(meta)) {
          if (value instanceof Error) {
               logMeta[key] = {
                    name: value.name,
                    message: value.message,
                    trace: value.stack || ''
               }
          } else {
               logMeta[key] = value
          }
     }

     const logData = {
          level: level.toUpperCase(),
          message,
          timestamp,
          meta: logMeta
     }

     return JSON.stringify(logData, null, 4)
})

const FileTransport = () => {
     return [
          new transports.File({
               filename: path.join(__dirname, '../', '../', 'logs', `${config.ENV}.log`),
               level: 'info',
               format: format.combine(format.timestamp(), fileLogFormat)
          })
     ]
}

export default createLogger({
     defaultMeta: {
          meta: {}
     },
     transports: [...FileTransport(), ...consoleTransport()]
})
