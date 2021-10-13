const SerialPort = require("serialport");
const api = require("express").Router();

SerialPort.list().then((ports) => {
  var done = false;
  var count = 0;
  var allports = ports.length;

  ports.forEach((port) => {
    count += 1;
    mPort = port.manufacturer;

    if (typeof mPort !== "undefined" && mPort.includes("arduino")) {
      var path = port.path;
      const ArduinoPort = new SerialPort(path, { baudRate: 9600 });
      ArduinoPort.on("open", () => {
        console.log(`Connected to Arduino on Port: ${path}`);
      });

      api.use("/", require("./common.routes"));

      if (ArduinoPort.path !== null) {
        api.get("/led/:action", (req, res) => {
          let action = req.params.action;

          if (action == "on") {
            ArduinoPort.write("o");
            return res.status(200).json({ message: "LED is Turned On!" });
          }

          if (action == "off") {
            ArduinoPort.write("i");
            return res.status(200).json({ message: "LED is Turned Off!" });
          }
        });
      } else {
        api.get("/", (req, res) => {
          res.json({
            message: "Welcome to Lexic",
            error: "No Arduino Found",
          });
        });
      }
      done = true;
    }

    if (count === allports && done === false) {
      console.log(`Cannot find any Arduino Ports`);
      api.use("/", require("./common.routes"));
    }
  });
});

module.exports = api;
