import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import servicosRoutes from "./src/routes/servicosRoutes.js";
import prisma from "./src/config/prisma.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.json({ mensagem: "API FazAí funcionando!" });
});

app.use("/servicos", servicosRoutes);

try {
  await prisma.$connect();
  console.log('Conectado ao banco de dados com sucesso!');

  app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error.message);

  await prisma.$disconnect();
  process.exitCode = 1;
}


