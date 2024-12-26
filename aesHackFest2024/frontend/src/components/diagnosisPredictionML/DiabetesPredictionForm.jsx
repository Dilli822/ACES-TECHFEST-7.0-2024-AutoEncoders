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

const DiabetesPredictionForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    Pregnancies: "",
    Glucose: "",
    BloodPressure: "",
    SkinThickness: "",
    Insulin: "",
    BMI: "",
    DiabetesPedigreeFunction: "",
    Age: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const [barData, setBarData] = useState([
    { prediction: "No Diabetes", accuracy: 0, error: 0 },
  ]);

  const xLabels = ["accuracy", "error"];

  // Prepare data for the chart
  const accuracyData = barData.map((item) => item.accuracy);
  const errorData = barData.map((item) => item.error);

  const validateNumericFields = () => {
    const { BMI, Glucose, Age } = formData;
    if (
      isNaN(BMI) ||
      isNaN(Glucose) ||
      isNaN(Age) ||
      BMI <= 0 ||
      Glucose <= 0 ||
      Age <= 0
    ) {
      return "BMI, Glucose, and Age must be valid positive numbers!";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Basic validation for empty fields
    if (
      !formData.Pregnancies ||
      !formData.Glucose ||
      !formData.BloodPressure ||
      !formData.SkinThickness ||
      !formData.Insulin ||
      !formData.BMI ||
      !formData.DiabetesPedigreeFunction ||
      !formData.Age
    ) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    // Validate numeric fields
    const numericError = validateNumericFields();
    if (numericError) {
      setError(numericError);
      setLoading(false);
      return;
    }

    // Format the data for API request
    const inputData = [
      [
        parseInt(formData.Pregnancies),
        parseInt(formData.Glucose),
        parseInt(formData.BloodPressure),
        parseInt(formData.SkinThickness),
        parseInt(formData.Insulin),
        parseFloat(formData.BMI),
        parseFloat(formData.DiabetesPedigreeFunction),
        parseInt(formData.Age),
      ],
    ];

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/sushtiti/diabetes/predict-diabetes/",
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
        setResponseData(data); // Store the response data
        setBarData([
          {
            prediction: data.prediction,
            accuracy: data.accuracy,
            error: 1 - data.accuracy,
          },
        ]);
        setFormData({
          Pregnancies: "",
          Glucose: "",
          BloodPressure: "",
          SkinThickness: "",
          Insulin: "",
          BMI: "",
          DiabetesPedigreeFunction: "",
          Age: "",
        });
      } else {
        setError(data.message || "Something went wrong");
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Box
                sx={{
                  maxWidth: 800,
                  padding: 4,
                  borderRadius: 5,
                  boxShadow: 4,
                  backgroundColor: "white",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h3"
                  align="center"
                  sx={{ color: theme.palette.primary.main, fontWeight: "bold" }}
                >
                  Diabetes Prediction
                </Typography>
                <Typography
                  variant="h5"
                  align="center"
                  sx={{
                    color: "red",
                    fontWeight: "light",
                    fontSize: "medium",
                    mb: "20px",
                  }}
                >
                  AI Only for Assist Check the probability of having diabetes or
                  not. This information is intended only for doctors and
                  professionally authorized healthcare providers for further
                  evaluation and diagnosis.
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
                    {/* Fields */}
                    {[
                      "Pregnancies",
                      "Glucose",
                      "BloodPressure",
                      "SkinThickness",
                      "Insulin",
                      "BMI",
                      "DiabetesPedigreeFunction",
                      "Age",
                    ].map((field) => (
                      <Grid item xs={12} sm={6} key={field}>
                        <TextField
                          fullWidth
                          label={field}
                          variant="outlined"
                          name={field}
                          value={formData[field]}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              [e.target.name]: e.target.value,
                            })
                          }
                          required
                          type={
                            field === "BMI" ||
                            field === "Glucose" ||
                            field === "Age"
                              ? "number"
                              : "text"
                          }
                        />
                      </Grid>
                    ))}
                    <Grid item xs={12}>
                      <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Submitting..." : "Submit"}
                      </Button>
                    </Grid>
                  </Grid>
                </form>
                {/* {responseData && (
                  <Box sx={{ marginTop: 4 }}>
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{ color: "green" }}
                    >
                      API Response:
                    </Typography>
                    <pre>{JSON.stringify(responseData, null, 2)}</pre>
                  </Box>
                )} */}
              </Box>
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
                align="center"
                sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
              >
                Diagnosis Statistics Data
              </Typography>
              <Typography
                variant="body1"
                align="center"
                sx={{ color: "gray", mt: 2 }}
              >
                Comparison of accuracy and error.
              </Typography>
              <BarChart
                width={300}
                height={300}
                series={[
                  { data: accuracyData, label: "Accuracy", id: "accId" },
                  { data: errorData, label: "Error", id: "errId" },
                ]}
                xAxis={[{ data: xLabels, scaleType: "band" }]}
              />
              {responseData && (
                <Box sx={{ marginTop: 1, textAlign: "" }}>
                  <Typography variant="body1" sx={{ color: "green" }}>
                    Based on the prediction, there is a high likelihood of
                    having diabetes. However, this result is generated by an AI
                    (Machine Learning) model and should not be considered a
                    definitive diagnosis.
                  </Typography>
                  <hr />

                  <Typography variant="h6" sx={{ color: "#002bff" }}>
                    Prediction: {responseData.prediction}
                  </Typography>
                  <Typography variant="h6" sx={{ color: "green" }}>
                    Accuracy: {(responseData.accuracy * 100).toFixed(2)}%
                  </Typography>
                  <Typography variant="h6" sx={{ color: "red" }}>
                    Error: {((1 - responseData.accuracy) * 100).toFixed(2)}%
                  </Typography>
                  <hr />
                  <Typography
                    variant="body1"
                    sx={{ color: "purple", marginTop: 1 }}
                  >
                    Please perform further health test, evaluation and
                    confirmation.
                  </Typography>
                </Box>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
      <AppFooter />
    </>
  );
};

export default DiabetesPredictionForm;
