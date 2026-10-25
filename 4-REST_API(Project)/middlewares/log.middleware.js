const fs = require("fs")

function logReqRes(FILENAME) {
  return (req, res, next) => {
    let data = `${Date.now()} | ${req.method} | ${req.url}\n`;
    fs.appendFile(FILENAME, data, (err) => {
      if (err) {
        return res.status(500).json({
          message: "Internal server error",
          task: "writing logs",
        });
      }
      next();
    });
  };
}

module.exports = logReqRes;
