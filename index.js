// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import postRoutes from './routes/post.routes.js';
// import commentRoutes from './routes/comment.routes.js';
// import cookieParser from 'cookie-parser';
// import path from 'path';

// const app = express();
// app.use(express.json());
// app.use(cookieParser());


// // Security Middleware
// app.use(helmet());

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
// });
// app.use(limiter);


// mongoose
//   .connect(
//     process.env.MONGO_URI
//   )
//   .then(() => {
//     console.log("MongoDB is Connected");
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });
  
// const __dirname = path.resolve();




// // Generate Security Questions
// const generateQuestions = () => {
//   const baseQuestions = [
//     {
//       question: "What is phishing?",
//       options: ["An email scam", "A type of malware", "A web browser"],
//       correctAnswer: 0,
//     },
//     {
//       question: "What should you do if you receive a suspicious email link?",
//       options: ["Click the link", "Delete the email", "Report it as spam"],
//       correctAnswer: 2,
//     },
//     {
//       question: "What is the safest way to create a password?",
//       options: [
//         "Use 'password123' for all accounts",
//         "Use a unique, strong password for each account",
//         "Write it down on a sticky note",
//       ],
//       correctAnswer: 1,
//     },
//   ];

//   const questions = [];
//   for (let i = 0; i < 20; i++) {
//     baseQuestions.forEach((q) => {
//       questions.push({ ...q, id: `${q.question}-${i}` });
//     });
//   }
//   return questions;
// };

// // Shuffle Function
// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Serve Security Questions Route
// app.get("/questions", async (req, res) => {
//   const { length } = req.query;
//   const numQuestions = parseInt(length, 10) || 5;

//   const questions = generateQuestions();
//   const shuffledQuestions = shuffle([...questions]).slice(0, numQuestions);

//   const hashedQuestions = await Promise.all(
//     shuffledQuestions.map(async (q) => {
//       const questionHash = await bcrypt.hash(q.question, 10);
//       return {
//         id: questionHash,
//         question: q.question,
//         options: q.options,
//         correctAnswer: q.correctAnswer, // Optional
//       };
//     })
//   );

//   res.json(hashedQuestions);
// });

// // Error Handling Middleware
// // app.use(invalidPathHandler);
// // app.use(errorResponserHandler);




// app.listen(3000, () => {
//   console.log("Server is running on port 3000!!");
// });

// app.use("/api/user",userRoutes);
// app.use("/api/auth",authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// app.use((err,req,res,next)=>{
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success:false,
//     statusCode,
//     message
//   });
// });



// index.js

// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import cookieParser from 'cookie-parser';
// import path from 'path';
// import http from 'http';
// import { Server } from 'socket.io';
// import bcrypt from 'bcrypt';
// import cors from "cors"; 
// import axios from "axios";


// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import postRoutes from './routes/post.routes.js';
// import commentRoutes from './routes/comment.routes.js';

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Security Middleware
// app.use(helmet());

// // Rate Limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per window
// });
// app.use(limiter);
// const frontendUrl = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5173'; // Default to frontend URL if not set

// app.use(cors({ origin: frontendUrl,
//   methods: ['GET', 'POST'], // Adjust methods as needed
//   credentials: true, // If you need credentials like cookies
//  }));



// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB is Connected");
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// const __dirname = path.resolve();

// // Routes
// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);

// // Generate Security Questions
// const generateQuestions = () => {
//   const baseQuestions = [
//     {
//       question: "What is phishing?",
//       options: ["An email scam", "A type of malware", "A web browser"],
//       correctAnswer: 0,
//     },
//     {
//       question: "What should you do if you receive a suspicious email link?",
//       options: ["Click the link", "Delete the email", "Report it as spam"],
//       correctAnswer: 2,
//     },
//     {
//       question: "What is the safest way to create a password?",
//       options: [
//         "Use 'password123' for all accounts",
//         "Use a unique, strong password for each account",
//         "Write it down on a sticky note",
//       ],
//       correctAnswer: 1,
//     },
//   ];

//   const questions = [];
//   for (let i = 0; i < 20; i++) {
//     baseQuestions.forEach((q) => {
//       questions.push({ ...q, id: `${q.question}-${i}` });
//     });
//   }
//   return questions;
// };

// // Shuffle Function
// const shuffle = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   return array;
// };

// // Serve Security Questions Route
// app.get("/questions", async (req, res) => {
//   const { length } = req.query;
//   const numQuestions = parseInt(length, 10) || 5;

//   const questions = generateQuestions();
//   const shuffledQuestions = shuffle([...questions]).slice(0, numQuestions);

//   const hashedQuestions = await Promise.all(
//     shuffledQuestions.map(async (q) => {
//       const questionHash = await bcrypt.hash(q.question, 10);
//       return {
//         id: questionHash,
//         question: q.question,
//         options: q.options,
//         correctAnswer: q.correctAnswer, // Optional
//       };
//     })
//   );

//   res.json(hashedQuestions);
// });

// // Socket.io setup
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   socket.on('join', (room) => {
//     socket.join(room);
//   });

//   socket.on('chat message', (msg) => {
//     io.to(msg.room).emit('chat message', msg);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//   });
// });

// // Serve static files
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || 'Internal Server Error';
//   res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message
//   });
// });










// app.post("/api/scan-url", async (req, res) => {
//   const { url } = req.body;

//   if (!url) {
//     return res.status(400).json({ error: "URL is required" });
//   }

//   try {
//     // Basic security checks
//     const isHttp = url.startsWith("http://");
//     const isHttps = url.startsWith("https://");
//     if (!isHttp && !isHttps) {
//       return res.json({ safe: false, message: "Invalid protocol in URL." });
//     }

//     // Fetch headers to check for vulnerabilities
//     const response = await axios.get(url, { timeout: 5000 });

//     // Example header checks
//     const headers = response.headers;
//     const vulnerabilities = [];

//     if (!headers["x-frame-options"]) {
//       vulnerabilities.push("Missing 'X-Frame-Options' header.");
//     }
//     if (!headers["content-security-policy"]) {
//       vulnerabilities.push("Missing 'Content-Security-Policy' header.");
//     }
//     if (!headers["strict-transport-security"]) {
//       vulnerabilities.push("Missing 'Strict-Transport-Security' header.");
//     }

//     res.json({
//       safe: vulnerabilities.length === 0,
//       matches: vulnerabilities,
//     });
//   } catch (error) {
//     console.error("Error scanning URL:", error.message);
//     res.status(500).json({ error: "Could not scan the URL." });
//   }
// });


// const PORT = process.env.PORT || 3000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}!!`);
// });



import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cookieParser from 'cookie-parser';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';
import bcrypt from 'bcrypt';
import cors from "cors"; 
import axios from "axios";


import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from './routes/post.routes.js';
import commentRoutes from './routes/comment.routes.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.json());
app.use(cookieParser());

// Security Middleware
app.use(helmet());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
});
app.use(limiter);

const frontendUrl = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5173'; // Default to frontend URL if not set

// app.use(cors({ origin: frontendUrl,
//   methods: ['GET', 'POST', 'FETCH', 'DELETE'], // Adjust methods as needed
//   credentials: true, // If you need credentials like cookies
//  }));

const corsOptions = {
  origin: frontendUrl || 'http://localhost:5173', // Replace with your client's URL
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'FETCH', ],
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));



// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is Connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

const __dirname = path.resolve();

// Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);


// Generate Security Questions
const generateQuestions = () => {
  const questions = [
    {
      question: "What is phishing?",
      options: ["A fishing technique", "An email scam", "A type of encryption"],
      correctAnswer: 1
    },
    {
      question: "What does VPN stand for?",
      options: ["Very Private Network", "Virtual Private Network", "Verified Personal Network"],
      correctAnswer: 1
    },
    {
      question: "Which of these is a strong password?",
      options: ["password123", "qwerty", "P@ssw0rd!2023"],
      correctAnswer: 2
    },
    {
      question: "What is two-factor authentication?",
      options: ["Using two passwords", "A method that requires two forms of identification", "Logging in twice"],
      correctAnswer: 1
    },
    {
      question: "What should you do if you receive a suspicious email?",
      options: ["Open all attachments", "Reply immediately", "Don't click on any links and report it"],
      correctAnswer: 2
    },
    {
      question: "What is malware?",
      options: ["Malicious software", "A type of computer", "An antivirus program"],
      correctAnswer: 0
    },
    {
      question: "What is a firewall?",
      options: ["A physical wall", "A security system that monitors network traffic", "A type of virus"],
      correctAnswer: 1
    },
    {
      question: "What is encryption?",
      options: ["Deleting files", "Converting data into a code to prevent unauthorized access", "Sending emails"],
      correctAnswer: 1
    },
    {
      question: "What is a data breach?",
      options: ["Backing up data", "Unauthorized access to data", "Deleting old files"],
      correctAnswer: 1
    },
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building social networks", "Manipulating people into giving up confidential information", "Creating social media accounts"],
      correctAnswer: 1
    },
    {
      question: "What is a strong password typically composed of?",
      options: ["Your birthdate", "A mix of uppercase, lowercase, numbers, and symbols", "Your pet's name"],
      correctAnswer: 1
    },
    {
      question: "What is ransomware?",
      options: ["A type of cryptocurrency", "Malware that locks your files and demands payment", "An antivirus software"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of software updates?",
      options: ["To add new features only", "To fix security vulnerabilities and improve performance", "To slow down your computer"],
      correctAnswer: 1
    },
    {
      question: "What is a keylogger?",
      options: ["A type of keyboard", "Software that records keystrokes", "A locksmith tool"],
      correctAnswer: 1
    },
    {
      question: "What is HTTPS?",
      options: ["A type of computer virus", "A secure version of HTTP", "A programming language"],
      correctAnswer: 1
    },
    {
      question: "What is a DDoS attack?",
      options: ["A type of antivirus", "An attempt to make an online service unavailable by overwhelming it with traffic", "A data recovery tool"],
      correctAnswer: 1
    },
    {
      question: "What is the main purpose of an antivirus software?",
      options: ["Speed up your computer", "Detect and remove malware", "Improve internet connection"],
      correctAnswer: 1
    },
    {
      question: "What is a zero-day vulnerability?",
      options: ["A software bug that's been known for years", "A flaw in software unknown to the vendor", "A day without internet access"],
      correctAnswer: 1
    },
    {
      question: "What is the best way to protect against phishing attacks?",
      options: ["Open all emails", "Be cautious of unexpected emails and verify the sender", "Disable your email spam filter"],
      correctAnswer: 1
    },
    {
      question: "What is a botnet?",
      options: ["A network of infected computers controlled by a hacker", "A type of internet service provider", "A robot network for AI"],
      correctAnswer: 0
    },
    {
      question: "What does 'BYOD' stand for in cybersecurity?",
      options: ["Bring Your Own Data", "Bring Your Own Device", "Build Your Own Database"],
      correctAnswer: 1
    },
    {
      question: "What is a brute force attack?",
      options: ["A physical attack on a data center", "An attempt to guess passwords by trying many combinations", "A type of DDoS attack"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of a password manager?",
      options: ["To create weak passwords", "To store and manage complex passwords securely", "To share passwords with others"],
      correctAnswer: 1
    },
    {
      question: "What is sandboxing in cybersecurity?",
      options: ["Playing in a sandbox", "Running programs in an isolated environment", "A type of encryption"],
      correctAnswer: 1
    },
    {
      question: "What is the principle of least privilege?",
      options: ["Giving users the minimum levels of access they need to perform their job", "Providing all users with admin access", "Restricting internet access for all users"],
      correctAnswer: 0
    },
    {
      question: "What is a man-in-the-middle attack?",
      options: ["A physical assault", "An attack where the attacker secretly relays and possibly alters communication between two parties", "A type of social engineering"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of a VPN?",
      options: ["To speed up internet connection", "To provide a secure, encrypted connection over a less secure network", "To block all websites"],
      correctAnswer: 1
    },
    {
      question: "What is phishing?",
      options: ["A type of fish", "An attempt to obtain sensitive information by disguising as a trustworthy entity", "A networking protocol"],
      correctAnswer: 1
    },
    {
      question: "What is a firewall?",
      options: ["A wall made of fire", "A network security device that monitors traffic", "A type of computer virus"],
      correctAnswer: 1
    },
    {
      question: "What is two-factor authentication (2FA)?",
      options: ["Using two passwords", "A security process where users provide two different authentication factors", "Logging in twice"],
      correctAnswer: 1
    },
    {
      question: "What is social engineering in cybersecurity?",
      options: ["Building social networks", "The use of deception to manipulate individuals into divulging confidential information", "A type of social media marketing"],
      correctAnswer: 1
    },
    {
      question: "What is malware?",
      options: ["Malicious hardware", "Software designed to disrupt, damage, or gain unauthorized access", "A type of antivirus"],
      correctAnswer: 1
    },
    {
      question: "What is encryption?",
      options: ["A type of computer virus", "The process of encoding information to protect it from unauthorized access", "A method of deleting files"],
      correctAnswer: 1
    },
    {
      question: "What is a data breach?",
      options: ["A new data storage method", "The intentional or unintentional release of secure information to an untrusted environment", "A type of data backup"],
      correctAnswer: 1
    },
    {
      question: "What is a strong password?",
      options: ["A password that uses personal information", "A long, complex combination of letters, numbers, and symbols", "The word 'password'"],
      correctAnswer: 1
    },
    {
      question: "What is ransomware?",
      options: ["A type of cryptocurrency", "Malware that threatens to publish the victim's data or block access to it unless a ransom is paid", "An antivirus software"],
      correctAnswer: 1
    },
    {
      question: "Why are software updates important?",
      options: ["They only add new features", "They often include security patches and bug fixes", "They are not important"],
      correctAnswer: 1
    },
    {
      question: "What is a keylogger?",
      options: ["A person who makes keys", "A program that records every keystroke made on a computer", "A type of encryption"],
      correctAnswer: 1
    },
    {
      question: "What does HTTPS stand for?",
      options: ["Hyper Text Transfer Protocol Secure", "Highly Tested Transfer Protocol System", "Hyper Text Transmission Protocol Standard"],
      correctAnswer: 0
    },
    {
      question: "What is a DDoS attack?",
      options: ["A type of antivirus", "An attempt to make an online service unavailable by overwhelming it with traffic from multiple sources", "A data recovery method"],
      correctAnswer: 1
    },
    {
      question: "What is the main purpose of antivirus software?",
      options: ["To speed up the computer", "To prevent, detect, and remove malware", "To improve internet connection"],
      correctAnswer: 1
    },
    {
      question: "What is a zero-day vulnerability?",
      options: ["A day without internet", "A software vulnerability that is unknown to those who should be interested in its mitigation", "A type of firewall"],
      correctAnswer: 1
    },
    {
      question: "What is the best practice for creating passwords?",
      options: ["Use the same password for all accounts", "Use long, unique passwords for each account", "Use your birth date as a password"],
      correctAnswer: 1
    },
    {
      question: "What is a botnet?",
      options: ["A network of robots", "A network of compromised computers controlled by an attacker", "A type of antivirus software"],
      correctAnswer: 1
    },
    {
      question: "What is the purpose of a security audit?",
      options: ["To slow down the system", "To systematically evaluate the security of a system or application", "To delete all data"],
      correctAnswer: 1
    },
    {
      question: "What is phishing?",
      options: ["A type of fishing", "An attempt to obtain sensitive information by disguising as a trustworthy entity", "A secure communication protocol"],
      correctAnswer: 1
    },
    {
      question: "What is the principle of least privilege in cybersecurity?",
      options: ["Giving all users admin access", "Providing users with the minimum levels of access they need to perform their job", "Restricting all user access"],
      correctAnswer: 1
    },
    {
      question: "What is a VPN used for?",
      options: ["To make the internet faster", "To provide a secure, encrypted connection over a less secure network", "To block all websites"],
      correctAnswer: 1
    },
    {
      question: "What is multi-factor authentication?",
      options: ["Using multiple passwords", "An authentication method that requires two or more verification factors", "Logging in multiple times"],
      correctAnswer: 1
    }
  ];
  return questions;
};

// Shuffle Function
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Serve Security Questions Route
app.get("/questions", async (req, res) => {
  console.log("Received request for questions");
  const { length } = req.query;
  const numQuestions = parseInt(length, 10) || 5;

  const questions = generateQuestions();
  const shuffledQuestions = shuffle([...questions]).slice(0, numQuestions);

  const hashedQuestions = await Promise.all(
    shuffledQuestions.map(async (q) => {
      const questionHash = await bcrypt.hash(q.question, 10);
      return {
        id: questionHash,
        question: q.question,
        options: q.options,
        correctAnswer: q.correctAnswer,
      };
    })
  );
  console.log("Sending questions:", hashedQuestions);
  res.json(hashedQuestions);
});

// Socket.io setup
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (room) => {
    socket.join(room);
  });

  socket.on('chat message', (msg) => {
    io.to(msg.room).emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// // Serve static files
// app.use(express.static(path.join(__dirname, '/client/dist')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });

// // Catch-all route for undefined routes
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });


// Error Handling Middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
});










app.post("/api/scan-url", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  try {
    // Basic security checks
    const isHttp = url.startsWith("http://");
    const isHttps = url.startsWith("https://");
    if (!isHttp && !isHttps) {
      return res.json({ safe: false, message: "Invalid protocol in URL." });
    }

    // Fetch headers to check for vulnerabilities
    const response = await axios.get(url, { timeout: 5000 });

    // Example header checks
    const headers = response.headers;
    const vulnerabilities = [];

    if (!headers["x-frame-options"]) {
      vulnerabilities.push("Missing 'X-Frame-Options' header.");
    }
    if (!headers["content-security-policy"]) {
      vulnerabilities.push("Missing 'Content-Security-Policy' header.");
    }
    if (!headers["strict-transport-security"]) {
      vulnerabilities.push("Missing 'Strict-Transport-Security' header.");
    }

    res.json({
      safe: vulnerabilities.length === 0,
      matches: vulnerabilities,
    });
  } catch (error) {
    console.error("Error scanning URL:", error.message);
    res.status(500).json({ error: "Could not scan the URL." });
  }
});





import { Resolver } from 'dns/promises';
import sslChecker from 'ssl-checker';

import whois from 'whois-json';
import { execSync } from 'child_process';
import { WebRiskServiceClient } from '@google-cloud/web-risk';
const client = new WebRiskServiceClient();



const safeBrowsing = new WebRiskServiceClient();

async function scanDomain(url) {
  const results = {
    url,
    safeBrowsing: null,
    ssl: null,
    headers: null,
    dns: null,
    whois: null,
    openPorts: null,
    vulnerabilities: [],
  };

  try {
    const domain = new URL(url).hostname;

    // Google Safe Browsing check
    const [safeBrowsingResult] = await safeBrowsing.searchUris({
      uri: url,
      threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE'],
    });
    results.safeBrowsing = safeBrowsingResult.threat ? 'Unsafe' : 'Safe';

    // SSL check
    const sslDetails = await sslChecker(domain);
    results.ssl = {
      valid: sslDetails.valid,
      daysRemaining: sslDetails.daysRemaining,
    };

    // Headers check
    const response = await axios.get(url, { 
      validateStatus: false,
      timeout: 5000,
      headers: { 'User-Agent': 'RealVulnerabilityScanner/1.0' }
    });
    results.headers = response.headers;

    // DNS check
    const dnsResult = await lookup(domain);
    results.dns = dnsResult.address;

    // WHOIS information
    results.whois = await whois(domain);

    // Open ports scan (using nmap)
    const nmapResult = execSync(`nmap -p- -T4 ${domain}`).toString();
    results.openPorts = nmapResult.match(/(\d+)\/tcp\s+open/g)?.map(port => port.split('/')[0]) || [];

    // Vulnerability checks
    if (!results.headers['strict-transport-security']) {
      results.vulnerabilities.push('Missing HSTS header');
    }
    if (!results.headers['x-frame-options']) {
      results.vulnerabilities.push('Missing X-Frame-Options header');
    }
    if (!results.headers['x-xss-protection']) {
      results.vulnerabilities.push('Missing X-XSS-Protection header');
    }
    if (!results.headers['content-security-policy']) {
      results.vulnerabilities.push('Missing Content Security Policy');
    }
    if (results.openPorts.includes('21')) {
      results.vulnerabilities.push('FTP port (21) is open');
    }
    if (results.openPorts.includes('23')) {
      results.vulnerabilities.push('Telnet port (23) is open');
    }

  } catch (error) {
    console.error('Error scanning domain:', error);
    results.error = error.message;
  }

  return results;
}

app.post('api/scan', async (req, res) => {
  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const scanResults = await scanDomain(url);
    res.json(scanResults);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred during the scan' });
  }
});




const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!`);
});

