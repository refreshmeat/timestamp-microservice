const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ optionsSuccessStatus: 200 }));

app.get("/", (_req, res) => {
  res.type("text").send("Timestamp Microservice");
});

app.get("/api/:date?", (req, res) => {
  const input = req.params.date;
  let date;

  if (!input) {
    date = new Date();
  } else if (/^-?\d+$/.test(input)) {
    date = new Date(Number(input));
  } else {
    date = new Date(input);
  }

  if (Number.isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

module.exports = app;
