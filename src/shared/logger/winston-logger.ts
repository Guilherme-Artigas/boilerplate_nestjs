import { ILogger } from '@core/lib/logger/logger.interface';
import winston, { format } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
const { combine, timestamp, json, errors, colorize, printf, prettyPrint } =
  format;

export class WinstonLogger implements ILogger {
  private readonly logger: winston.Logger;
  private static instance: WinstonLogger;

  constructor() {
    const levels = {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      debug: 4,
    };

    const colors = {
      error: 'red',
      warn: 'yellow',
      info: 'green',
      http: 'magenta',
      debug: 'white',
    };

    winston.config.addColors(colors);

    const level = (): 'debug' | 'warn' => {
      const env = process.env.ENVIRONMENT || 'development';
      const isDevelopment = env === 'development' || env === 'local';
      return isDevelopment ? 'debug' : 'warn';
    };

    const consoleFormat = combine(
      colorize({ all: true }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
      prettyPrint(),
      printf((info) => {
        const duration = info.durationMs
          ? ` (Duration: ${info.durationMs as number}ms)`
          : '';
        const timestamp = info.timestamp as string;
        const level = info.level;
        const message = info.message as string;
        const stack = info.stack as string | undefined;

        return `${timestamp} ${level}: ${message}${duration} ${stack || ''}`;
      })
    );

    const fileRotateTransport = new DailyRotateFile({
      filename: 'logs/errors-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d',
      format: combine(
        timestamp(),
        errors({ stack: true }),
        json(),
        prettyPrint()
      ),
    });

    const transports = [
      new winston.transports.Console({ format: consoleFormat }),
      fileRotateTransport,
    ];

    this.logger = winston.createLogger({
      level: level(),
      levels,
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss:SSS' }),
        errors({ stack: true }),
        json()
      ),
      transports,
      exceptionHandlers: [fileRotateTransport],
    });
  }

  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
    }
    return WinstonLogger.instance;
  }

  info(message: string): void {
    this.logger.info(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  error(message: string, error: Error): void {
    this.logger.error(`${message} - ${error.stack || error.message}`);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }

  http(message: string): void {
    this.logger.http(message);
  }

  startTimer(): winston.Profiler {
    return this.logger.startTimer();
  }
}
