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
import securityPersonnelRoutes from './routes/securityPersonnel.routes.js';
import chatRoutes from './routes/chat.routes.js';

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


app.use(cors({ origin: 'process.env.REACT_APP_FRONTEND_URL' }));



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
app.use('/api/security', securityPersonnelRoutes);
app.use('/api/chat', chatRoutes);

// Generate Security Questions
const generateQuestions = () => {
  const baseQuestions = [
    {
      question: "What is phishing?",
      options: ["An email scam", "A type of malware", "A web browser"],
      correctAnswer: 0,
    },
    {
      question: "What should you do if you receive a suspicious email link?",
      options: ["Click the link", "Delete the email", "Report it as spam"],
      correctAnswer: 2,
    },
    {
      question: "What is the safest way to create a password?",
      options: [
        "Use 'password123' for all accounts",
        "Use a unique, strong password for each account",
        "Write it down on a sticky note",
      ],
      correctAnswer: 1,
    },
  ];

  const questions = [];
  for (let i = 0; i < 20; i++) {
    baseQuestions.forEach((q) => {
      questions.push({ ...q, id: `${q.question}-${i}` });
    });
  }
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
        correctAnswer: q.correctAnswer, // Optional
      };
    })
  );

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

// Serve static files
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

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


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!!`);
});



// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";
// import cookieParser from 'cookie-parser';
// import http from 'http';
// import { Server } from 'socket.io';
// import bcrypt from 'bcrypt';
// import cors from "cors"; 
// import axios from "axios";

// import userRoutes from "./routes/user.routes.js";
// import authRoutes from "./routes/auth.routes.js";
// import postRoutes from './routes/post.routes.js';
// import commentRoutes from './routes/comment.routes.js';
// import securityPersonnelRoutes from './routes/securityPersonnel.routes.js';
// import chatRoutes from './routes/chat.routes.js';

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

// app.use(cors({
//   origin: process.env.REACT_APP_FRONTEND_URL || 'http://localhost:5173',
//   credentials: true,
// }));

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB is Connected");
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// // Routes
// app.use("/api/user", userRoutes);
// app.use("/api/auth", authRoutes);
// app.use('/api/post', postRoutes);
// app.use('/api/comment', commentRoutes);
// app.use('/api/security', securityPersonnelRoutes);
// app.use('/api/chat', chatRoutes);

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

// // URL Scanning endpoint
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

// // Catch-all route for API
// app.use('/api/*', (req, res) => {
//   res.status(404).json({ error: 'API endpoint not found' });
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

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}!!`);
// });

