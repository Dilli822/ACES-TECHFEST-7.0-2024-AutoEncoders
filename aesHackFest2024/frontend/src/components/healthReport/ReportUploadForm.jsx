import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import medicalReport from "./staticData.json";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ReplayIcon from "@mui/icons-material/Replay";

const ReportUploadForm = () => {
  const theme = useTheme();
  const [result, setResult] = useState(medicalReport); // State to store the result

  const handleUpload = () => {
    // Simulate the result being available after upload
    setResult({
      title: "Scan Results",
      content: "Your report analysis is available.",
    });
  };
  // const [audioUrl, setAudioUrl] = useState(null); // State to store audio URL
  const audioUrl = "/song.mp3";
  const [isPlaying, setIsPlaying] = useState(false); // State to track audio play/pause
  const [audioElement, setAudioElement] = useState(null); // State to store the audio element reference

  // useEffect(() => {
  //   // Fetch the MP3 audio file from backend on component mount
  //   const fetchAudio = async () => {
  //     try {
  //       const response = await fetch("http://localhost:5000/audio");
  //       if (response.ok) {
  //         const audioBlob = await response.blob(); // Get the audio as a Blob
  //         const audioUrl = URL.createObjectURL(audioBlob); // Create a URL from Blob
  //         setAudioUrl(audioUrl); // Set the audio URL in state
  //       } else {
  //         console.error("Failed to fetch audio.");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching audio:", error);
  //     }
  //   };

  //   fetchAudio();
  // }, []); // Fetch the audio when the component mounts

  // Function to play or pause the audio
  const togglePlayPause = () => {
    if (audioElement) {
      if (isPlaying) {
        audioElement.pause();
      } else {
        audioElement.play();
      }
      setIsPlaying(!isPlaying); // Toggle the play/pause state
    }
  };

  // Function to reset the audio to the beginning
  const resetAudio = () => {
    if (audioElement) {
      audioElement.currentTime = 0; // Reset audio to the start
      if (!isPlaying) {
        audioElement.play(); // Auto play after reset if it was paused
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <Container sx={{ margin: "auto" }}>
        <Grid
          container
          spacing={3}
          sx={{
            padding: 2,
            borderRadius: 5,
            boxShadow: 4,
            backgroundColor: "white",
            width: "100%",
          }}
        >
          {/* Container with Image */}
          <Grid
            item
            xs={6}
            sx={{
              borderRadius: 5,
              backgroundColor: "#F0F0F0",
              width: "100%",
              position: "relative", // Set the position to relative for overlay positioning
            }}
          >
            {/* Image */}
            <img
              src="/scan.gif"
              alt="report.png"
              style={{
                width: "90%",
                height: "90%", // Set height to 100% to match the width
                borderRadius: "5px", // Optional: Add border radius to the image as well
                objectFit:"fit"
              }}
            />
          </Grid>

          {/* Container with Input Field */}
          <Grid item xs={6}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <Typography
                variant="h5"
                align="center"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: "bold",
                  mb: "3rem",
                }}
              >
                Scan Your report here
              </Typography>
              <TextField
                type="file"
                inputProps={{ accept: "image/*,application/pdf" }}
                fullWidth
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                style={{ marginTop: "10px" }}
                onClick={handleUpload}
              >
                Upload
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Conditional Container to Display Result */}
      {result && (
        <Container
          sx={{
            my: "30px",
            padding: 2,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#F8F9FA",
          }}
        >
          <Box sx={{ textAlign: "right" }}>
            {/* Play/Pause IconButton */}
            <IconButton
              color="primary"
              onClick={togglePlayPause}
              sx={{ marginTop: 2 }}
            >
              {isPlaying ? (
                <PauseIcon sx={{ fontSize: "36px" }} />
              ) : (
                <PlayArrowIcon sx={{ fontSize: "36px" }} />
              )}
            </IconButton>

            {/* Reset IconButton */}
            <IconButton
              color="secondary"
              onClick={resetAudio}
              sx={{ marginTop: 2, marginLeft: 2, fontSize: "36px" }}
            >
              <ReplayIcon sx={{ fontSize: "36px" }} />
            </IconButton>

            {/* Audio element */}
            {audioUrl && (
              <audio
                id="audio-element"
                src={audioUrl}
                controls={false} // Don't show the default controls
                style={{ marginTop: 20 }}
                ref={(audio) => setAudioElement(audio)} // Save the audio element reference
              />
            )}
          </Box>
          {/* Patient Details */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h6" align="left" gutterBottom>
              Patient Details
            </Typography>
            <Typography variant="body1" align="left">
              Patient ID: {result.patient.id}
            </Typography>
            <Typography variant="body1" align="left">
              Name: {result.patient.firstName} {result.patient.lastName}
            </Typography>
            <Typography variant="body1" align="left">
              Age: {result.patient.age}
            </Typography>
            <Typography variant="body1" align="left">
              Gender: {result.patient.gender}
            </Typography>
            <Typography variant="body1" align="left">
              Contact: {result.patient.contact.phone},{" "}
              {result.patient.contact.email}
            </Typography>
          </Box>
        </Container>
      )}
    </>
  );
};

export default ReportUploadForm;