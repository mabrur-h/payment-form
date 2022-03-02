import express from 'express'
import bodyParser from 'body-parser'
import mongoose from "mongoose"
import cors from 'cors'
import DotEnv from 'dotenv'

import PaymentRoutes from "./routes/payments.js";
import {customErrorMiddleware} from "./middlewares/CustomErrorMiddleware.js";
import {errorHandlerMiddleware} from "./helpers/CustomError.js";

DotEnv.config()

const app = express()

app.use(bodyParser.json({ limit: "20mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }))
app.use(cors());

app.use(customErrorMiddleware);

app.use('/api/payments', PaymentRoutes)

app.use(errorHandlerMiddleware);


const CONNECTION_URL = process.env.CONNECTION_URL
const PORT = process.env.PORT || 7070

// Connect mongo database using URL from env
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`SERVER READY ON PORT ${PORT}`)))
    .catch((error) => console.log("MONGO_ERROR:", error))

// We don't get mongoose warning in the console
mongoose.set('useFindAndModify', false)