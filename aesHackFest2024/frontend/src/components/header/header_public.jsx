import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppLogo from "../assets/MEROHEALTHLOGO.jpeg";

const HeaderPublic = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu

  // Handle dropdown menu
  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handlePredictionNavigation = (path) => {
    navigate(path); // Navigate to the selected page
    handleDropdownClose();
  };

  return (
    <>
      <AppBar position="sticky" sx={{ bgcolor: "#FFFFFF", color: "#000" }}>
        <Container maxWidth={"lg"}>
          <Grid container style={{ display: "flex", alignItems: "center" }}>
            <Grid item xs={6}>
              <Link to="/">
                <img src={AppLogo} alt="App Logo" style={{ width: "70px" }} />
              </Link>
            </Grid>

            <Grid item xs={6}>
              <Grid
                container
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Grid item>
                  <Link to="/aptitude-test" underline="none">
                    <Button
                      variant="text"
                      sx={{
                        color: "#000",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Aptitude Test
                    </Button>
                  </Link>
                </Grid>

                <Grid item>
                  <Link to="/community" underline="none">
                    <Button
                      variant="text"
                      sx={{
                        color: "#000",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      Join Community
                    </Button>
                  </Link>
                </Grid>

                <Grid item>
                  {localStorage.getItem("accessToken") ? (
                    <>
                      <Button
                        variant="text"
                        onClick={handleDropdownClick} // Trigger dropdown menu
                        sx={{
                          color: "#000",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        AI Diagnosis Test &nbsp;
                        <i
                          className="fa fa-caret-down"
                          style={{
                            fontSize: "24px",
                            color: "green",
                          }}
                        ></i>
                      </Button>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleDropdownClose}
                        PaperProps={{
                          style: {
                            maxHeight: 48 * 4.5, // Optional: Limit height for long lists
                            width: "20ch",
                          },
                        }}
                      >
                        <MenuItem
                          onClick={() =>
                            handlePredictionNavigation("/ai-prediction/cancer")
                          }
                        >
                          Cancer Prediction
                        </MenuItem>
                        <MenuItem
                          onClick={() =>
                            handlePredictionNavigation(
                              "/ai-prediction/diabetes"
                            )
                          }
                        >
                          Diabetes Prediction
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <div />
                  )}
                </Grid>

                <Grid item>
                  {localStorage.getItem("accessToken") ? (
                    <Link to="/profile/user" underline="none">
                      <Button
                        variant="text"
                        sx={{
                          color: "#000",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        Profile
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login" underline="none">
                      <Button
                        variant="text"
                        sx={{
                          color: "#000",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "transparent",
                          },
                        }}
                      >
                        Login/Signup
                      </Button>
                    </Link>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AppBar>
    </>
  );
};

export default HeaderPublic;
