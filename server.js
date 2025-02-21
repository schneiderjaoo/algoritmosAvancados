import express from "express";
import cors from "cors";
require("dotenv").config();

const tecladoRoutes = required ("./routes/tecladoService");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", tecladoRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server está escutando na porta 3000");
});   