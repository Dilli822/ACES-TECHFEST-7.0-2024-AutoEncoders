import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Tesseract from "tesseract.js";

const OCRComponent = () => {
  const [paragraph, setParagraph] = useState("");
  const [result, setResult] = useState("");
  const [image, setImage] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [translatedText, setTranslatedText] = useState("");
  const [isPlayingTranslated, setIsPlayingTranslated] = useState(false);
  const [translatedUtterance, setTranslatedUtterance] = useState(null);
  const [translatedData, setTranslatedData] = useState(null); // State to store translated data

  const theme = createTheme({
    palette: {
      primary: {
        main: "#388e3c",
      },
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const extractedValues = extractBloodSugar(paragraph);
    const fasting = extractedValues.fasting_blood_sugar?.value;
    const postBloodSugar = extractedValues.postprandial_blood_sugar?.value;

    let evaluation =
      "Could not extract blood sugar levels from the text provided.";

    if (fasting && postBloodSugar) {
      evaluation = evaluateBloodSugar(Number(fasting), Number(postBloodSugar));
    }

    // Store the result
    setResult(evaluation);

    // Create an utterance for speech synthesis
    const newUtterance = new SpeechSynthesisUtterance(evaluation);
    setUtterance(newUtterance);
    window.speechSynthesis.speak(newUtterance);
    setIsPlaying(true);
  };

  const stopSpeech = () => {
    if (utterance) {
      window.speechSynthesis.cancel(); // Stops the ongoing speech
      setIsPlaying(false); // Update state to reflect speech is stopped
      setUtterance(null); // Reset the utterance
    }
  };

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.pause(); // Pause the speech
      setIsPlaying(false);
    } else {
      // If speech was stopped (utterance is null), restart from the beginning
      if (!utterance) {
        const newUtterance = new SpeechSynthesisUtterance(result);
        setUtterance(newUtterance);
        window.speechSynthesis.speak(newUtterance);
      } else {
        window.speechSynthesis.resume(); // Resume the speech if it's paused
      }
      setIsPlaying(true);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));

      Tesseract.recognize(file, "eng", {
        logger: (m) => console.log(m),
      }).then(({ data: { text } }) => {
        setParagraph(text);
      });
    }
  };

  const sendToBackend = async (evaluationText) => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/sushtiti/report/submit-text/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text: evaluationText }),
        }
      );

      const data = await response.json();
      setTranslatedText(data.translated_text); // Assuming the response contains the translated_text field
      setTranslatedData(data); // Save the full response in state
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  function extractBloodSugar(text) {
    const fastingPattern = /\bFASTING BLOOD SUGAR\b\s*(\d{2,3})\b/i;
    const postprandialPattern = /\bPOST PRANDIAL BLOOD SUGAR\b.*?(\d{2,3})\b/i;

    let results = {
      fasting_blood_sugar: null,
      postprandial_blood_sugar: null,
    };

    const fastingMatch = fastingPattern.exec(text);
    if (fastingMatch) {
      results.fasting_blood_sugar = {
        term: "fasting_blood_sugar",
        value: fastingMatch[1],
      };
    }

    const postprandialMatch = postprandialPattern.exec(text);
    if (postprandialMatch) {
      results.postprandial_blood_sugar = {
        term: "postprandial_blood_sugar",
        value: postprandialMatch[1],
      };
    }

    return results;
  }

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

    let resultMessage = `Fasting Blood Sugar: ${fastingBloodSugar} mg/dL (${fastingResult})\n`;
    resultMessage += `Postprandial Blood Sugar: ${postprandialBloodSugar} mg/dL (${postprandialResult})\n\n`;

    if (fastingResult === "Normal" && postprandialResult === "Normal") {
      resultMessage += "Your blood sugar levels are within the normal range.\n";
      resultMessage +=
        "Maintain a balanced diet, exercise regularly, and monitor your health periodically.           Remember: Model can make mistakes. This model is only to assist/pre-informed you. Please consult your doctor for 100% accurate report translation.";
    } else if (
      fastingResult === "Pre-diabetes (Impaired Fasting Glucose)" ||
      postprandialResult === "Pre-diabetes (Impaired Glucose Tolerance)"
    ) {
      resultMessage += "You are in the pre-diabetes range.\n";
      resultMessage +=
        "Consider lifestyle changes to prevent progression to diabetes, including diet and exercise.           Remember: Model can make mistakes. This model is only to assist/pre-informed you. Please consult your doctor for 100% accurate report translation.";
    } else if (
      fastingResult === "Diabetes" ||
      postprandialResult === "Diabetes"
    ) {
      resultMessage += "Your blood sugar levels indicate diabetes.\n";
      resultMessage +=
        "Consult with your healthcare provider for personalized treatment.Remember: Model can make mistakes. This model is only to assist/pre-informed you. Please consult your doctor for 100% accurate report translation.";
    }

    return resultMessage;
  }

  return (
    <ThemeProvider theme={theme}>
      <br />
      <Container
        style={{
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
        }}
      >
        <br />
        <Typography variant="h4" align="left" color="primary" gutterBottom>
          OCR Simple Report Analysis (Only Diabetes)
        </Typography>
        <Typography variant="body2" align="left" color="purple" gutterBottom>
          Remember: Model can make mistakes. This model is only to assist/pre-informed you.
          Please consult your doctor for 100% accurate report translation.
        </Typography>
        <br />

        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ marginBottom: "1rem", display: "block" }}
          />
          <TextField
            label="Extracted medical report text"
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            style={{ marginBottom: "1rem" }}
          />
          <Button type="submit" variant="contained" color="primary">
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
            <Button
              onClick={toggleSpeech}
              variant="contained"
              color={isPlaying ? "secondary" : "primary"}
            >
              {isPlaying ? "Pause Speech" : "Play Speech"}
            </Button>
            &nbsp; &nbsp;
            <Button onClick={stopSpeech} variant="contained" color="secondary">
              Stop Speech
            </Button>
          </Box>
        )}

        <Button
          onClick={() => sendToBackend(result)}
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem" }}
        >
          Translate
        </Button>

        <br />
        <br />

        {/* Render translated data */}
        {translatedData && (
          <Box
            style={{
              marginTop: "1rem",
              padding: "1rem",
              border: "1px solid #388e3c",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" color="primary">
              Translated Data:
            </Typography>
            <Typography variant="body1">
              <br></br>
              <strong>Analysis:</strong> {translatedData.text}
            </Typography>{" "}
            <br />
            <Typography variant="body1">
              <strong>In Nepali Text:</strong> <br></br>
              {translatedData.translated_text}
            </Typography>
            <br />
            <Typography variant="body1">
              <strong>Play in Translated Nepali Voice:</strong>
              <br />
              <audio controls>
                <source src={translatedData.voice_url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </Typography>
          </Box>
        )}
        <br />
        <br />
      </Container>
    </ThemeProvider>
  );
};

export default OCRComponent;
