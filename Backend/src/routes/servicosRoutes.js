import express from "express";
import autenticar from "../middlewares/autenticar.js";
import {
  buscarServico,
  cadastrarServico,
  editarServico,
  listarServicos,
  removerServico
} from "../controllers/servicosController.js";

const router = express.Router();

/**
 * @swagger
 * /servicos:
 *   get:
 *     tags:
 *       - Serviços
 *     summary: Lista todos os serviços
 *     description: Retorna os serviços disponíveis no FazAí. Rota pública.
 *     responses:
 *       200:
 *         description: Lista de serviços retornada com sucesso.
 */
router.get("/", listarServicos);

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     tags:
 *       - Serviços
 *     summary: Busca um serviço pelo ID
 *     description: Retorna um serviço específico. Rota pública.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado.
 *       404:
 *         description: Serviço não encontrado.
 */
router.get("/:id", buscarServico);

/**
 * @swagger
 * /servicos:
 *   post:
 *     tags:
 *       - Serviços
 *     summary: Cadastra um serviço
 *     description: Cria um serviço no FazAí. Requer token Bearer.
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
router.post("/", autenticar, cadastrarServico);

/**
 * @swagger
 * /servicos/{id}:
 *   patch:
 *     tags:
 *       - Serviços
 *     summary: Atualiza parcialmente um serviço
 *     description: Altera somente os campos enviados; o ID não pode ser alterado. Requer token Bearer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
router.patch("/:id", autenticar, editarServico);

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     tags:
 *       - Serviços
 *     summary: Remove um serviço
 *     description: Exclui um serviço pelo ID. Requer token Bearer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
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
router.delete("/:id", autenticar, removerServico);

export default router;