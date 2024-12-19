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

const barData = [
  {
    predictions: [""],
    accuracy: 0.00,
    precision: 0.00,
    error: 0.00,
    recall: 0.00,
    f1_score: 0.00
  },
];

function CancerPredictionForm() {
  const xLabels = ["accuracy", "precision", "error", "f1_score"];
  const [formData, setFormData] = useState(
    Object.fromEntries(
      [
        "radius_mean",
        "texture_mean",
        "perimeter_mean",
        "area_mean",
        "smoothness_mean",
        "compactness_mean",
        "concavity_mean",
        "concave_points_mean",
        "symmetry_mean",
        "fractal_dimension_mean",
        "radius_se",
        "texture_se",
        "perimeter_se",
        "area_se",
        "smoothness_se",
        "compactness_se",
        "concavity_se",
        "concave_points_se",
        "symmetry_se",
        "fractal_dimension_se",
        "radius_worst",
        "texture_worst",
        "perimeter_worst",
        "area_worst",
        "smoothness_worst",
        "compactness_worst",
        "concavity_worst",
        "concave_points_worst",
        "symmetry_worst",
        "fractal_dimension_worst",
      ].map((key) => [key, ""])
    )
  );

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [chartData, setChartData] = useState({
    accuracy: 0.00,
    precision: 0.00,
    error: 0.00,
    f1_score: 0.00
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
          f1_score
        });

        setFormData(
          Object.fromEntries(Object.keys(formData).map((key) => [key, ""]))
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
                variant="h3"
                align="center"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                }}
              >
                Cancer Prediction
              </Typography>
              <Typography
                variant="h5"
                align="center"
                sx={{ color: "gray", fontWeight: "light", mb: "30px" }}
              >
                Predict the likelihood of cancer based on various features.
              </Typography>
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
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {Object.keys(formData).map((key) => (
                    <Grid item xs={12} sm={4} key={key}>
                      <TextField
                        fullWidth
                        label={key.replace(/_/g, " ").toUpperCase()}
                        variant="standard"
                        name={key}
                        value={formData[key]}
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
                variant="h5"
                align="left"
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
              >
                Cancer Diagnosis Prediction Statistics Data
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: "gray", mt: 2 }}
              >
                Comparison of accuracy, precision and error.
              </Typography>
              <BarChart
                width={300}
                height={300}
                series={[
                  { data: [chartData.accuracy], label: "acc", id: "accId" },
                  { data: [chartData.precision], label: "pre", id: "preId" },
                  { data: [chartData.error], label: "err", id: "errId" }, // Add third series
                  { data: [chartData.f1_score], label: "f1", id: "f1Id" },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />

              {responseData && responseData.predictions && (
                <Box sx={{ mt: 4 }}>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Predictions:
                  </Typography>
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
                      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                        Prediction {index + 1}: {prediction}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>

      <AppFooter />
    </>
  );
}

export default CancerPredictionForm;
