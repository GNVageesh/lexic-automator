const express = require("express");
const SerialPort = require("serialport");

// let comPort = "/dev/ttyACM0";
// let ard_serial_port = new SerialPort(comPort, { baudRate: 9600 });

// ard_serial_port.on("open", () => {
//   console.log("connected successfully");
// });

// getArduino();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./routes/api.routes"));

app.listen(PORT, () => {
  console.log("Server is running");
});
