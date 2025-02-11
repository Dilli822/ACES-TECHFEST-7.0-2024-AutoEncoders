import React, { useState, useEffect } from "react";
import { Container, Grid, Typography, Button, TextField, Box, Paper } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import PhoneIcon from '@mui/icons-material/Phone'; // Import the Phone icon
import axios from "axios";


const hospitals = [
  {
    "name": "Bayalpata Hospital",
    "location": "Sanfebagar, Achham",
    "contact_info": {
      "phone": "+977-977-5262520",
      "email": "info@possiblehealth.org",
      "website": "https://possiblehealth.org/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Mangalsen Hospital",
    "location": "Mangalsen, Achham",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Arghakhanchi Hospital",
    "location": "Sandhikharka, Arghakhanchi",
    "contact_info": {
      "phone": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital",
    "services": [
      "24-hour lab services",
      "X-ray services",
      "Physiotherapy",
      "Dental services",
      "Surgery services"
    ]
  },
  {
    "name": "Kur Basic Health Center",
    "location": "Sandhikharka, Arghakhanchi",
    "contact_info": {
      "phone": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": false,
    "type": "Health Center",
    "services": ["Basic healthcare services"]
  },
  {
    "name": "Dhaulagiri Zonal Hospital",
    "location": "Hospital Road, Baglung",
    "contact_info": {
      "phone": "068-520288",
      "website": "http://www.dzh.gov.np"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Dhaulagiri Hospital",
    "location": "Madan Marg, Baglung",
    "contact_info": {
      "phone": "068-520288"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Muktinath Hospital",
    "location": "Baglung",
    "contact_info": {
      "phone": "068-522269"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Nilgiri Hospital",
    "location": "Baglung",
    "contact_info": {
      "phone": "068-521813"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Dhaulagiri Ayurveda Aausadaliya",
    "location": "Baglung",
    "contact_info": {
      "phone": "068-520031"
    },
    "emergency_service": false,
    "type": "clinic"
  },
  {
    "name": "Dhaulagiri Eye Hospital",
    "location": "Baglung",
    "contact_info": {
      "phone": "068-520137"
    },
    "emergency_service": false,
    "type": "hospital"
  },
  {
    "name": "Baitadi District Hospital",
    "location": "Dashrathchand Municipality, Baitadi",
    "contact_info": {
      "phone": "Not found",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Baitadi District",
    "contact_info": {
      "phone": "Not available",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Baitadi General Hospital",
    "location": "Baitadi District",
    "contact_info": {
      "phone": "Not available",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Gokulesh Hospital",
    "location": "Gokulesh, Baitadi",
    "contact_info": {
      "phone": "Not available",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Bajhang District Hospital",
    "location": "Jaya Prithvi Municipality, Bajhang, Province 7, Nepal",
    "contact_info": {
      "phone": "+977-9851184864"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "B.P. Koirala Institute of Health Sciencesa",
    "location": "Sunsari, Dharan",
    "contact_info": {
      "phone": "+977 51 520447",
      "email": "info@bpkhs.com",
      "website": "http://bpkhs.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bara District Hospital",
    "location": "Kalaiya, Bara",
    "contact_info": {
      "phone": "+977 51 520107",
      "email": "info@baradistricthospital.com",
      "website": "http://baradistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Narayani Hospital",
    "location": "Birgunj, Bara",
    "contact_info": {
      "phone": "+977 51 522588",
      "email": "contact@narayanihospital.com",
      "website": "http://narayanihospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bardiya Hospital",
    "location": "Gulariya Municipality-6, Bardiya",
    "contact_info": {
      "phone": "+977-9858032177",
      "email": "bardiyahospital@lumbini.gov.np",
      "website": "http://bardiyahospital.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bardiya Eye Hospital",
    "location": "Sanoshree, Madhuwan Municipality-6, Bardiya",
    "contact_info": {
      "phone": "+977-084-440313",
      "email": "netrajotibardiya@gmail.com",
      "website": "http://nnjs.org.np"
    },
    "emergency_service": false,
    "type": "Eye Hospital"
  },
  {
    "name": "District Hospital Bajura",
    "type": "Hospital",
    "location": "Martadi, Bajura",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Primary Health Centre, Kolti",
    "type": "Clinic",
    "location": "Kolti, Bajura",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not available"
    },
    "emergency_service": true
  },
  {
    "name": "Bhaktapur Hospital",
    "location": "Bhaktapur Durbar Square, Bhaktapur",
    "contact_info": {
      "phone": "+977 1 6610177",
      "email": "info@bhaktapurhospital.com",
      "website": "http://bhaktapurhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Suryabinayak, Bhaktapur",
    "contact_info": {
      "phone": "+977 1 6615860",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Kavre Bhaktapur Hospital",
    "location": "Banepa, Bhaktapur",
    "contact_info": {
      "phone": "+977 1 6632211",
      "email": "info@kavrebhaktapurhospital.com",
      "website": "http://kavrebhaktapurhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Jeevan Hospital",
    "location": "Suryabinayak, Bhaktapur",
    "contact_info": {
      "phone": "+977 1 6612102",
      "email": "contact@jeevanhospital.com",
      "website": "http://jeevanhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bhojpur District Hospital",
    "location": "Bhojpur, Eastern Nepal",
    "contact_info": {
      "phone": "029-420188",
      "email": "Not available",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "Government Hospital"
  },
  {
    "name": "Mahatma Gandhi Memorial Hospital",
    "location": "Bhojpur",
    "contact_info": {
      "phone": "Not available",
      "email": "Not available"
    },
    "emergency_service": true,
    "type": "General Hospital"
  },
  {
    "name": "Chitwan District Hospital",
    "location": "Bharatpur, Chitwan",
    "contact_info": {
      "phone": "+977 56 520126",
      "email": "info@chitwandistricthospital.com",
      "website": "http://chitwandistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Narayani Hospital",
    "location": "Bharatpur, Chitwan",
    "contact_info": {
      "phone": "+977 56 522101",
      "email": "contact@narayanihospital.com",
      "website": "http://narayanihospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Chitwan Medical College Teaching Hospital",
    "location": "Bharatpur, Chitwan",
    "contact_info": {
      "phone": "+977 56 526601",
      "email": "info@cmcth.com",
      "website": "http://cmcth.com"
    },
    "emergency_service": true,
    "type": "Teaching Hospital"
  },
  {
    "name": "Dadeldhura Hospital",
    "location": "Dadeldhura",
    "contact_info": {
      "phone": "096-410372",
      "email": "dadeldhura.hospital@gmail.com",
      "website": "https://dadeldhurahospital.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "HDCS-TEAM Hospital",
    "location": "Dadeldhura, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "website": "https://hdcs-team-hospital-dadeldhura-nepal.servicereef.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Dhadeldhura Hospital",
    "location": "Dhadeldhura, Dadeldhura",
    "contact_info": {
      "phone": "096-420330",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Dailekh District Hospital",
    "location": "Narayan, Dailekh, Karnali Pradesh, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "type": "hospital",
    "emergency_service": true
  },
  {
    "name": "Dullu Hospital",
    "location": "Dullu, Dailekh, Karnali Pradesh, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "type": "hospital",
    "emergency_service": true
  },
  {
    "name": "Rapti Eye Hospital",
    "location": "Tulsipur-4, Rakshyachaur, Dang",
    "contact_info": {
      "phone": "+977-82-520165",
      "email": "info@raptieyehospital.org",
      "website": "http://raptieyehospital.org"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Lamahi Eye Hospital",
    "location": "Lamahi, Dang",
    "contact_info": {
      "phone": "+977-82-520322",
      "email": "info@lamahieyehospital.org",
      "website": "http://lamahieyehospital.org"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Chhanda (Kalebabu)-Narayani Eye Hospital",
    "location": "Bahadurgunj, Kapilvastu (serves Dang area)",
    "contact_info": {
      "phone": "+977-82-520455",
      "email": "info@chhandaeye.org",
      "website": "http://chhandaeye.org"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "District Hospital Darchula",
    "location": "Khalanga, Mahakali Municipality, Darchula",
    "contact_info": {
      "phone": "+977-9849912446",
      "website": "http://darchulahospital.gov.np"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "Gokuleshwar Hospital",
    "location": "Gokuleshwar, Shailyashikhar Municipality, Darchula",
    "contact_info": {
      "phone": "Not specified"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "Basic Hospital in Naaugad Rural Municipality",
    "location": "Naugad, Darchula",
    "contact_info": {
      "phone": "Not specified"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "Basic Hospital in Malikarjun Rural Municipality",
    "location": "Malikarjun, Darchula",
    "contact_info": {
      "phone": "Not specified"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "Dhading District Hospital",
    "location": "Dhading Besi, Dhading",
    "contact_info": {
      "phone": "+977 10 520021",
      "email": "info@dhadingdistricthospital.com",
      "website": "http://dhadingdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Ganesh Hospital",
    "location": "Dhading Besi, Dhading",
    "contact_info": {
      "phone": "+977 10 520100",
      "email": "contact@ganeshhospital.com",
      "website": "http://ganeshhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sita Hospital",
    "location": "Dhading Besi, Dhading",
    "contact_info": {
      "phone": "+977 10 520325",
      "email": "contact@sitahospital.com",
      "website": "http://sitahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Dhankuta District Hospital",
    "location": "Hulak Tole & Thadobazar Street, Dhankuta 56800",
    "contact_info": {
      "phone": "+977 026-520135",
      "email": "Not available",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Panchakanya Hospital",
    "location": "Dhankuta, Eastern Nepal",
    "contact_info": {
      "phone": "+977 026-520150",
      "email": "Not available",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Madhyapur Hospital",
    "location": "Janakpur, Dhanusa",
    "contact_info": {
      "phone": "+977 41 520123",
      "email": "info@madhyapurhospital.com",
      "website": "http://madhyapurhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Saraswati Hospital",
    "location": "Janakpur, Dhanusa",
    "contact_info": {
      "phone": "+977 41 520654",
      "email": "contact@saraswathospital.com",
      "website": "http://saraswathospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bhanu Memorial Hospital",
    "location": "Janakpur, Dhanusa",
    "contact_info": {
      "phone": "+977 41 520789",
      "email": "contact@bhanumemorialhospital.com",
      "website": "http://bhanumemorialhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Dolakha District Hospital",
    "location": "Charikot, Dolakha",
    "contact_info": {
      "phone": "+977 11 410217",
      "email": "info@dolakhadistricthospital.com",
      "website": "http://dolakhadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Charikot, Dolakha",
    "contact_info": {
      "phone": "+977 11 410334",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Buddha Hospital",
    "location": "Dolakha Bazar, Dolakha",
    "contact_info": {
      "phone": "+977 11 410511",
      "email": "info@buddhahospital.com",
      "website": "http://buddhahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "District Hospital Dolpa",
    "location": "Dolpa District, Karnali Province, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Nyaya Health Nepal (Bayalpata Hospital)",
    "location": "Dolpa (Bayalpata)",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "http://www.nyh.org.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Doti District Hospital",
    "location": "Silgadi, Doti",
    "contact_info": {
      "phone": "+977-094-420043",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Dipayal Hospital",
    "location": "Dipayal, Doti",
    "contact_info": {
      "phone": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "hospital"
  },
  {
    "name": "Dr. Pradhan's Surgical Clinic",
    "location": "Not specified, Doti",
    "contact_info": {
      "phone": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": false,
    "type": "clinic"
  },
  {
    "name": "Gorkha District Hospital",
    "location": "Gorkha Bazar, Gorkha",
    "contact_info": {
      "phone": "+977 64 420258",
      "email": "info@gorkhadistricthospital.com",
      "website": "http://gorkhadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Siddhi Memorial Hospital",
    "location": "Gorkha Bazar, Gorkha",
    "contact_info": {
      "phone": "+977 64 420194",
      "email": "contact@siddhimemorialhospital.com",
      "website": "http://siddhimemorialhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "District Hospital Gulmi",
    "location": "Tamghas, Gulmi",
    "contact_info": {
      "phone": "+977 79-520050"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Eye Hospital Tamghas",
    "location": "Tamghas, Gulmi",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": false,
    "type": "Hospital"
  },
  {
    "name": "Johang Primary Hospital",
    "location": "Johang, Gulmi",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": false,
    "type": "Hospital"
  },
  {
    "name": "Resunga Hospital",
    "location": "Bus Park, Tamghas, Gulmi",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": false,
    "type": "Hospital"
  },
  {
    "name": "District Ayurveda Health Center Gulmi",
    "location": "Tamghas-6, Gulmi",
    "contact_info": {
      "phone": "+977 79-520050"
    },
    "emergency_service": false,
    "type": "Hospital"
  },
  {
    "name": "Madhane Community Health Center",
    "location": "Madhane, Gulmi",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": false,
    "type": "Health Center"
  },
  {
    "name": "Humla District Hospital",
    "location": "Simikot, Humla",
    "contact_info": {
      "phone": "+977 87-680024",
      "website": "https://khojamnepal.com/listing/humla-district-hospital/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "PHASE Health Post (Maila)",
    "location": "Maila, Humla",
    "contact_info": {
      "phone": "Not available"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Ilam Hospital",
    "location": "Ilam, Nepal",
    "contact_info": {
      "phone": "+977 27 523044",
      "email": "Not listed",
      "website": "https://www.nepalyp.com/category/Hospitals/city:Ilam"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Ilam District Hospital",
    "location": "Ilam, Nepal",
    "contact_info": {
      "phone": "Not listed",
      "email": "Not listed",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Jajarkot District Hospital",
    "location": "Khalanga, Jajarkot",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Pajaru Health Post",
    "location": "Chedegadh Municipality, Jajarkot",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Province Hospital Bhadrapur",
    "location": "Bhadrapur-8, Koshi Province, Nepal",
    "contact_info": {
      "phone": "+977 023 523024",
      "email": "info.provincehospitalbhadrapur@koshi.gov.np",
      "website": "https://provincehospital.koshi.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Purbanchal Cancer Hospital",
    "location": "Birtamode-5, Jhapa, Nepal",
    "contact_info": {
      "phone": "+977 9801406708",
      "website": "http://Purbanchalcancerhospital.org"
    },
    "emergency_service": true,
    "type": "Cancer Hospital"
  },
  {
    "name": "Mechi Eye Hospital",
    "location": "Birtamode-03, Jhapa, Nepal",
    "contact_info": {
      "phone": "+977 023 541992",
      "email": "meh@meh.org.np",
      "website": "https://meh.org.np"
    },
    "emergency_service": true,
    "type": "Eye Hospital"
  },
  {
    "name": "Karnali Academy of Health Sciences Teaching Hospital",
    "location": "Jumla, Karnali Province, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "http://kahs.edu.np"
    },
    "emergency_service": true,
    "type": "Teaching Hospital"
  },
  {
    "name": "Navajeevan Aspatal Pvt. Ltd",
    "location": "Dhangadhi-4, Kailali",
    "contact_info": {
      "phone": "091-521233, 091-521733",
      "email": "info@hamrodoctor.com",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Geta Eye Hospital",
    "location": "Geta VDC, Kailali",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Eye Hospital"
  },
  {
    "name": "Dhangadhi Eye Care Centre",
    "location": "Dhangadhi, Kailali",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Eye Care Centre"
  },
  {
    "name": "Tikapur Eye Care Centre",
    "location": "Tikapur, Kailali",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Eye Care Centre"
  },
  {
    "name": "Raku Health Post",
    "location": "Sanni Tribeni, Kalikot, Karnali Pradesh",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": false,
    "type": "Clinic"
  },
  {
    "name": "Hospital for Infectious Diseases",
    "location": "Mamna, Khandachakra Municipality-1, Kalikot",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Mantra Hospital",
    "location": "Mahendranagar, Kanchanpur",
    "contact_info": {
      "phone": "Not specified",
      "website": "https://mantrahospital.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "District Hospital Kanchanpur",
    "location": "Mahendranagar, Kanchanpur",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shuklaphanta Municipal Hospital",
    "location": "Shuklaphanta Municipality, Kanchanpur",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Pipaladi Health Post",
    "location": "Suklaphanta Municipality, Kanchanpur",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Tribhuvan Health Post",
    "location": "Punarbas Municipality, Kanchanpur",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Kapilvastu Hospital",
    "location": "Kapilvastu, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "website": "https://kapilvastuhospital.p5.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Taulihawa Eye Hospital",
    "location": "Netrajyoti Path, Aanandbag-3, Taulihawa, Kapilvastu",
    "contact_info": {
      "phone": "+977 7656 0953",
      "email": "pecckapilvastu@lei.org.np"
    },
    "emergency_service": false,
    "type": "Eye Hospital"
  },
  {
    "name": "Kaski District Hospital",
    "location": "Pokhara-6, Kaski",
    "contact_info": {
      "phone": "+977 61 533464",
      "email": "info@kaskidistricthospital.com",
      "website": "http://kaskidistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Western Regional Hospital",
    "location": "Pokhara-9, Kaski",
    "contact_info": {
      "phone": "+977 61 526624",
      "email": "wrh@wrh.com.np",
      "website": "http://wrh.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Kist Medical College Teaching Hospital",
    "location": "Imadol, Kathmandu",
    "contact_info": {
      "phone": "+977 1 5210166",
      "email": "contact@kistmedicalcollege.com",
      "website": "http://kistmedicalcollege.com"
    },
    "emergency_service": true,
    "type": "Teaching Hospital"
  },
  {
    "name": "Norvic International Hospital",
    "location": "Thapathali, Kathmandu",
    "contact_info": {
      "phone": "+977 1 4253999",
      "email": "info@norvichospital.com",
      "website": "http://norvichospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "The Brain Hospital",
    "location": "Lazimpat, Kathmandu",
    "contact_info": {
      "phone": "+977 1 4427972",
      "email": "info@brainhospital.com.np",
      "website": "http://brainhospital.com.np"
    },
    "emergency_service": true,
    "type": "Specialized Hospital"
  },
  {
    "name": "Medicare National Hospital and Research Center",
    "location": "Balkumari, Kathmandu",
    "contact_info": {
      "phone": "+977 1 5527001",
      "email": "info@medicarehospital.com.np",
      "website": "http://medicarehospital.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Bhatbhateni, Kathmandu",
    "contact_info": {
      "phone": "+977 1 4356575",
      "email": "info@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Dhulikhel Hospital",
    "location": "Dhulikhel, Kavrepalanchowk",
    "contact_info": {
      "phone": "+977-11-661700",
      "website": "https://www.dhulikhelhospital.org"
    },
    "emergency_service": true,
    "type": "General Hospital"
  },
  {
    "name": "Methinkot Hospital",
    "location": "Namobuddha Municipality-04, Kavrepalanchowk",
    "contact_info": {
      "phone": "9845368008",
      "email": "zealousrams@gmail.com"
    },
    "emergency_service": true,
    "type": "General Hospital"
  },
  {
    "name": "District Hospital, Khotang",
    "location": "Rudra Marga, Diktel",
    "contact_info": {
      "phone": "+977 36-420188"
    },
    "emergency_service": true,
    "type": "Government Hospital",
    "website": "N/A"
  },
  {
    "name": "Patan Hospital",
    "location": "Patan, Lalitpur",
    "contact_info": {
      "phone": "+977 1 5536399",
      "email": "info@patanhospital.com",
      "website": "http://patanhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Lalitpur Hospital",
    "location": "Lagankhel, Lalitpur",
    "contact_info": {
      "phone": "+977 1 5522735",
      "email": "contact@lalitpurhospital.com",
      "website": "http://lalitpurhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Patan, Lalitpur",
    "contact_info": {
      "phone": "+977 1 5530200",
      "email": "info@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Buddha Hospital",
    "location": "Buddhanagar, Lalitpur",
    "contact_info": {
      "phone": "+977 1 5544222",
      "email": "contact@buddhahospital.com",
      "website": "http://buddhahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Lamjung District Hospital",
    "location": "Besisahar, Lamjung",
    "contact_info": {
      "phone": "+977 65 520030",
      "email": "info@lamjungdistricthospital.com",
      "website": "http://lamjungdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Pokhara Health Care Centre",
    "location": "Besisahar, Lamjung",
    "contact_info": {
      "phone": "+977 65 520210",
      "email": "info@pokharahealthcare.com",
      "website": "http://pokharahealthcare.com"
    },
    "emergency_service": true,
    "type": "Healthcare Centre"
  },
  {
    "name": "Mahottari District Hospital",
    "location": "Jaleshwar, Mahottari",
    "contact_info": {
      "phone": "+977 41 520040",
      "email": "info@mahottaridistricthospital.com",
      "website": "http://mahottaridistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Ganga Hospital",
    "location": "Jaleshwar, Mahottari",
    "contact_info": {
      "phone": "+977 41 520138",
      "email": "contact@gangahospital.com",
      "website": "http://gangahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Makwanpur District Hospital",
    "location": "Hetauda, Makwanpur",
    "contact_info": {
      "phone": "+977 57 520201",
      "email": "info@makwanpurdistricthospital.com",
      "website": "http://makwanpurdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Hetauda Hospital",
    "location": "Hetauda, Makwanpur",
    "contact_info": {
      "phone": "+977 57 520115",
      "email": "contact@hetaudahospital.com",
      "website": "http://hetaudahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bhairahawa Hospital",
    "location": "Hetauda, Makwanpur",
    "contact_info": {
      "phone": "+977 57 520212",
      "email": "info@bhairawahospital.com",
      "website": "http://bhairawahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Manang District Hospital",
    "location": "Chame, Manang",
    "contact_info": {
      "phone": "+977 66 420201",
      "email": "info@manangdistricthospital.com",
      "website": "http://manangdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Narphu Valley Health Post",
    "location": "Narphu Valley, Manang",
    "contact_info": {
      "phone": "+977 66 420229",
      "email": "contact@narphuhealthpost.com",
      "website": "http://narphuhealthpost.com"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Koshi Hospital",
    "location": "Biratnagar, Morang",
    "contact_info": {
      "phone": "+977 21 525646",
      "email": "info@koshihospital.com",
      "website": "https://koshihospital.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Birat Medical College Teaching Hospital",
    "location": "Biratnagar, Morang",
    "contact_info": {
      "phone": "+977 21 540024",
      "email": "info@bmcteachinghospital.com",
      "website": "https://bmcteachinghospital.com"
    },
    "emergency_service": true,
    "type": "Teaching Hospital"
  },
  {
    "name": "Godawari Hospital",
    "location": "Urlabari, Morang",
    "contact_info": {
      "phone": "+977 21 541972",
      "email": "admin@godawarihospital.com.np",
      "website": "https://godawarihospital.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Mugu District Hospital",
    "location": "Mugu, Karnali Province, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "KOICA-Supported Hospital",
    "location": "Mugu, Karnali Province, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "type": "Hospital",
    "emergency_service": true
  },
  {
    "name": "Mustang District Hospital",
    "location": "Jomsom, Mustang",
    "contact_info": {
      "phone": "Not available",
      "email": "Not available",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Dhaulagiri Zonal Hospital",
    "location": "Baglung (serving Mustang)",
    "contact_info": {
      "phone": "068-520188",
      "website": "https://dhaulagirizonalhospital.gov.np"
    },
    "emergency_service": true,
    "type": "Zonal Hospital"
  },
  {
    "name": "Beni Hospital",
    "location": "Beni, Myagdi",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital",
    "services": [
      "Complex surgeries",
      "Surgical delivery",
      "Digital X-ray",
      "Dental and pharmaceutical services"
    ]
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Beni, Myagdi",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Private Hospital",
    "services": ["General medical services"]
  },
  {
    "name": "Nawalparasi District Hospital",
    "location": "Prithvi Chowk, Nawalparasi",
    "contact_info": {
      "phone": "+977 76 520010",
      "email": "info@districthospitalnawalparasi.com",
      "website": "http://districthospitalnawalparasi.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Lumbini Provincial Hospital",
    "location": "Parasi-1, Nawalparasi",
    "contact_info": {
      "phone": "+977 76 420344",
      "email": "lumbinihospitalnp@gmail.com",
      "website": "http://lumbinihospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Nuwakot District Hospital",
    "location": "Bidur, Nuwakot",
    "contact_info": {
      "phone": "+977 10 520029",
      "email": "info@nuwakotdistricthospital.com",
      "website": "http://nuwakotdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Siddhi Memorial Hospital",
    "location": "Bidur, Nuwakot",
    "contact_info": {
      "phone": "+977 10 520076",
      "email": "contact@siddhimemorialhospital.com",
      "website": "http://siddhimemorialhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Trishuli, Nuwakot",
    "contact_info": {
      "phone": "+977 10 522310",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Okhaldhunga Community Hospital",
    "location": "Siddhicharan, Okhaldhunga",
    "contact_info": {
      "phone": "+977 37-520176",
      "website": "http://umn.org.np"
    },
    "emergency_service": true,
    "type": "General Hospital"
  },
  {
    "name": "Mission Hospital",
    "location": "Germany / Hamburg, Okhaldhunga",
    "contact_info": {
      "phone": "+977 37-520176"
    },
    "emergency_service": true,
    "type": "General Hospital"
  },
  {
    "name": "United Mission Hospital Tansen (UMHT)",
    "location": "Bhusaldanda, Tansen, Palpa",
    "contact_info": {
      "phone": "+977-75-520111",
      "website": "http://www.umn.org.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Panchthar District Hospital",
    "location": "Phidim, Panchthar",
    "contact_info": {
      "phone": "+977 024-520188",
      "email": "Not listed",
      "website": "http://panchtharhospital.p1.gov.np"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Panchthar Hospital",
    "location": "Phidim, Panchthar",
    "contact_info": {
      "phone": "Not listed",
      "email": "Not listed",
      "website": "Not available"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Parbat Hospital",
    "location": "Kushma, Parbat",
    "contact_info": {
      "phone": "+977-9860889907",
      "website": "https://parbathospital.gandaki.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Kushma, Parbat",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Kushma Health Post",
    "location": "Kushma, Parbat",
    "contact_info": {
      "phone": "Not specified"
    },
    "emergency_service": false,
    "type": "Health Post"
  },
  {
    "name": "Parsa District Hospital",
    "location": "Birgunj, Parsa",
    "contact_info": {
      "phone": "+977 51 520205",
      "email": "info@parsadistricthospital.com",
      "website": "http://parsadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Birgunj, Parsa",
    "contact_info": {
      "phone": "+977 51 520903",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Pyuthan Hospital",
    "location": "Hospital Road, Pyuthan 22300, Nepal",
    "contact_info": {
      "phone": "+977 86-460010",
      "website": "http://dhopyuthan.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Gurkha Hospital Pvt. Ltd.",
    "location": "Ghorahi, Dang (Serving Pyuthan and nearby areas)",
    "contact_info": {
      "phone": "+977 82-563414",
      "email": "docgorkhahospital@gmail.com",
      "website": "https://gorkhagroup.org.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Ramechhap District Hospital",
    "location": "Manthali, Ramechhap",
    "contact_info": {
      "phone": "+977 11 670210",
      "email": "info@ramechhapdistricthospital.com",
      "website": "http://ramechhapdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Manthali, Ramechhap",
    "contact_info": {
      "phone": "+977 11 670347",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Buddha Hospital",
    "location": "Manthali, Ramechhap",
    "contact_info": {
      "phone": "+977 11 670505",
      "email": "info@buddhahospital.com",
      "website": "http://buddhahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Rasuwa District Hospital",
    "location": "Dhunche, Rasuwa",
    "contact_info": {
      "phone": "+977 10 410236",
      "email": "info@rasuwadistricthospital.com",
      "website": "http://rasuwadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Langtang Hospital",
    "location": "Dhunche, Rasuwa",
    "contact_info": {
      "phone": "+977 10 410328",
      "email": "contact@langtanghospital.com",
      "website": "http://langtanghospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Tamang Memorial Hospital",
    "location": "Dhunche, Rasuwa",
    "contact_info": {
      "phone": "+977 10 410420",
      "email": "info@tamangmemorialhospital.com",
      "website": "http://tamangmemorialhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Rasuwa Community Hospital",
    "location": "Dhunche, Rasuwa",
    "contact_info": {
      "phone": "+977 10 410150",
      "email": "contact@rasuwacommunityhospital.com",
      "website": "http://rasuwacommunityhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Siddharthanagar City Hospital",
    "location": "Mayadevi Gaupalika-8, Lumbini Road, Bhairahawa, Rupandehi",
    "contact_info": {
      "phone": "+977 71576375",
      "email": "info@cityhospital.com.np",
      "website": "http://cityhospital.com.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Edmond City Hospital",
    "location": "Jeetgadhi, Butwal-13, Rupandehi",
    "contact_info": {
      "phone": "071445554, 9742907753",
      "email": "edmondbtl@gmail.com",
      "website": "https://ech.com.np/edmond-city-hospital-location/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Rautahat District Hospital",
    "location": "Gaur, Rautahat",
    "contact_info": {
      "phone": "+977 55 520126",
      "email": "info@rautahatdistricthospital.com",
      "website": "http://rautahatdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Rautahat, Gaur",
    "contact_info": {
      "phone": "+977 55 520527",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Rolpa District Hospital",
    "location": "Rolpa",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Pang Health Post",
    "location": "Pang, Rolpa",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Health Post"
  },
  {
    "name": "Rukum East Hospital",
    "location": "Rukum East, Nepal",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Chaurjahari Hospital",
    "location": "Chaurjahari, West Rukum District",
    "contact_info": {
      "phone": "Not specified",
      "email": "Not specified",
      "website": "Not specified"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sankhuwasabha District Hospital",
    "location": "Khandbari, Shankhuwasabha",
    "contact_info": {
      "phone": "+977 29 419001",
      "email": "info@shankhuwasabhadistricthospital.com",
      "website": "http://shankhuwasabhadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Makalu Hospital",
    "location": "Seduwa, Makalu Valley, Shankhuwasabha",
    "contact_info": {
      "phone": "+977 29 460257",
      "email": "contact@soshimalaya.org",
      "website": "http://www.soshimalaya.org"
    },
    "emergency_service": false,
    "type": "Hospital"
  },
  {
    "name": "Saptari District Hospital",
    "location": "Rajbiraj, Saptari",
    "contact_info": {
      "phone": "+977 33 520263",
      "email": "info@saptaridistricthospital.com",
      "website": "http://saptaridistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Gajendra Memorial Hospital",
    "location": "Rajbiraj, Saptari",
    "contact_info": {
      "phone": "+977 33 520433",
      "email": "contact@gajendramemorialhospital.com",
      "website": "http://gajendramemorialhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Janaki Health Care Hospital",
    "location": "Rajbiraj, Saptari",
    "contact_info": {
      "phone": "+977 33 520650",
      "email": "contact@janakihealthcare.com",
      "website": "http://janakihealthcare.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sarlahi District Hospital",
    "location": "Malangwa, Sarlahi",
    "contact_info": {
      "phone": "+977 46 520130",
      "email": "info@sarlahidistricthospital.com",
      "website": "http://sarlahidistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Vishal Hospital",
    "location": "Malangwa, Sarlahi",
    "contact_info": {
      "phone": "+977 46 520291",
      "email": "contact@vishalhospital.com",
      "website": "http://vishalhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sindhuli District Hospital",
    "location": "Sindhuli Bazar, Sindhuli",
    "contact_info": {
      "phone": "+977 11 520220",
      "email": "info@sindhulidistricthospital.com",
      "website": "http://sindhulidistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shree Harsha Hospital",
    "location": "Kamalamai, Sindhuli",
    "contact_info": {
      "phone": "+977 11 520345",
      "email": "contact@shreeharshahospital.com",
      "website": "http://shreeharshahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Chandragiri Hospital",
    "location": "Chandragiri, Sindhuli",
    "contact_info": {
      "phone": "+977 11 520678",
      "email": "info@chandragirihospital.com",
      "website": "http://chandragirihospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sindhupalchowk District Hospital",
    "location": "Chautara, Sindhupalchowk",
    "contact_info": {
      "phone": "+977 11 660121",
      "email": "info@sindhupalchowkdistricthospital.com",
      "website": "http://sindhupalchowkdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Charikot Hospital",
    "location": "Charikot, Sindhupalchowk",
    "contact_info": {
      "phone": "+977 11 660231",
      "email": "contact@charikothospital.com",
      "website": "http://charikothospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bhumlu Hospital",
    "location": "Bhumlu, Sindhupalchowk",
    "contact_info": {
      "phone": "+977 11 660055",
      "email": "contact@bhumluhospital.com",
      "website": "http://bhumluhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Siraha District Hospital",
    "location": "Siraha, Siraha",
    "contact_info": {
      "phone": "+977 33 520212",
      "email": "info@sirahadistricthospital.com",
      "website": "http://sirahadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Siddhartha Hospital",
    "location": "Lahan, Siraha",
    "contact_info": {
      "phone": "+977 33 520343",
      "email": "contact@siddharthahospital.com",
      "website": "http://siddharthahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Sushil Koirala Memorial Hospital",
    "location": "Siraha, Siraha",
    "contact_info": {
      "phone": "+977 33 520645",
      "email": "info@sushilkoiralahospital.com",
      "website": "http://sushilkoiralahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Phaplu Hospital",
    "location": "Solududhakunda-4, Solukhumbu, Nepal",
    "contact_info": {
      "phone": "+977 038-520188",
      "email": "soluhsp78@gmail.com",
      "website": "http://phapluhospital.org.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Lukla Hospital",
    "location": "Lukla, Solukhumbu, Nepal",
    "contact_info": {
      "phone": "+977 038-520188",
      "website": "http://www.luklahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Solu District Hospital",
    "location": "Dudhakunda, Solukhumbu, Nepal",
    "contact_info": {
      "phone": "+977 038-520188"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Sanvi City Hospital",
    "location": "Itahari-16, Labipur Chowk, Koshi Pradesh, Nepal",
    "contact_info": {
      "phone": "+977-25-585444",
      "email": "info@sanvicityhospital.com.np",
      "website": "https://sanvicityhospital.com.np/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Nobel Medical College Teaching Hospital",
    "location": "Biratnagar, Sunsari, Koshi Province, Nepal",
    "contact_info": {
      "phone": "+977-21-520801",
      "email": "nobel@tmc.edu.np",
      "website": "https://www.nobelmedicalcollege.edu.np/"
    },
    "emergency_service": true,
    "type": "Teaching Hospital"
  },
  {
    "name": "B & B Hospital",
    "location": "Itahari, Sunsari, Nepal",
    "contact_info": {
      "phone": "+977 25-585101",
      "email": "info@bbhospital.com.np",
      "website": "http://bbhospital.com.np/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Biratnagar Cancer Hospital",
    "location": "Biratnagar, Sunsari, Nepal",
    "contact_info": {
      "phone": "+977 21-526420",
      "email": "info@biratnagarcancerhospital.com",
      "website": "http://biratnagarcancerhospital.com/"
    },
    "emergency_service": true,
    "type": "Specialty Hospital"
  },
  {
    "name": "Karnali Province Hospital",
    "location": "Birendranagar-4, Kalagaun, Surkhet",
    "contact_info": {
      "phone": ["083-523200", "083-522200", "083-520200"],
      "website": "https://provincehospital.karnali.gov.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Nepal Red Cross Society, Surkhet Eye Hospital",
    "location": "Birendranagar, Surkhet",
    "contact_info": {
      "phone": "083-520513",
      "website": "https://surkheteyehospital.org.np"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Shining Hospital INF Surkhet (SH-IS)",
    "location": "Birendranagar, Surkhet",
    "contact_info": {
      "phone": "Not specified",
      "website": "https://www.inf.org/shis/"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Syangja District Hospital",
    "location": "Syangja Bazar, Syangja",
    "contact_info": {
      "phone": "+977 63 520112",
      "email": "info@syangjadistricthospital.com",
      "website": "http://syangjadistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Phedikhola Hospital",
    "location": "Phedikhola, Syangja",
    "contact_info": {
      "phone": "+977 63 431201",
      "email": "contact@phedikholahospital.com",
      "website": "http://phedikholahospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Tanahun District Hospital",
    "location": "Damauli, Tanahun",
    "contact_info": {
      "phone": "+977 66 520065",
      "email": "info@tanahundistricthospital.com",
      "website": "http://tanahundistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Bishal Hospital",
    "location": "Bishal Nagar, Damauli, Tanahun",
    "contact_info": {
      "phone": "+977 66 520412",
      "email": "contact@bishalhospital.com",
      "website": "http://bishalhospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "District Hospital, Taplejung",
    "location": "Taplejung",
    "contact_info": {
      "phone": "+977-27-421070",
      "email": "Not listed",
      "website": "Not listed"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Pathibhara Hospital",
    "location": "Pathibhara",
    "contact_info": {
      "phone": "Not listed",
      "email": "Not listed",
      "website": "Not listed"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Terhathum District Hospital",
    "location": "Terhathum, Nepal",
    "contact_info": {
      "phone": "Not listed",
      "email": "Not listed",
      "website": "Not listed"
    },
    "emergency_service": true,
    "type": "District Hospital"
  },
  {
    "name": "Khadbari Hospital",
    "location": "Khadbari, Terhathum",
    "contact_info": {
      "phone": "Not listed",
      "email": "Not listed",
      "website": "Not listed"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "Udayapur District Hospital",
    "location": "Gaighat, Udayapur, Nepal",
    "contact_info": {
      "phone": "+977 35 420187",
      "email": "info@udayapurdistricthospital.com",
      "website": "http://udayapurdistricthospital.com"
    },
    "emergency_service": true,
    "type": "Hospital"
  },
  {
    "name": "District Health Office, Udayapur",
    "location": "Triyuga, Udayapur, Nepal",
    "contact_info": {
      "phone": "+977 9852835614",
      "email": "info@districthealthofficeudayapur.com",
      "website": "http://districthealthofficeudayapur.com"
    },
    "emergency_service": false,
    "type": "Government Office"
  }
]



// Hospital Card Component
const HospitalCard = ({ hospital }) => {
  return (
<Grid 
  item 
  xs={12} 
  sm={6} 
  md={4} 
  sx={{ 
    display: "flex", 
    alignItems: "stretch" 
  }}
>
  <Paper
    elevation={3}
    sx={{
      padding: 3,
      borderRadius: 2,
      border: "1px solid #ddd",
      backgroundColor: "#f7f7f7",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      flexGrow: 1,
    }}
  >
    <Typography variant="h6" sx={{ color: "#2c3e50", fontWeight: "bold" }}>
      {hospital.name}
    </Typography>
    <Typography sx={{ color: "success" }}>
      {hospital.location}
    </Typography>
    <Typography sx={{ color: "success" }}>
      <strong>Phone:</strong> {hospital.contact_info.phone}
    </Typography>
    <Typography sx={{ color: "success" }}>
      <strong>Email:</strong> {hospital.contact_info.email}
    </Typography>
    <Typography sx={{ color: "success" }}>
      <strong>Website:</strong>{" "}
      <a
        href={hospital.contact_info.website}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "success" }}
      >
        {hospital.contact_info.website}
      </a>
    </Typography>
    <Button
      variant="contained"
      sx = {{  backgroundColor: "red" , marginTop: 1 }}
      startIcon={<PhoneIcon />} // Add the call icon here
      onClick={() => window.open(`tel:${hospital.contact_info.phone}`, '_self')}
    >
      Contact
    </Button>
  </Paper>
</Grid>

  );
};

const HospitalList = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [matchingHospitals, setMatchingHospitals] = useState([]);
  const [error, setError] = useState(null);
  const [userCounty, setUserCounty] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);
  const [showMore, setShowMore] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();

  const OPENCAGE_API_KEY = "dfc169d7f1c94fddbc4a5d7f90380f06";
  const DEFAULT_COORDS = { latitude: 37.7749, longitude: -122.4194 }; // Default to San Francisco, CA

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation(position.coords);
          getCountyFromCoordinates(position.coords);
        },
        () => {
          setUserLocation(DEFAULT_COORDS);
          getCountyFromCoordinates(DEFAULT_COORDS);
        }
      );
    } else {
      setUserLocation(DEFAULT_COORDS);
      getCountyFromCoordinates(DEFAULT_COORDS);
    }
  };

  const getCountyFromCoordinates = async (coords) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json`, 
        {
          params: {
            q: `${coords.latitude},${coords.longitude}`,
            key: OPENCAGE_API_KEY,
          },
        }
      );

      const results = response.data.results;
      if (results && results.length > 0) {
        const county =
          results[0].components.county || results[0].components.state;
        setUserCounty(county);
        matchHospitalsBySearch(county);
      }
    } catch (err) {
      setError("Error fetching location data from OpenCage");
      console.error(err);
    }
  };

  const matchHospitalsBySearch = (query) => {
    const matched = hospitals.filter((hospital) => {
      const locations = hospital.location.toLowerCase().split(",");
      return (
        locations.some((loc) => loc.trim().includes(query.toLowerCase())) ||
        hospital.name.toLowerCase().includes(query.toLowerCase())
      );
    });
    setMatchingHospitals(matched);
  };

  const handleSearch = () => {
    if (!searchInput.trim()) return;
    matchHospitalsBySearch(searchInput);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const toggleShowMore = () => {
    setShowMore((prevState) => !prevState);
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const indexOfLastHospital = currentPage * rowsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - rowsPerPage;
  const currentHospitals = showMore
    ? matchingHospitals
    : matchingHospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  return (
    <Container sx={{ marginTop: "16px" }}>
      <Typography variant="h4" gutterBottom sx={{ color: theme.palette.success.main }}>
        Nearby Hospitals
      </Typography>

      {error && <Typography color="error">{error}</Typography>}

      <TextField
        label="Search for a location"
        variant="outlined"
        fullWidth
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" color="success" onClick={handleSearch} sx={{ marginBottom: 2 }}>
        Search
      </Button>

      {matchingHospitals.length > 0 ? (
        <>
          <Grid container spacing={isMobile ? 2 : 3}>
            {currentHospitals.map((hospital, index) => (
              <HospitalCard key={index} hospital={hospital} />
            ))}
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 2 }}>
            {/* <Button
              variant="contained"
              color="success"
              onClick={toggleShowMore}
              sx={{ marginTop: 2 }}
            >
              {showMore ? "Show Less" : "Show More"}
            </Button>

            {!showMore && (
              <Box>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={indexOfLastHospital >= matchingHospitals.length}
                >
                  Next
                </Button>
              </Box>
            )} */}
          </Box>
        </>
      ) : (
        <Typography>No matching hospitals found in your area.</Typography>
      )}
      <br />
      <hr></hr>
    </Container>
  );
};

export default HospitalList;
