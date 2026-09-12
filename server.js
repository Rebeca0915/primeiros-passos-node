import express from "express";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const app = express();
const port = 3000;

app.use(express.json());

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TCC app FazAí",
      version: "1.0.0",
      description: "API para gerenciamento de serviços do app FazAí"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Descrição do servidor local"
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          description: "Informe o token no formato: Bearer TOKEN_SECRET"
        }
      }
    }
  },
  apis: ["./server.js"]
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

let proximoId = 13;
let servicos = [
  { id: 1, titulo: "Conserto de torneira", descricao: "Troca de torneira e pequenos reparos hidráulicos", categoria: "Encanamento", preco: 80, cidade: "Engenheiro Coelho", prestador: "Rafael Lima", disponivel: true },
  { id: 2, titulo: "Instalação de ventilador", descricao: "Instalação de ventilador de teto com teste elétrico", categoria: "Elétrica", preco: 120, cidade: "Artur Nogueira", prestador: "Caio Mendes", disponivel: true },
  { id: 3, titulo: "Limpeza residencial rápida", descricao: "Limpeza geral de cômodos, cozinha e banheiro", categoria: "Limpeza", preco: 150, cidade: "Holambra", prestador: "Bia Martins", disponivel: true },
  { id: 4, titulo: "Pintura de quarto", descricao: "Pintura de um quarto com preparação básica das paredes", categoria: "Pintura", preco: 260, cidade: "Mogi Mirim", prestador: "Diego Alves", disponivel: true },
  { id: 5, titulo: "Corte de grama", descricao: "Corte e recolhimento de grama em quintal residencial", categoria: "Jardinagem", preco: 90, cidade: "Cosmópolis", prestador: "Nina Rocha", disponivel: true },
  { id: 6, titulo: "Montagem de guarda-roupa", descricao: "Montagem de guarda-roupa de até seis portas", categoria: "Montagem de móveis", preco: 180, cidade: "Campinas", prestador: "Leo Santos", disponivel: false },
  { id: 7, titulo: "Troca de tomada", descricao: "Substituição de tomadas e verificação dos fios", categoria: "Elétrica", preco: 65, cidade: "Paulínia", prestador: "Ivo Nunes", disponivel: true },
  { id: 8, titulo: "Instalação de prateleira", descricao: "Fixação de prateleira em parede de alvenaria", categoria: "Instalação", preco: 70, cidade: "Sumaré", prestador: "Lara Campos", disponivel: true },
  { id: 9, titulo: "Reparo de vazamento", descricao: "Identificação e reparo de vazamento em tubulação aparente", categoria: "Encanamento", preco: 110, cidade: "Americana", prestador: "Otávio Reis", disponivel: true },
  { id: 10, titulo: "Limpeza pós-obra", descricao: "Remoção de poeira e resíduos leves após reforma", categoria: "Limpeza", preco: 320, cidade: "Jaguariúna", prestador: "Maya Duarte", disponivel: false },
  { id: 11, titulo: "Pintura de muro", descricao: "Pintura externa de muro residencial de pequeno porte", categoria: "Pintura", preco: 300, cidade: "Limeira", prestador: "Theo Barros", disponivel: true },
  { id: 12, titulo: "Manutenção de chuveiro", descricao: "Avaliação e troca de resistência de chuveiro elétrico", categoria: "Manutenção", preco: 85, cidade: "Valinhos", prestador: "Sara Freitas", disponivel: true }
];

function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  const tokenSecret = process.env.TOKEN_SECRET;

  if (!tokenSecret || authHeader !== `Bearer ${tokenSecret}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token inválido ou ausente."
    });
  }

  next();
}

app.get("/", (req, res) => {
  res.json({ mensagem: "API FazAí funcionando!", versao: "AV1" });
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica se a API está funcionando
 *     responses:
 *       200:
 *         description: API funcionando
 */
app.get("/servicos", (req, res) => {
  res.json(servicos);
});

/**
 * @swagger
 * /servicos:
 *   get:
 *     summary: Lista todos os serviços
 *     responses:
 *       200:
 *         description: Lista de serviços
 */
app.get("/servicos/:id", (req, res) => {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  res.json(servico);
});

/**
 * @swagger
 * /servicos/{id}:
 *   get:
 *     summary: Busca um serviço pelo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço encontrado
 *       404:
 *         description: Serviço não encontrado
 */
app.post("/servicos", autenticar, (req, res) => {
  const erro = validarServico(req.body);

  if (erro) {
    return res.status(400).json({ erro });
  }

  const novoServico = criarServico(req.body);
  servicos.push(novoServico);

  res.status(201).json({ mensagem: "Serviço cadastrado com sucesso.", servico: novoServico });
});

/**
 * @swagger
 * /servicos:
 *   post:
 *     summary: Cadastra um serviço
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titulo, descricao, categoria, preco, cidade, prestador, disponivel]
 *             properties:
 *               titulo: { type: string }
 *               descricao: { type: string }
 *               categoria: { type: string }
 *               preco: { type: number }
 *               cidade: { type: string }
 *               prestador: { type: string }
 *               disponivel: { type: boolean }
 *     responses:
 *       201:
 *         description: Serviço cadastrado
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
app.patch("/servicos/:id", autenticar, (req, res) => {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  const campos = ["titulo", "descricao", "categoria", "preco", "cidade", "prestador", "disponivel"];
  const dadosAtualizados = {};

  for (const campo of campos) {
    if (req.body[campo] !== undefined) {
      dadosAtualizados[campo] = req.body[campo];
    }
  }

  const erro = validarServico(dadosAtualizados, true);

  if (erro) {
    return res.status(400).json({ erro });
  }

  for (const campo of campos) {
    if (dadosAtualizados[campo] !== undefined) {
      servico[campo] = typeof dadosAtualizados[campo] === "string"
        ? dadosAtualizados[campo].trim()
        : dadosAtualizados[campo];
    }
  }

  res.json({ mensagem: "Serviço atualizado com sucesso.", servico });
});

/**
 * @swagger
 * /servicos/{id}:
 *   patch:
 *     summary: Atualiza um serviço
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
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Serviço atualizado
 *       401:
 *         description: Não autorizado
 */
app.delete("/servicos/:id", autenticar, (req, res) => {
  const indice = servicos.findIndex((servico) => servico.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  servicos.splice(indice, 1);
  res.json({ mensagem: "Serviço excluído com sucesso." });
});

/**
 * @swagger
 * /servicos/{id}:
 *   delete:
 *     summary: Exclui um serviço
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
 *         description: Serviço excluído
 *       401:
 *         description: Não autorizado
 */
app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.use((erro, req, res, next) => {
  if (erro instanceof SyntaxError && erro.status === 400 && "body" in erro) {
    return res.status(400).json({ erro: "JSON inválido." });
  }

  res.status(500).json({ erro: "Erro interno do servidor." });
});

function encontrarServico(idInformado) {
  const id = Number(idInformado);
  return Number.isInteger(id) && id > 0
    ? servicos.find((servico) => servico.id === id)
    : undefined;
}

function validarServico(dados, parcial = false) {
  const camposTexto = ["titulo", "descricao", "categoria", "cidade", "prestador"];

  if (!parcial) {
    for (const campo of camposTexto) {
      if (typeof dados[campo] !== "string" || dados[campo].trim() === "") {
        return `O campo ${campo} é obrigatório e deve ser um texto não vazio.`;
      }
    }
  } else {
    for (const campo of camposTexto) {
      if (dados[campo] !== undefined && (typeof dados[campo] !== "string" || dados[campo].trim() === "")) {
        return `O campo ${campo} deve ser um texto não vazio.`;
      }
    }
  }

  if (dados.preco !== undefined && (typeof dados.preco !== "number" || !Number.isFinite(dados.preco) || dados.preco < 0)) {
    return "O campo preco deve ser um número maior ou igual a zero.";
  }

  if (!parcial && dados.preco === undefined) {
    return "O campo preco é obrigatório e deve ser um número maior ou igual a zero.";
  }

  if (dados.disponivel !== undefined && typeof dados.disponivel !== "boolean") {
    return "O campo disponivel deve ser true ou false.";
  }

  if (!parcial && dados.disponivel === undefined) {
    return "O campo disponivel é obrigatório e deve ser true ou false.";
  }

  return null;
}

function criarServico(dados) {
  return {
    id: proximoId++,
    titulo: dados.titulo.trim(),
    descricao: dados.descricao.trim(),
    categoria: dados.categoria.trim(),
    preco: dados.preco,
    cidade: dados.cidade.trim(),
    prestador: dados.prestador.trim(),
    disponivel: dados.disponivel
  };
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
