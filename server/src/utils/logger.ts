// Replace with winston or appropriate and to create better format for easy view in ELK.

const LCERROR = '\x1b[31m%s\x1b[0m'; //red
const LCWARN = '\x1b[33m%s\x1b[0m'; //yellow
const LCDEBUG = '\x1b[35m%s\x1b[0m'; //purple
const LCINFO = '\x1b[36m%s\x1b[0m'; //cyan

type LogParams = Array<string | Error>;

class Logger {
  baseDir: string;

  constructor(dir: string) {
    this.baseDir = dir;
  }

  info(...message: LogParams) {
    console.log(LCINFO, '[INFO]:' + this.baseDir, message.join(', '));
  }

  warn(...message: LogParams) {
    console.warn(LCWARN, '[WARN]:' + this.baseDir, message.join(', '));
  }

  debug(...message: LogParams) {
    console.warn(LCDEBUG, '[WARN]:' + this.baseDir, message.join(', '));
  }

  error(...message: LogParams) {
    console.error(LCERROR, '[ERROR]:' + this.baseDir, message.join(', '));
  }
}

export default Logger;
