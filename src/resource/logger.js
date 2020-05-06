import winston from 'winston'

const logger = new winston.Logger({
    transports: [ 
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true,
            prettyPrint: true,
        }),
    ],
    exitOnError: false
});

export default logger
