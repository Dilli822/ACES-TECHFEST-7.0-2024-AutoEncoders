import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Alert,
  Container,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from "../header/header";
import AppFooter from "../footer/footer";
import { BarChart } from "@mui/x-charts/BarChart";

const xLabels = ["accuracy", "precision", "error", "f1_score"];

const formFields = [
  { label: "Mean Radius", name: "radius_mean" },
  { label: "Mean Texture", name: "texture_mean" },
  { label: "Mean Perimeter", name: "perimeter_mean" },
  { label: "Mean Area", name: "area_mean" },
  { label: "Perimeter Error", name: "perimeter_error" },
  { label: "Area Error", name: "area_error" },
  { label: "Worst Radius", name: "radius_worst" },
  { label: "Worst Texture", name: "texture_worst" },
  { label: "Worst Perimeter", name: "perimeter_worst" },
  { label: "Worst Area", name: "area_worst" },
];

function CancerPredictionForm() {
  const [formData, setFormData] = useState(
    Object.fromEntries(formFields.map((field) => [field.name, ""]))
  );
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [chartData, setChartData] = useState({
    accuracy: 0.0,
    precision: 0.0,
    error: 0.0,
    f1_score: 0.0,
  });
  const theme = useTheme();

  const validateNumericFields = () => {
    for (let key in formData) {
      const value = formData[key];
      if (isNaN(value) || value <= 0) {
        return "All fields must be valid positive numbers!";
      }
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    for (let key in formData) {
      if (!formData[key]) {
        setError("All fields are required!");
        setLoading(false);
        return;
      }
    }

    const numericError = validateNumericFields();
    if (numericError) {
      setError(numericError);
      setLoading(false);
      return;
    }

    const inputData = [
      Object.values(formData).map((value) => parseFloat(value)),
    ];

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/sushtiti/cancer/predict-cancer/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ input_data: inputData }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Form submitted successfully!");
        setResponseData(data);

        // Update chart data with the values from the response
        const { accuracy, precision, f1_score } = data;
        const error = 1 - accuracy;

        setChartData({
          accuracy,
          precision,
          error,
          f1_score,
        });

        setFormData(
          Object.fromEntries(formFields.map((field) => [field.name, ""]))
        );
      } else {
        setError(`Error: ${data.message || "Something went wrong"}`);
      }
    } catch (err) {
      setError("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container sx={{ my: "50px" }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={8}>
            <Box
              sx={{
                maxWidth: "100%",
                padding: 4,
                borderRadius: 5,
                boxShadow: 4,
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h4"
                align="center"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                Cancer Prediction
              </Typography>
              <Typography
                variant="body2"
                align="center"
                sx={{ color: "red", fontWeight: "light", mb: "30px" }}
              >
                Predict the likelihood of cancer based on various features. AI
                Only for Assist Check the probability of having diabetes or not.
                This information is intended only for doctors and professionally
                authorized healthcare providers for further evaluation and
                diagnosis.
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {formFields.map(({ label, name }) => (
                    <Grid item xs={12} sm={4} key={name}>
                      <TextField
                        fullWidth
                        label={label}
                        variant="standard"
                        name={name}
                        value={formData[name]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        type="number"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                  ))}
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    style={{ marginTop: "30px" }}
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
                <br />
                {error && (
                  <Alert severity="error" sx={{ marginBottom: 2 }}>
                    {error}
                  </Alert>
                )}
                {success && (
                  <Alert severity="success" sx={{ marginBottom: 2 }}>
                    {success}
                  </Alert>
                )}
              </form>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                maxWidth: "100%",
                padding: 4,
                borderRadius: 5,
                boxShadow: 4,
                backgroundColor: "white",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
              >
                Cancer Diagnosis Prediction Comparison Statistics Data
              </Typography>

              <BarChart
                width={300}
                height={300}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
                series={[
                  {
                    data: [chartData.accuracy],
                    label: "Accuracy",
                    id: "accId",
                  },
                  {
                    data: [chartData.precision],
                    label: "Precision",
                    id: "preId",
                  },
                  { data: [chartData.error], label: "Error", id: "errId" },
                  { data: [chartData.f1_score], label: "F1 Score", id: "f1Id" },
                ]}
              />
              {responseData && responseData.predictions && (
                <Box sx={{ mt: 2 }}>
                  {responseData.predictions.map((prediction, index) => (
                    <Box
                      key={index}
                      sx={{
                        backgroundColor:
                          prediction === "Malignant" ? "#FFCDD2" : "#BBDEFB",
                        color:
                          prediction === "Malignant" ? "#B71C1C" : "#0D47A1",
                        borderRadius: 2,
                        padding: 2,
                        marginBottom: 2,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontWeight: "bold", fontSize: "14px" }}
                      >
                        Prediction {index + 1}:{" "}
                        {prediction === "Malignant" ? (
                          <>
                            Malignant (Cancerous) - Please consult with a
                            healthcare professional for further evaluation.
                          </>
                        ) : (
                          <>
                            Benign - This result suggests a non-cancerous
                            condition, but consulting with a doctor is
                            recommended for confirmation.
                          </>
                        )}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
              <Box sx={{ mt: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    color: "white",
                    backgroundColor: "purple",
                    borderRadius: 2,
                    padding: 2,
                    marginBottom: 2,
                  }}
                >
                  **Disclaimer**: <br />
                  The predictions provided by this tool are totally Machine
                  Learning Model and should not be used as a sole basis for
                  making medical decisions. This tool is intended only for use
                  by licensed medical practitioners.
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <AppFooter />
    </>
  );
}

export default CancerPredictionForm;
