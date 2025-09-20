import dotenv from "dotenv";
import express from "express";
import userRouter from "./routes/userRoutes";
import { initDB, pool } from "./config/db";
import postRouter from "./routes/postRoutes";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import helmet from "helmet";
import helmetConfig from "./config/helmetConfig";
let swaggerDocument = YAML.load(__dirname + "/../swagger.yaml");

const serverUrl = process.env.SERVER_URL;
if (
  swaggerDocument &&
  swaggerDocument.servers &&
  swaggerDocument.servers.length > 0
) {
  swaggerDocument.servers[0].url = serverUrl;
}

dotenv.config();

const app = express();
app.use(express.json());

// Security middleware (best practice config)
// Helmet is used to secure Express apps by setting various HTTP headers.
// Below are best-practice options with descriptions for each:
// Helmet is used to secure Express apps by setting various HTTP headers.
// Configuration is defined in src/config/helmetConfig.ts for maintainability.
app.use(helmet(helmetConfig));

// test DB
app.get("/ping", async (_req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() as now");
    res.json({ status: "ok", time: (rows as any)[0].now });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// routes
app.use("/users", userRouter);
app.use("/posts", postRouter);

// Swagger docs route
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

(async () => {
  await initDB();
  app.listen(PORT, () => {
    console.log(`✅ Server listening at http://localhost:${PORT}`);
  });
})();
