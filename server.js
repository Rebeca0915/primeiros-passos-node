import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

let servicos = [];
let proximoId = 1;

app.get("/", (req, res) => {
  res.json({
    mensagem: "API FazAí funcionando!",
    versao: "AV1"
  });
});

app.get("/servicos", (req, res) => {
  res.json(servicos);
});

app.get("/servicos/:id", (req, res) => {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({
      mensagem: "Serviço não encontrado"
    });
  }

  res.json(servico);
});

app.post("/servicos", (req, res) => {
  const erro = validarServico(req.body);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  const novoServico = {
    id: proximoId++,
    titulo: req.body.titulo.trim(),
    descricao: req.body.descricao.trim(),
    categoria: req.body.categoria.trim(),
    preco: req.body.preco,
    cidade: req.body.cidade.trim(),
    prestador: req.body.prestador.trim(),
    disponivel: req.body.disponivel
  };

  servicos.push(novoServico);

  res.status(201).json({
    mensagem: "Serviço cadastrado com sucesso",
    servico: novoServico
  });
});

app.put("/servicos/:id", (req, res) => {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({ mensagem: "Serviço não encontrado" });
  }

  const erro = validarServico(req.body);

  if (erro) {
    return res.status(400).json({ mensagem: erro });
  }

  Object.assign(servico, {
    titulo: req.body.titulo.trim(),
    descricao: req.body.descricao.trim(),
    categoria: req.body.categoria.trim(),
    preco: req.body.preco,
    cidade: req.body.cidade.trim(),
    prestador: req.body.prestador.trim(),
    disponivel: req.body.disponivel
  });

  res.json({
    mensagem: "Serviço atualizado com sucesso",
    servico
  });
});

app.delete("/servicos/:id", (req, res) => {
  const indice = servicos.findIndex((servico) => servico.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ mensagem: "Serviço não encontrado" });
  }

  servicos.splice(indice, 1);

  res.json({ mensagem: "Serviço excluído com sucesso" });
});

app.use((req, res) => {
  res.status(404).json({ mensagem: "Rota não encontrada" });
});

app.use((erro, req, res, next) => {
  if (erro instanceof SyntaxError && erro.status === 400 && "body" in erro) {
    return res.status(400).json({ mensagem: "JSON inválido" });
  }

  next(erro);
});

function encontrarServico(idInformado) {
  const id = Number(idInformado);

  if (!Number.isInteger(id) || id <= 0) {
    return undefined;
  }

  return servicos.find((servico) => servico.id === id);
}

function validarServico(dados) {
  const camposTexto = ["titulo", "descricao", "categoria", "cidade", "prestador"];

  for (const campo of camposTexto) {
    if (typeof dados[campo] !== "string" || dados[campo].trim() === "") {
      return `O campo ${campo} é obrigatório e deve ser um texto não vazio`;
    }
  }

  if (typeof dados.preco !== "number" || !Number.isFinite(dados.preco) || dados.preco < 0) {
    return "O campo preco deve ser um número maior ou igual a zero";
  }

  if (typeof dados.disponivel !== "boolean") {
    return "O campo disponivel deve ser true ou false";
  }

  return null;
}

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
