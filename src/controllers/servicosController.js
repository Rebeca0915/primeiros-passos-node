import servicos from "../data/servicos.js";

const camposTexto = ["titulo", "descricao", "categoria", "cidade", "prestador"];
const camposServico = [...camposTexto, "preco", "disponivel"];
let proximoId = Math.max(...servicos.map((servico) => servico.id)) + 1;

export function listarServicos(req, res) {
  res.json(servicos);
}

export function buscarServico(req, res) {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  res.json(servico);
}

export function cadastrarServico(req, res) {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ erro: "O corpo da requisição deve ser um objeto JSON." });
  }

  const erro = validarServico(req.body);

  if (erro) {
    return res.status(400).json({ erro });
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

  res.status(201).json({ mensagem: "Serviço cadastrado com sucesso.", servico: novoServico });
}

export function editarServico(req, res) {
  const servico = encontrarServico(req.params.id);

  if (!servico) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({ erro: "O corpo da requisição deve ser um objeto JSON." });
  }

  const dadosAtualizados = {};
  for (const campo of camposServico) {
    if (req.body[campo] !== undefined) {
      dadosAtualizados[campo] = req.body[campo];
    }
  }

  if (Object.keys(dadosAtualizados).length === 0) {
    return res.status(400).json({ erro: "Envie ao menos um campo válido para atualizar." });
  }

  const erro = validarServico(dadosAtualizados, true);
  if (erro) {
    return res.status(400).json({ erro });
  }

  for (const campo of Object.keys(dadosAtualizados)) {
    const valor = dadosAtualizados[campo];
    servico[campo] = typeof valor === "string" ? valor.trim() : valor;
  }

  res.json({ mensagem: "Serviço atualizado com sucesso.", servico });
}

export function removerServico(req, res) {
  const indice = servicos.findIndex((servico) => servico.id === Number(req.params.id));

  if (indice === -1) {
    return res.status(404).json({ erro: "Serviço não encontrado." });
  }

  servicos.splice(indice, 1);
  res.json({ mensagem: "Serviço excluído com sucesso." });
}

function encontrarServico(idInformado) {
  const id = Number(idInformado);
  return Number.isInteger(id) && id > 0
    ? servicos.find((servico) => servico.id === id)
    : undefined;
}

function validarServico(dados, parcial = false) {
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
