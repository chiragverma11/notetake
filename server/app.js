import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import errorMiddleware from "./middlewares/errorMiddleware.js";
import * as dotenv from "dotenv";

const app = express();

//dotenv configuration

if (process.env.NODE_ENV !== "PRODUCTION") {
  dotenv.config({ path: "config/.env" });
}

//Allowed Origins separated with string to Array
const ALLOWED_ORIGINS = process.env.ALLOWED_ORIGINS?.split(",");
//Cors
app.use(
      cors({
        credentials: true,
        origin: ALLOWED_ORIGINS,
      })
    );

app.use(morgan("tiny"));

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
