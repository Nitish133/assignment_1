import express from "express"
import cors from "cors"
import "./db/db.connct.js"
import student from "./routes/student.route.js"
const app = express()
app.use(express.json());
app.use(cors())

app.use("/student",student)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


