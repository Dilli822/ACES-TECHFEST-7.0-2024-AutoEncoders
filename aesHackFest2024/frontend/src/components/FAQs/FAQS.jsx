import React from "react";

import {
  Link,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question: "What are the symptoms of diabetes?",
    answer:
      "Increased thirst, frequent urination, extreme fatigue, blurred vision, and slow healing of cuts or wounds.",
  },
  {
    question: "What are the signs of high blood pressure?",
    answer:
      "Often called the silent killer, high blood pressure typically has no symptoms but may cause headaches, shortness of breath, or nosebleeds in severe cases.",
  },
  {
    question: "What should I do if I have a cold?",
    answer:
      "Rest, drink plenty of fluids, and take over-the-counter medication for symptoms like fever or congestion. If symptoms worsen, consult a doctor.",
  },
  {
    question: "How can I treat a sore throat?",
    answer:
      "Gargle with warm salt water, drink warm fluids, rest your voice, and take over-the-counter pain relievers. See a doctor if symptoms persist.",
  },
  {
    question: "How do I treat a mild fever?",
    answer:
      "Drink fluids, rest, and take fever-reducing medication like ibuprofen or acetaminophen. If it persists, see a doctor.",
  },
  {
    question: "What are the symptoms of anxiety?",
    answer:
      "Restlessness, rapid heartbeat, excessive worry, difficulty concentrating, and muscle tension.",
  },
  {
    question: "Does Mero Health provide 100% accurate results?",
    answer:
      "Mero Health gives reliable predictions, but they are not 100% accurate. Always consult a doctor for a full diagnosis.",
  },
  {
    question: " Does Mero Health prescribe medicine?",
    answer:
      " No, Mero Health does not prescribe medicine. It provides health insights and predictions, but a doctor should be consulted for medication advice.",
  },
  {
    question: "Does Mero Health offer a mobile app?",
    answer:
      "Currently, Mero Health is available as a web application, but a mobile version may be available in the future.",
  },
  {
    question: "Is Mero Health free to use?",
    answer:
      "Mero Health offers both free and premium plans. The basic features, including health tracking and some diagnostic tools, are free to use. However, advanced features may require a subscription.",
  },
  {
    question: "Is our report secure in Mero Health?",
    answer:
      " Yes, your report is secure. Mero Health follows strict data privacy and security protocols to ensure that your personal health information is protected.",
  },
  {
    question: "Is tuberculosis (TB) a major concern in Nepal?",
    answer:
      "Yes, tuberculosis (TB) remains a significant health concern, particularly in rural areas of Nepal.",
  },
  {
    question:
      "What are the symptoms of cholera, and how is it spread in Nepal?",
    answer:
      "Cholera is a waterborne disease that spreads through contaminated water, leading to diarrhea and dehydration, particularly in areas with poor sanitation.",
  },
  {
    question: "How common are mental health disorders in Nepal?",
    answer:
      "Mental health disorders such as anxiety, depression, and stress are becoming increasingly common in Nepal, particularly among the younger population due to social and economic pressures.",
  },
  {
    question: "How to Stay Safe from the Common Cold?",
    answer:
      "To stay safe from the common cold, wash your hands frequently, avoid close contact with sick individuals, cover your mouth and nose when sneezing, and maintain a healthy lifestyle.",
  },
  {
    question: "What are the signs of dengue fever?",
    answer:
      "Fever, headache, muscle and joint pain, rash, and nausea. Seek medical attention if symptoms worsen.",
  },
  {
    question: "How do I prevent malaria?",
    answer:
      "Use mosquito repellents, sleep under mosquito nets, and avoid outdoor activities during dusk and dawn. Take antimalarial medications as prescribed in high-risk areas.",
  },
  {
    question: "What should I do if I have a stomach infection?",
    answer:
      "Drink plenty of fluids to stay hydrated, eat bland foods, and rest. If symptoms like severe vomiting, diarrhea, or blood in stool occur, consult a doctor.",
  },
  {
    question: "How can I prevent waterborne diseases?",
    answer:
      "Drink clean and boiled water, wash hands regularly, and avoid consuming street food or unclean water sources.",
  },
  {
    question: "What are the signs of a heart attack?",
    answer:
      "Chest pain, shortness of breath, nausea, dizziness, and pain radiating to the arms or jaw. Seek immediate medical attention if these symptoms occur.",
  },
  {
    question: "How can I manage seasonal allergies?",
    answer:
      "Avoid allergens like pollen, use antihistamines, and keep windows closed during high pollen seasons. Seek medical advice for severe symptoms.",
  },
  {
    question: "What are the symptoms of tuberculosis (TB)?",
    answer:
      "Persistent cough, chest pain, weight loss, fatigue, and fever. Visit a doctor for diagnosis and treatment.",
  },
  {
    question: "What should I do if I get a burn?",
    answer:
      "Cool the burn with running cold water for 10-20 minutes, apply antiseptic cream, and cover the burn with a clean bandage. Seek medical attention for severe burns.",
  },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const FAQsSection = () => {
  const randomFaqs = shuffleArray(faqs).slice(0, 8);
  return (
    <>
      <Box>
        <Typography variant="h4" align="center" gutterBottom>
          Frequently Asked Questions
        </Typography>
        {randomFaqs.map((faq, index) => (
          <Accordion key={index} sx={{ marginBottom: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography variant="h6">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{faq.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default FAQsSection;