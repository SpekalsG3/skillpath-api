/* eslint-disable no-console */
class Logger {
  constructor (name = null) {
    this.name = name;
  }

  resetLogId () {
    this.logId = Math.random().toString(36).substring(2, 8) + Math.random().toString(36).substring(2, 8);
  }

  formatLog (level, message) {
    message = `[${this.name ? `${this.name}: ${this.logId}` : this.logId}] ${level}: ${new Date().toJSON().slice(0, -1)} ${message}`;
    return message;
  }

  log (message, level) {
    console.log(this.formatLog(level, message));
  }

  verbose (message) {
    console.log(this.formatLog('VERBOSE', message));
  }

  debug (message) {
    console.log(this.formatLog('DEBUG', message));
  }

  info (message) {
    console.log(this.formatLog('INFO', message));
  }

  warn (message) {
    console.log(this.formatLog('WARN', message));
  }

  error (message, ex) {
    if (ex && ex.message) {
      message += ` ErrorMsg: ${ex.message}`;
    }

    console.error(this.formatLog('ERROR', message));
  }

  stringify (v) {
    const cache = new Set();
    return JSON.stringify(v, function (key, value) {
      if (typeof value === 'object' && value !== null) {
        if (cache.has(value)) {
          // Circular reference found
          try {
            // If this value does not reference a parent it can be deduped
            return JSON.parse(JSON.stringify(value));
          }
          catch (err) {
            // discard key if value cannot be deduped
            return;
          }
        }
        // Store value in our set
        cache.add(value);
      }
      return value;
    });
  }
}

module.exports = Logger;
