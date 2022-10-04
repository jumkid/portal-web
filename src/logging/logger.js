import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'portal-web' },
    transports: [
        new winston.transports.File({
            filename: './logs/portal-web.log',
            handleExceptions: true,
            maxsize: 5242880, // 5MB
            maxFiles: 10,
            colorize: false,
        }),
    ],

    exitOnError: false,

});

if (process.env.SERVER_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        level: 'debug',
        format: winston.format.simple(),
        handleExceptions: true,
        json: false,
        colorize: true,
    }));
}

export default logger;
