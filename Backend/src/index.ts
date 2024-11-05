import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import path from "path";
import login from './Routes/auth.routes'

dotenv.config();

const app = express();
const port = 4000;

app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", login);

app.use(
  "/public",
  express.static(path.join(__dirname, "/upload"))
);


app.listen(port,()  =>{
  console.log(`Server on port ${port}`)
})