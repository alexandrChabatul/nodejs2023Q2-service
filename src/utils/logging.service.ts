import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';

export class LoggingService implements LoggerService {
  log(message: any) {
    console.log(message);
    fs.appendFile('logs.log', message + '\n', 'utf8', (err) => {
      if (err) throw err;
    });
  }

  error(message: any) {
    console.error(message);
    fs.appendFile('logs.log', `ERROR \n ${message} + \n`, 'utf8', (err) => {
      if (err) throw err;
    });
  }

  warn(message: any) {
    console.warn(message);
    fs.appendFile('logs.log', message + '\n', 'utf8', (err) => {
      if (err) throw err;
    });
  }
}
