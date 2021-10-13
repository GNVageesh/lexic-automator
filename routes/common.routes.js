const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Lexic!" });
});

router.get("/help", (req, res) => {
  res.status(200).json({
    led: "GOTO /led route",
    motor: "GOTO /motor route",
  });
});

router.get("/about", (req, res) => {
  res.status(200).json({
    lexic:
      "Lexic is a Web Interface to Control Electronics starting from Arduino",
    help: "To get Help on Lexic, please visit /help Route",
    author: "Made By GN Vageesh",
  });
});

module.exports = router;
