import connectDatabase from "./config/database.js";
import app from "./app.js";
//Calling connectDatabase function to connect to MongoDB
connectDatabase();

//Server Listening
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  process.env.NODE_ENV !== "PRODUCTION"
    ? console.log(`Server is Running on http://localhost:${PORT}`)
    : console.log(`Server is Running`);
});
