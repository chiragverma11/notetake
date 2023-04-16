import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import * as dotenv from "dotenv";

const app = express();

//dotenv configuration
dotenv.config({ path: "backend/config/.env" });

//Cors
app.use(cors());

//Cookie Parser for Accessing cookies
app.use(cookieParser());

//Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes Imports
import user from "./routes/userRoute.js";
import note from "./routes/noteRoute.js";

app.use("/api", user);
app.use("/api", note);

//Error Middleware For Error Handling
app.use(errorMiddleware);

export default app;