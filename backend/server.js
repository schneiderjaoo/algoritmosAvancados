import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tecladoRoutes from "./src/routes/tecladoRoutes.js";
import connectDB from "./src/config/dbconfig.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

async function escutandoServidor() {
    try {
        const dbClient = await connectDB();

        app.use((req, res, next) => {
            req.db = dbClient;
            next();
        });

        app.use("/api", tecladoRoutes); 

        app.listen(PORT, () => {
            console.log(`Server rodando na porta ${PORT}`);
        });
    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:", err);
    }
}

escutandoServidor();
