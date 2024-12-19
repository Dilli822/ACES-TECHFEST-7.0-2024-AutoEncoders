import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorProfileUpdate from "../Doctor/updateDoctor";
import Appointment from "../../Appointment/Appointment";
import AppHeader from "../../header/header";
import { Grid, Container } from "@mui/material";
import AnyUserProfileUpdate from "./updateAnonyUser";
import FreeTimeSlots from "../../Appointment/Free_Slot_Time";
import AppointmentPlacementsList from "../../Appointment/appoint_placed";
import ReportUploadForm from "../../healthReport/ReportUploadForm";
import OCRComponent from "../../reportTranslator/reportExtracter";
import AppFooter from "../../footer/footer";
import {
  Typography,
  TableBody,
  Box,
  TextField,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AnnoyUser = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: "example.jpg", url: "https://example.com/image.jpg" },
    { id: 2, name: "report.pdf", url: "https://example.com/report.pdf" },
  ]);
  useEffect(() => {
    // Check user role based on localStorage

    if (
      localStorage.getItem("is_doctor") !== "true" &&
      localStorage.getItem("is_mediatationTeacher") == true &&
      localStorage.getItem("is_annoymousUser") != true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/mediator-teacher");
    }

    if (
      localStorage.getItem("is_doctor") !== "true" &&
      localStorage.getItem("is_mediatationTeacher") !== true &&
      localStorage.getItem("is_annoymousUser") == true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/user/");
    }

    if (
      localStorage.getItem("is_doctor") === "true" &&
      localStorage.getItem("is_mediatationTeacher") !== true &&
      localStorage.getItem("is_annoymousUser") !== true
    ) {
      // Optional: Navigate to the doctor profile page if needed
      navigate("/profile/doctor/");
    }
  }, [navigate]);

  const handleUpload = () => {};
  const theme = useTheme();
  return (
    <>
      <AppHeader />
      <Container maxWidth={"lg"}>
        <Grid container spacing={3}>
          <Grid item md={4}>
            <AnyUserProfileUpdate />
          </Grid>
          <Grid item md={8}>
            {/*
          <Container
        sx={{
          my: "20px",
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#ffffff",
        }}
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
          Save Your Report Here
        </Typography>
        <Grid item>
          <Box
            display="flex"
            alignItems="stretch"
            justifyContent="space-between"
            width="100%"
            height="100%"
            gap={5}
          >
            <TextField
              type="file"
              fullWidth
              inputProps={{ accept: "image/*,application/pdf" }}
              style={{ height: "100%" }}
              variant="outlined"
            />
            <Button
              variant="contained"
              style={{ width: "20%" }}
              color="primary"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </Box>
        </Grid>
        <br></br>
        <hr></hr>
       
          <Box mt={4}>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            Uploaded Files
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Image Name</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {uploadedFiles.map((file, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <img
                        src={file.url}
                        alt={file.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell>{file.name}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ marginRight: 1 }}
                      >
                        View
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        // onClick={() => handleDelete(file.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      */}

            <OCRComponent />
          </Grid>
        </Grid>

        <br />

        <Grid item md={12}></Grid>
        <br />
        <br />
      </Container>
      <AppFooter></AppFooter>
    </>
  );
};

export default AnnoyUser;
