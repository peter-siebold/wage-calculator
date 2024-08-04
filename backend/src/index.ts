import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const allowedOrigins = ["http://localhost:5173"];

type CantonData = {
  canton: string;
  minimumWage: number;
};

app.use(
  cors<cors.CorsRequest>({
    origin: [...allowedOrigins],
  })
);

app.get("/api", (req, res) => {
  // get data.json file from ./api/data.json and send it as response
  res.sendFile(__dirname + "/api/data.json");
});

app.get("/api/canton/:canton", (req, res) => {
  // get dat from the canton-data.json file in ./api/canton-data.json, find the canton that matches the request parameter and send it as response
  const cantonData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "api/canton-data.json"), "utf-8")
  );
  const canton = req.params.canton;
  const data = cantonData.find(
    (cantonData: CantonData) => cantonData.canton === canton
  );
  res.send(data);
});

// static files
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(4000, () => {
  console.log("Server started on http://localhost:4000");
});
