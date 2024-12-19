import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AnalysisReport = () => {
  const synonyms = {
    fasting_blood_sugar: [
      "fasting blood sugar",
      "fasting glucose",
      "pre-meal glucose",
      "overnight glucose",
      "fasting sugar level",
      "fasting blood level",
      "morning sugar test",
      "overnight sugar level",
      "fasted glucose",
      "glucose after fast",
      "preprandial glucose",
      "preprandial sugar",
      "glucose fasting",
      "fasting serum glucose",
      "glucose (fasting)",
      "blood sugar after fasting",
      "blood sugar fasting level",
      "blood glucose after fast",
      "fasting plasma glucose",
      "fasting serum sugar",
      "blood sugar before eating",
      "glucose level before meals",
      "pre-breakfast sugar",
      "pre-meal sugar reading",
      "overnight fasting glucose",
      "fasting glycemia",
      "fasting plasma sugar",
      "early morning sugar",
      "baseline glucose",
      "morning fasting glucose",
      "fasting glycemic reading",
      "fasting glucose plasma",
      "plasma sugar fasting",
      "pre-breakfast glucose",
      "early morning fasting level",
      "glucose (baseline)",
      "baseline sugar reading",
      "overnight baseline glucose",
      "fasting glycemia plasma",
      "fasting sugar plasma",
      "overnight glucose level",
      "fasting blood sugar measurement",
      "fasting blood sugar level",
      "overnight glycemia",
      "baseline fasting blood sugar",
      "sugar test after fasting",
      "fasting level blood sugar",
      "overnight fasted blood sugar",
      "fasted glycemia level",
      "plasma fasting sugar",
      "fasting morning glucose",
      "baseline morning sugar",
      "fasting pre-meal glucose",
      "glycemia fasting",
      "overnight fasting sugar",
      "pre-meal fasting sugar",
      "baseline fasting glucose",
      "fasting early morning sugar",
      "pre-breakfast fasting sugar",
      "fasting glycemic index",
      "fasting glucose test result",
      "overnight blood glucose level",
      "pre-dawn glucose",
      "fasting AM sugar",
      "fasted morning sugar level",
      "sugar fasting test",
      "overnight glycemic level",
      "fasting glycemia blood",
      "pre-meal glycemia level",
      "overnight fasting glycemia",
      "fasting metabolic glucose",
      "fasting sugar reading",
      "early morning glucose test",
      "fasting blood test glucose",
      "fasting glucose index",
      "sugar after fast",
      "fasted glucose measurement",
      "early fasting sugar",
      "fasting glycemic control",
      "overnight sugar reading",
      "fasting glycemic level",
      "fasting plasma glycemia",
      "overnight blood glucose test",
      "fasting glucose blood",
      "fasting baseline sugar",
      "baseline AM glucose",
      "overnight glucose reading",
      "fasting AM blood glucose",
      "sugar after overnight fast",
      "fasted glycemic level",
      "glucose (morning fasting)",
      "morning fast glucose",
      "pre-dawn fasting glucose",
      "fasting glucose result",
    ],
    postprandial_blood_sugar: [
      "postprandial blood sugar",
      "after meal glucose",
      "post-meal sugar",
      "2-hour glucose",
      "post-meal glucose test",
      "post-meal blood sugar level",
      "post-dinner sugar level",
      "after eating sugar level",
      "post-eating glucose",
      "glucose after meal",
      "post-lunch sugar",
      "sugar after eating",
      "glucose post meal",
      "postprandial sugar test",
      "postprandial glucose level",
      "after-dinner glucose",
      "blood sugar after eating",
      "postprandial serum glucose",
      "post-dinner blood sugar",
      "postprandial glycemia",
      "postprandial glycemic level",
      "postprandial plasma sugar",
      "glucose post meal test",
      "blood sugar (postprandial)",
      "2-hour post meal sugar",
      "post-meal blood sugar reading",
      "glucose after eating",
      "post-lunch glucose",
      "after-meal sugar test",
      "glucose post-meal reading",
      "post-meal glycemia",
      "post-eating sugar level",
      "postprandial glycemic test",
      "after eating glucose level",
      "blood glucose after meals",
      "postprandial sugar reading",
      "post-lunch glycemia",
      "after meal sugar reading",
      "glucose level post meal",
      "sugar reading post-meal",
      "post-meal glycemic index",
      "postprandial blood sugar test",
      "blood sugar after meals",
      "after eating glucose test",
      "post-meal blood test",
      "2-hour post-meal test",
      "post-meal glycemic measurement",
      "post-meal sugar control",
      "post-dinner glycemia",
      "post-eating glycemic test",
      "after meal blood sugar",
      "post-dinner glucose reading",
      "post-meal glucose tolerance",
      "post-lunch blood sugar",
      "glucose after dinner",
      "post-meal glycemic reading",
      "blood sugar 2 hours after meal",
      "post-eating glycemia level",
      "post-meal sugar tolerance",
      "after-eating glucose index",
      "after-eating blood sugar reading",
      "post-meal glycemia reading",
      "2-hour sugar level",
      "postprandial glycemia measurement",
      "after eating sugar tolerance",
      "post-meal glucose control",
      "post-lunch sugar reading",
      "blood sugar post-eating",
      "post-eating blood sugar test",
      "after-dinner glucose tolerance",
      "after eating glucose measurement",
      "postprandial sugar control",
      "blood sugar after eating test",
      "post-meal glucose measurement",
      "2-hour glucose tolerance",
      "after-dinner sugar reading",
      "post-meal blood sugar measurement",
      "post-meal sugar index",
      "2-hour glycemic index",
      "post-lunch blood glucose",
      "blood glucose 2 hours post-meal",
      "post-meal sugar test result",
      "after eating sugar result",
      "post-lunch glucose tolerance",
      "post-meal glycemia test",
      "2-hour sugar test result",
      "post-meal glycemic test result",
      "post-meal glucose reading",
      "post-eating glucose test",
      "blood sugar 2 hours after eating",
      "postprandial glucose reading",
      "post-dinner glycemic measurement",
      "post-lunch glycemic reading",
    ],
  };

  // Function to normalize the found term to standard key
  function normalizeTerm(term) {
    for (const key in synonyms) {
      if (synonyms[key].includes(term.toLowerCase())) {
        return key;
      }
    }
    return null;
  }

  // Function to extract blood sugar levels using regular expressions
  function extractBloodSugar(text) {
    const fastingPattern =
      /(\bfasting\b|\bpre-meal\b|\bovernight\b|\bfasting glucose\b)[^0-9]*([\d]+)\s?mg\/dL/gi;
    const postprandialPattern =
      /(\bpostprandial\b|\bafter meal\b|\bpost-meal\b|\b2-hour glucose\b)[^0-9]*([\d]+)\s?mg\/dL/gi;

    let results = {
      fasting_blood_sugar: null,
      postprandial_blood_sugar: null,
    };

    let fastingMatch;
    while ((fastingMatch = fastingPattern.exec(text)) !== null) {
      const term = fastingMatch[1];
      const value = fastingMatch[2];
      results.fasting_blood_sugar = { term: normalizeTerm(term), value: value };
    }

    let postprandialMatch;
    while ((postprandialMatch = postprandialPattern.exec(text)) !== null) {
      const term = postprandialMatch[1];
      const value = postprandialMatch[2];
      results.postprandial_blood_sugar = {
        term: normalizeTerm(term),
        value: value,
      };
    }

    return results;
  }

  // Function to evaluate blood sugar levels
  function evaluateBloodSugar(fastingBloodSugar, postprandialBloodSugar) {
    const fastingRanges = {
      normal: { min: 0, max: 99 },
      preDiabetes: { min: 100, max: 125 },
      diabetes: { min: 126, max: Infinity },
    };

    const postprandialRanges = {
      normal: { min: 0, max: 139 },
      preDiabetes: { min: 140, max: 199 },
      diabetes: { min: 200, max: Infinity },
    };

    function evaluateFastingBloodSugar(fastingBloodSugar) {
      if (fastingBloodSugar < fastingRanges.normal.max) {
        return "Normal";
      } else if (
        fastingBloodSugar >= fastingRanges.preDiabetes.min &&
        fastingBloodSugar <= fastingRanges.preDiabetes.max
      ) {
        return "Pre-diabetes (Impaired Fasting Glucose)";
      } else if (fastingBloodSugar >= fastingRanges.diabetes.min) {
        return "Diabetes";
      }
    }

    function evaluatePostprandialBloodSugar(postprandialBloodSugar) {
      if (postprandialBloodSugar < postprandialRanges.normal.max) {
        return "Normal";
      } else if (
        postprandialBloodSugar >= postprandialRanges.preDiabetes.min &&
        postprandialBloodSugar <= postprandialRanges.preDiabetes.max
      ) {
        return "Pre-diabetes (Impaired Glucose Tolerance)";
      } else if (postprandialBloodSugar >= postprandialRanges.diabetes.min) {
        return "Diabetes";
      }
    }

    const fastingResult = evaluateFastingBloodSugar(fastingBloodSugar);
    const postprandialResult = evaluatePostprandialBloodSugar(
      postprandialBloodSugar
    );

    let resultMessage = " Fasting Blood Sugar: ${fastingBloodSugar} mg/dL (${fastingResult})\n";
    resultMessage += "Postprandial Blood Sugar: ${postprandialBloodSugar} mg/dL (${postprandialResult})\n\n";

    if (fastingResult === "Normal" && postprandialResult === "Normal") {
      resultMessage += "Your blood sugar levels are within the normal range.\n";
      resultMessage +=
        "Maintain a balanced diet, exercise regularly, and monitor your health periodically.";
    } else if (
      fastingResult === "Pre-diabetes (Impaired Fasting Glucose)" ||
      postprandialResult === "Pre-diabetes (Impaired Glucose Tolerance)"
    ) {
      resultMessage += "You are in the pre-diabetes range.\n";
      resultMessage +=
        "Consider lifestyle changes to prevent progression to diabetes, including diet and exercise.";
    } else if (
      fastingResult === "Diabetes" ||
      postprandialResult === "Diabetes"
    ) {
      resultMessage += "Your blood sugar levels indicate diabetes.\n";
      resultMessage +=
        "Consult with your healthcare provider for personalized treatment.";
    }

    return resultMessage;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "#388e3c",
      },
    },
  });

  const [paragraph, setParagraph] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const extractedValues = extractBloodSugar(paragraph);
    const fasting = extractedValues.fasting_blood_sugar?.value;
    const postBloodSugar = extractedValues.postprandial_blood_sugar?.value;

    if (fasting && postBloodSugar) {
      const evaluation = evaluateBloodSugar(
        Number(fasting),
        Number(postBloodSugar)
      );
      setResult(evaluation);
    } else {
      setResult("Could not extract blood sugar levels from the text provided.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" style={{ marginTop: "2rem" }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Blood Sugar Evaluation
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Enter medical report text"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Evaluate
          </Button>
        </form>

        {result && (
          <Box
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #388e3c",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" color="primary">
              Result:
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {result}
            </Typography>
          </Box>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default AnalysisReport;