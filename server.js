import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./src/config/swagger.js";
import {
  listarServicos,
  buscarServico,
  cadastrarServico,
  editarServico,
  removerServico
} from "./src/controllers/servicosController.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.get("/api-docs/swagger.json", (req, res) => {
  res.json(swaggerSpec);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

function autenticar(req, res, next) {
  const tokenSecreto = process.env.TOKEN_SECRETO;
  const autorizacao = req.headers.authorization;

  if (!tokenSecreto || autorizacao !== `Bearer ${tokenSecreto}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token ausente ou inválido"
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.json({ mensagem: "API FazAí funcionando!", versao: "AV1" });
});

/**
 * @swagger
 * /servicos:
 *   get:
 *     tags:
 *       - Serviços
 *     summary: Lista todos os serviços
 *     description: Retorna os serviços cadastrados na plataforma FazAí.
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso.
 */
app.get("/servicos", listarServicos);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     tags:
 *       - Serviços
 *     summary: Busca um serviço pelo ID
 *     description: Retorna os dados de um serviço específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador numérico do serviço.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado.
 *       404:
 *         description: Serviço não encontrado.
 */
app.get("/servicos/:id", buscarServico);

/**
 * @swagger
 * /servicos:
 *   post:
 *     tags:
 *       - Serviços
 *     summary: Cadastra um serviço
 *     description: Cria um serviço novo na plataforma FazAí.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             titulo: Instalação de luminária
 *             descricao: Instalação de luminária em teto residencial
 *             categoria: Elétrica
 *             preco: 95
 *             cidade: Campinas
 *             prestador: Ana Souza
 *             disponivel: true
 *     responses:
 *       201:
 *         description: Serviço cadastrado com sucesso.
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes.
 *       401:
 *         description: Token ausente ou inválido.
 */
app.post("/servicos", autenticar, cadastrarServico);

/**
 * @swagger
 * /servicos/{id}:
 *   patch:
 *     tags:
 *       - Serviços
 *     summary: Atualiza parcialmente um serviço
 *     description: Altera somente os campos enviados; o ID não pode ser alterado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador numérico do serviço.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             preco: 105
 *             disponivel: false
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso.
 *       400:
 *         description: Nenhum campo válido enviado ou dados inválidos.
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Serviço não encontrado.
 */
app.patch("/servicos/:id", autenticar, editarServico);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     tags:
 *       - Serviços
 *     summary: Remove um serviço
 *     description: Exclui um serviço pelo seu ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Identificador numérico do serviço.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço excluído com sucesso.
 *       401:
 *         description: Token ausente ou inválido.
 *       404:
 *         description: Serviço não encontrado.
 */
app.delete("/servicos/:id", autenticar, removerServico);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.use((erro, req, res, next) => {
  if (erro instanceof SyntaxError && erro.status === 400 && "body" in erro) {
    return res.status(400).json({ erro: "JSON inválido." });
  }

  res.status(500).json({ erro: "Erro interno do servidor." });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
