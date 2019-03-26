'use strict'

import { createLogger, format, transports } from 'winston';

// local imports
import config from './config/core';

const { combine, timestamp, label, prettyPrint } = format
const logger = createLogger({
  level: config.logLevel || 'info',
  format: combine(
    label({ label: config.name }),
    timestamp(),
    prettyPrint()
  ),
  transports: [new transports.Console()]
})

export default logger
