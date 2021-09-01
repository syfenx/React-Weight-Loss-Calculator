import React, { useState, useEffect } from "react";
import {
  RadioGroup,
  FormControl,
  Radio,
  FormControlLabel,
  TextField,
} from "@material-ui/core";

function WeightLoss() {
  function bmrMultiplier(bmr, activetype) {
    const types = {
      sedentary: 1.2,
      lightlyActive: 1.375,
      moderatelyActive: 1.55,
      veryActive: 1.725,
    };
    return parseInt(Math.floor(bmr * types[activetype]));
  }

  const [currentWeight, setCurrentWeight] = useState(215);
  const [goalWeight, setGoalWeight] = useState(160);
  const [calDeficit, setCalDeficit] = useState(1000);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(34);
  const [activityType, setActivityType] = useState("sedentary");
  const [bmr, setBmr] = useState(1906);

  const [sedentary, setSedentary] = useState(bmrMultiplier(bmr, "sedentary"));

  const [lightlyActive, setLightlyActive] = useState(
    bmrMultiplier(bmr, "lightlyActive")
  );
  const [moderatelyActive, setModeratelyActive] = useState(
    bmrMultiplier(bmr, "moderatelyActive")
  );
  const [veryActive, setVeryActive] = useState(
    bmrMultiplier(bmr, "veryActive")
  );

  function currentWeightHandler(e) {
    setCurrentWeight(e.target.value);
    calcBmr();
  }

  function goalWeightHandler(e) {
    setGoalWeight(e.target.value);
    calcBmr();
  }

  function calDeficitHandler(e) {
    setCalDeficit(e.target.value);
    calcBmr();
  }

  function genderHandler(e) {
    setGender(e.target.value);
    setGender(e.target.value);
    calcBmr();
  }

  function ageHandler(e) {
    setAge(e.target.value);
    calcBmr();
  }

  function feetHandler(e) {
    setHeightFeet(parseInt(e.target.value));
    calcBmr();
  }

  function inchesHandler(e) {
    setHeightInches(parseInt(e.target.value));
    calcBmr();
  }

  useEffect(() => {
    calcBmr();
  });

  function calcBmr() {
    let weightKg = currentWeight / 2.205;
    let totalInches = heightFeet * 12 + heightInches;
    let totalCm = totalInches * 2.54;

    let maleBmr = 10 * weightKg + 6.25 * totalCm - 5 * age + 5;
    let femaleBmr = 10 * weightKg + 6.25 * totalCm - 5 * age - 161;

    if (gender === "male") {
      setBmr(maleBmr);
    } else {
      setBmr(femaleBmr);
    }
    setSedentary(bmrMultiplier(bmr, "sedentary"));
    setLightlyActive(bmrMultiplier(bmr, "lightlyActive"));
    setModeratelyActive(bmrMultiplier(bmr, "moderatelyActive"));
    setVeryActive(bmrMultiplier(bmr, "veryActive"));
  }

  function amountToLose() {
    return currentWeight - goalWeight;
  }

  function poundsPerWeekCalc() {
    return (calDeficit * 7) / 3500;
  }

  function weeksToLose() {
    return parseInt((currentWeight - goalWeight) / poundsPerWeekCalc());
  }

  function daysToLose() {
    return parseInt(weeksToLose() * 7);
  }

  function addDays(days) {
    var date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  function goalDate() {
    let options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    let finalDate = addDays(daysToLose()).toLocaleDateString("en-US", options)
    return finalDate
  }


  function dailyIntake() {
    return parseInt(bmrMultiplier(bmr, activityType) - calDeficit);
  }

  const styles = {
    root: {
      borderRadius: 3,
      border: "1px solid #444",
      color: "white",
    },
  };

  return (
    <div className="container">
      <div className="box">
        <h1>Weight Loss Calculator</h1>

        <FormControl component="fieldset">
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={gender}
            onChange={genderHandler}
          >
            <div className="grid2col">
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
            </div>
          </RadioGroup>
        </FormControl>

        <hr />
        <br />

        <div className="gridbox">
          <div className="grid2col">
            <TextField
              style={styles.root}
              name="age"
              id="outlined-numdber"
              label="Age"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={ageHandler}
              InputProps={{ inputProps: { min: 1, max: 100 } }}
              value={age}
            />
            <TextField
              style={styles.root}
              id="outlined-number"
              label="Current Weight (lbs)"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={currentWeightHandler}
              InputProps={{ inputProps: { min: 50, max: 500 } }}
              value={currentWeight}
            />{" "}
          </div>
          {/* <p>Height:</p> */}
          <div className="grid2col">
            <TextField
              style={styles.root}
              id="outlined-number"
              label="Feet"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={feetHandler}
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              value={heightFeet}
            />
            <TextField
              style={styles.root}
              id="outlined-number"
              label="Inches"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              onChange={inchesHandler}
              InputProps={{ inputProps: { min: 0, max: 12 } }}
              value={heightInches}
            />
          </div>
          <TextField
            style={styles.root}
            id="outlined-number"
            label="Goal Weight (lbs)"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            onChange={goalWeightHandler}
            InputProps={{ inputProps: { min: 50, max: 500 } }}
            value={goalWeight}
          />
          <p>
            Calorie Deficit Per Day (
            <span className={calDeficit > 1000 ? "warning" : ""}>
              -{calDeficit} calories
            </span>
            )
          </p>
          <input
            type="range"
            min="500"
            max="1500"
            onChange={calDeficitHandler}
            value={calDeficit}
          />
        </div>
      </div>

      <div className="box">
        <p>BMR: {parseInt(bmr)} calories</p>
        <h5>Daily calorie needs based on activity level</h5>
        <FormControl component="fieldset">
          <RadioGroup
            // aria-label="sedentary"
            value={activityType}
            onChange={(e) => setActivityType(e.target.value)}
          >
            <FormControlLabel
              value="sedentary"
              control={<Radio />}
              label={`Sedentary (${sedentary})`}
            />
            <FormControlLabel
              value="lightlyActive"
              control={<Radio />}
              label={`Lightly Active (${lightlyActive})`}
            />
            <FormControlLabel
              value="moderatelyActive"
              control={<Radio />}
              label={`Moderately Active (${moderatelyActive})`}
            />
            <FormControlLabel
              value="veryActive"
              control={<Radio />}
              label={`Very Active (${veryActive})`}
            />
          </RadioGroup>
        </FormControl>

        <div className="results">
          <p>
            Daily Deficit:{" "}
            <span className={calDeficit > 1000 ? "warning" : ""}>
              -{calDeficit} calories
            </span>
          </p>
          <p>
            Lose{" "}
            <span className={poundsPerWeekCalc() > 2.2 ? "warning" : ""}>
              {poundsPerWeekCalc()} lbs/week
            </span>
          </p>
          <p>
            Daily intake:{" "}
            <span className={dailyIntake() < 1200 ? "warning" : ""}>
              {dailyIntake()} calories
            </span>
          </p>
          <p>Amount to lose: {amountToLose()} lbs</p>
          <p>
            Lose in {weeksToLose()} weeks <br /> or {daysToLose()} days <br />{" "}
            or by {goalDate()}
          </p>
        </div>
      </div>
    </div>
  );
}
export default WeightLoss;
