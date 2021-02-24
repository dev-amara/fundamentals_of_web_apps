import express from "express";
import bodyParser from "body-parser";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send(`<p>Hello Full Stack</p>`);
});

app.get("/bmi", (req, res) => {
  const { query } = req;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let height: any, weight: any;
  ({ height, weight } = query);

  if (!height || !weight) {
    return res.status(400).json({ error: "parameters missing" });
  }


  height = Number(height);
  weight = Number(weight);

  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmi = calculateBmi(height, weight);

  return res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  console.log(req.body);
  const { body } = req;
  const dailyExercises = body.daily_exercises;
  let target = body.target;

  if (!target || !dailyExercises) {
    return res.status(400).json({ error: "parameters missing" });
  }

  if (!Array.isArray(dailyExercises)) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const hasNaNInDailyHours = dailyExercises.some((hours) => isNaN(hours));
  target = Number(target);

  if (isNaN(target) || hasNaNInDailyHours) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  return res.json(calculateExercises(dailyExercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
