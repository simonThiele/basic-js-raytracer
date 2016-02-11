var Logger = function(maxLogsToWrite) {
  this.maxLogsToWrite = maxLogsToWrite;
  this.logsWritten = 0;


  this.log = function() {
    if (this.logsWritten >= maxLogsToWrite) {
      return;
    }

    this.logsWritten++;
    console.log(arguments);
  }
};

Logger.prototype.constructor = Logger;

var logger = new Logger(10);

module.exports = logger;
