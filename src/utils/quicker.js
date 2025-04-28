import os from 'os'
import config from '../configs/config.js'
export default {
     getSystemHealth: () => {
          return {
               cpuUsage: os.loadavg(),
               totalmemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
               freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
          }
     },
     getApplictionHealth: () => {
          return {
               environment: config.ENV,
               upTime: `${process.uptime().toFixed(2)} Seconds`,
               memoryusage: {
                    heapTotal: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
                    heapUsed: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
               }
          }
     }
}
