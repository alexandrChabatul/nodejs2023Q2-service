import { LoggerService } from '@nestjs/common';
import * as fs from 'fs';

export class LoggingService implements LoggerService {
  private static fileCount = 1;
  private static errorFileCount = 1;
  private logLevel: number;
  private logLimit: number;

  constructor() {
    this.logLevel = +process.env.LOGS_LEVEL || 3;
    this.logLimit = +process.env.LOGS_FILE_LIMIT || 10000;
  }

  log(message: any) {
    if (this.logLevel < 1) return;
    console.log(message);
    this.writeToFile(message);
  }

  error(message: any) {
    if (this.logLevel < 3) return;
    console.error(message);
    this.writeToFile(message);
  }

  warn(message: any) {
    if (this.logLevel < 2) return;
    console.warn(message);
    this.writeToFile(message);
  }

  writeToFile(message: any) {
    try {
      fs.statSync(`./logs`);
    } catch (e) {
      fs.mkdir('logs', (err) => console.log(err));
    }
    try {
      const stats = fs.statSync(`./logs/logs_${LoggingService.fileCount}.log`);
      if (stats.size >= this.logLimit) LoggingService.fileCount++;
    } catch (e) {
      console.log(e);
    }
    fs.appendFile(
      `./logs/logs_${LoggingService.fileCount}.log`,
      message + '\n',
      'utf8',
      (err) => {
        if (err) console.log(err);
      },
    );
  }

  writeError(message: any) {
    try {
      fs.statSync(`./logs`);
    } catch (e) {
      fs.mkdir('logs', (err) => console.log(err));
    }
    try {
      const stats = fs.statSync(
        `./logs/logs_error_${LoggingService.errorFileCount}.log`,
      );
      if (stats.size >= this.logLimit) LoggingService.errorFileCount++;
    } catch (e) {
      console.log(e);
    }
    fs.appendFile(
      `./logs/logs_error_${LoggingService.errorFileCount}.log`,
      message + '\n',
      'utf8',
      (err) => {
        if (err) console.log(err);
      },
    );
  }
}
