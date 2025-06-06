import morgan, { type StreamOptions } from 'morgan';

import { type IncomingMessage, type ServerResponse } from 'http';
import { WinstonLogger } from '../logger/winston-logger';

const Logger = WinstonLogger.getInstance();
const stream: StreamOptions = {
  write: (message) => {
    Logger.http(message);
  },
};

const skip = (_: IncomingMessage, res: ServerResponse): boolean => {
  const env = process.env.ENVIRONMENT || 'local';
  if (['development', 'production'].includes(env)) {
    return res.statusCode < 400;
  }
  return false;
};

const morganMiddleware = morgan(
  ':method :url :status :res[content-length] - :response-time ms',

  { stream, skip }
);

export default morganMiddleware;
