// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   Typography,
//   Box,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Container,
//   Button,
//   Grid,
// } from "@mui/material";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import Emergency from "../Emergency/Emergency";
// import Widget from "../Widget/Widget";
// import Projects from "../Project/Projects";
// import Join from "../Join/Join";
// // import DoctorsList from "../nearby/doctorsNearby";
// import HospitalList from "../hospitals/hosiptals";
// import brainImg from "../assets/brainImg.png";
// import EmergencySupport from "../Emergency/Emergency";
// import HopeLight from "../assets/img/mix/IdeaHopeLight.jpg"
// import FAQsSection from "../FAQs/FAQS";

// export default function LandingPage() {
//   return (
//     <>
//       {/* <Emergency /> */}
//       {/* <Carousel/> */}
//       <Container maxWidth={"lg"}>
//         <Grid
//           container
//           mt={"5rem"}
//           style={{ display: "flex", alignItems: "center" }}
//         >
//           <Grid item md={7}>
//           <Typography variant="h2">Health is Wealth!</Typography>
//             <Typography variant="h4">Hamro Swasthya! Ramro Swasthya</Typography>
//             <br />

//             <Typography align="left" variant="body1">

//             Mero Health is a AI-Powered Health Application  designed to simplify health reports for the general public. 
//             It predicts the likelihood of conditions like breast cancer, diabetes, and dengue using Machine Learning algorithms.
//             The app also features a lightweight mental health test based on a static questions, helping users assess their well-being. 
//             Additionally, Mero Health offers a live chat feature for support and a community platform where users can connect and share experiences. 
            
//             </Typography>

//             <br />
//             <Link to="/login">
//               <Button variant="contained" sx={{ color: "#fff" }}>
//                 Let's Get Started
//               </Button>
//             </Link>
//             &nbsp;  &nbsp;
    
//           </Grid>

//           <Grid item md={5}>
//             <img src="https://cdn.dribbble.com/users/2221077/screenshots/14110896/media/f6bd29562775b724409df2c851c5b49c.gif" alt="" style={{ maxWidth: "100%" }} />
//           </Grid>
//         {/* Add content inside the Grid if needed */}
//         </Grid>
//         <br />
//         <br />
//         <br />
//         <br />
//         <Join />
 
//         <br />
//         <br />
//         <br />
//         <Widget />
//         <hr/>
//         <br />
//         <HospitalList />
//         <br />
//         <br />
//         {/* <EmergencySupport/> */}
//         <br />
//         <br />
//         {/* <Grid container spacing={2} alignItems="center" padding={4}>
//         <Grid
//           item
//           xs={12}
//           md={7}
//           sx={{ display: "flex", justifyContent: "center" }}
//         >
//           <Box position="relative" display="inline-block">
//             <Box
//               sx={{
//                 position: "absolute",
//                 bottom: "-4px",
//                 left: "-4px",
//                 width: "32rem", // Increased width
//                 height: "20rem", // Increased height
//                 backgroundColor: "#4FC3F7",
//                 transform: "rotate(12deg)",
//                 zIndex: -1,
//               }}
//             ></Box>
//             <Box
//               component="img"
//               // src="https://media.istockphoto.com/id/1428194995/vector/idea-concept-with-one-line-bulbs-innovation-idea-process-of-untangling-wire-to-supply.jpg?s=612x612&w=0&k=20&c=955im8MKedyPep1Yd6z9myTWZM05p8iO8HSC5jzEU4k="
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkVgN4AkzhVWhW5RC0_ElVjenbKuAvZwulA&s"
//               alt="Smiling person"
//               sx={{
//                 width: "34rem", // Increased width
//                 height: "20rem", // Increased height
//                 objectFit: "cover",
//                 borderRadius: "0.75rem",
//                 zIndex: 1,
//                 position: "relative",
//               }}
//             />
//           </Box>
//         </Grid>
//         <Grid item xs={12} md={5}>
//           <Typography gutterBottom sx={{ fontSize: "32px", fontWeight: "" }}>

//           </Typography>
//           <Typography variant="body1" gutterBottom>
            
//           </Typography>

//           <br />
//         </Grid>
//       </Grid> */}
      
//         <br />
//         <br />
//         <br />
       
//         <>
// <FAQsSection/>
//           </>
//           <hr />
//           <br />
//           <br />
//           {/* <Grid container>
//             <Grid item md={11}>
//               <Typography
//                 variant="h3"
//                 align="left"
//                 mb={2}
//                 sx={{ color: "#000" }}
//               >
//                 Frequently Asked Questions
//               </Typography>
//               <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
//                 Curiosity is an important part of taking care of ourselves and
//                 those we care about.
//               </Typography>
     
//               <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
//                 Asking questions and staying informed helps protect and improve
//                 our emotional health.
//               </Typography>
//             </Grid>
//           </Grid>
//           <br />
//           <hr />
//           <br />
//           <br />
//           <Box>
//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel1a-content"
//                 id="panel1a-header"
//               >
//                 <Typography variant="h6">
//                   What exactly is “mental health”?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   Mental health refers to cognitive, behavioral, and emotional
//                   well-being. It is all about how people think, feel, and
//                   behave. Mental health is important at every stage of life,
//                   from childhood and adolescence through adulthood.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel2a-content"
//                 id="panel2a-header"
//               >
//                 <Typography variant="h6">
//                   What’s the difference between day-to-day emotional struggles
//                   and mental health conditions?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   Day-to-day emotional struggles are normal responses to life’s
//                   challenges and stressors. However, mental health conditions
//                   involve persistent symptoms that affect a person’s thoughts,
//                   feelings, or behaviors and cause significant distress or
//                   impairment in daily functioning.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel3a-content"
//                 id="panel3a-header"
//               >
//                 <Typography variant="h6">
//                   What happens when mental health issues aren’t addressed?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   Untreated mental health issues can worsen over time and lead
//                   to difficulties in relationships, work, school, and overall
//                   quality of life. It’s important to seek help and support early
//                   to prevent these negative outcomes.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel4a-content"
//                 id="panel4a-header"
//               >
//                 <Typography variant="h6">
//                   What are mental health professionals for?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   Mental health professionals, such as psychologists,
//                   psychiatrists, counselors, and therapists, are trained to
//                   assess, diagnose, and treat various mental health conditions.
//                   They provide therapy, medication management, and support to
//                   individuals experiencing mental health challenges.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel5a-content"
//                 id="panel5a-header"
//               >
//                 <Typography variant="h6">
//                   How can we improve and protect our mental health?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   There are several ways to improve and protect mental health,
//                   including practicing self-care, maintaining social
//                   connections, staying physically active, managing stress
//                   effectively, getting enough sleep, and seeking professional
//                   help when needed.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion>

//             <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
//               <AccordionSummary
//                 expandIcon={<ExpandMoreIcon />}
//                 aria-controls="panel6a-content"
//                 id="panel6a-header"
//               >
//                 <Typography variant="h6">
//                   What if I’m overwhelmed and don’t know where to start?
//                 </Typography>
//               </AccordionSummary>
//               <AccordionDetails>
//                 <Typography variant="body1">
//                   If you’re feeling overwhelmed, it’s important to reach out for
//                   support. Talk to a trusted friend, family member, or mental
//                   health professional who can provide guidance and help you
//                   navigate your feelings and options for support.
//                 </Typography>
//               </AccordionDetails>
//             </Accordion> */}


//           {/* </Box>
//         </Box> */}
//       </Container>
//     </>
//   );
// }




import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Container,
  Button,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Emergency from "../Emergency/Emergency";
import Widget from "../Widget/Widget";
import Projects from "../Project/Projects";
import Join from "../Join/Join";
// import DoctorsList from "../nearby/doctorsNearby";
import HospitalList from "../hospitals/hosiptals";
import brainImg from "../assets/brainImg.png";
import EmergencySupport from "../Emergency/Emergency";
import HopeLight from "../assets/img/mix/IdeaHopeLight.jpg";
import FAQsSection from "../FAQs/FAQS";

const heros = ["/hero1.png", "/hero2.png", "/hero3.png"];
export default function LandingPage() {
  const randomHero = heros[Math.floor(Math.random() * heros.length)];
  return (
    <>
      {/* <Emergency /> */}
      {/* <Carousel/> */}
      <Container maxWidth={"lg"}>
        <Grid
          container
          mt={"5rem"}
          style={{ display: "flex", alignItems: "center" }}
        >
          <Grid item md={8}>
            <Typography variant="h2">Health is Wealth!</Typography>
            <Typography variant="h4">Hamro Swasthya! Ramro Swasthya</Typography>
            <br />
            <Typography align="left" variant="body1" textAlign="justify">
            Mero Health is an AI-powered app that predicts the likelihood of conditions like breast cancer and diabetes.
            It includes a simple and static mental health test, live chat support, and a community platform for user interaction.
            </Typography>
            <br />
            <Link to="/login">
              <Button variant="contained" sx={{ color: "#fff" }}>
                Let's Get Started
              </Button>
            </Link>
            &nbsp; &nbsp;
          </Grid>

          <Grid item md={4}>
            <img
              src={randomHero}
              alt=""
              style={{ maxWidth: "100%", objectFit: "fill" }}
            />
          </Grid>
          {/* Add content inside the Grid if needed */}
        </Grid>
        <br />
        <br />
        <br />
        <br />
        <Join />

        <br />
        <br />
        <br />
        <Widget />
        <hr />
        <br />
        <HospitalList />
        <br />
        <br />
        {/* <EmergencySupport/> */}
        <br />
        <br />
        {/* <Grid container spacing={2} alignItems="center" padding={4}>
        <Grid
          item
          xs={12}
          md={7}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Box position="relative" display="inline-block">
            <Box
              sx={{
                position: "absolute",
                bottom: "-4px",
                left: "-4px",
                width: "32rem", // Increased width
                height: "20rem", // Increased height
                backgroundColor: "#4FC3F7",
                transform: "rotate(12deg)",
                zIndex: -1,
              }}
            ></Box>
            <Box
              component="img"
              // src="https://media.istockphoto.com/id/1428194995/vector/idea-concept-with-one-line-bulbs-innovation-idea-process-of-untangling-wire-to-supply.jpg?s=612x612&w=0&k=20&c=955im8MKedyPep1Yd6z9myTWZM05p8iO8HSC5jzEU4k="
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgkVgN4AkzhVWhW5RC0_ElVjenbKuAvZwulA&s"
              alt="Smiling person"
              sx={{
                width: "34rem", // Increased width
                height: "20rem", // Increased height
                objectFit: "cover",
                borderRadius: "0.75rem",
                zIndex: 1,
                position: "relative",
              }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={5}>
          <Typography gutterBottom sx={{ fontSize: "32px", fontWeight: "" }}>

          </Typography>
          <Typography variant="body1" gutterBottom>
            
          </Typography>

          <br />
        </Grid>
      </Grid> */}

        <br />
        <br />
        <br />

        <>
          <FAQsSection />
        </>
        <hr />
        <br />
        <br />
        {/* <Grid container>
            <Grid item md={11}>
              <Typography
                variant="h3"
                align="left"
                mb={2}
                sx={{ color: "#000" }}
              >
                Frequently Asked Questions
              </Typography>
              <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
                Curiosity is an important part of taking care of ourselves and
                those we care about.
              </Typography>
     
              <Typography align="left" sx={{ color: "#000", fontSize: "18px" }}>
                Asking questions and staying informed helps protect and improve
                our emotional health.
              </Typography>
            </Grid>
          </Grid>
          <br />
          <hr />
          <br />
          <br />
          <Box>
            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography variant="h6">
                  What exactly is “mental health”?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Mental health refers to cognitive, behavioral, and emotional
                  well-being. It is all about how people think, feel, and
                  behave. Mental health is important at every stage of life,
                  from childhood and adolescence through adulthood.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography variant="h6">
                  What’s the difference between day-to-day emotional struggles
                  and mental health conditions?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Day-to-day emotional struggles are normal responses to life’s
                  challenges and stressors. However, mental health conditions
                  involve persistent symptoms that affect a person’s thoughts,
                  feelings, or behaviors and cause significant distress or
                  impairment in daily functioning.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3a-content"
                id="panel3a-header"
              >
                <Typography variant="h6">
                  What happens when mental health issues aren’t addressed?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Untreated mental health issues can worsen over time and lead
                  to difficulties in relationships, work, school, and overall
                  quality of life. It’s important to seek help and support early
                  to prevent these negative outcomes.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel4a-content"
                id="panel4a-header"
              >
                <Typography variant="h6">
                  What are mental health professionals for?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  Mental health professionals, such as psychologists,
                  psychiatrists, counselors, and therapists, are trained to
                  assess, diagnose, and treat various mental health conditions.
                  They provide therapy, medication management, and support to
                  individuals experiencing mental health challenges.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel5a-content"
                id="panel5a-header"
              >
                <Typography variant="h6">
                  How can we improve and protect our mental health?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  There are several ways to improve and protect mental health,
                  including practicing self-care, maintaining social
                  connections, staying physically active, managing stress
                  effectively, getting enough sleep, and seeking professional
                  help when needed.
                </Typography>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ backgroundColor: "#fff", color: "black", mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel6a-content"
                id="panel6a-header"
              >
                <Typography variant="h6">
                  What if I’m overwhelmed and don’t know where to start?
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  If you’re feeling overwhelmed, it’s important to reach out for
                  support. Talk to a trusted friend, family member, or mental
                  health professional who can provide guidance and help you
                  navigate your feelings and options for support.
                </Typography>
              </AccordionDetails>
            </Accordion> */}

        {/* </Box>
        </Box> */}
      </Container>
    </>
  );
}
