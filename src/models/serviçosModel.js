import servicos from "../data/servicos.js";

export function criarServico(dados) {
  const novoServico = {
    id: Math.max(0, ...servicos.map((servico) => servico.id)) + 1,
    ...dados
  };
  servicos.push(novoServico);
  return novoServico;
}

export function listarServicos() {
  return servicos;
}

export function buscarServico(idInformado) {
  const id = Number(idInformado);
  if (!Number.isInteger(id) || id < 1) {
    return undefined;
  }
  return servicos.find((servico) => servico.id === id);
}

export function atualizarServico(id, dadosAtualizados) {
  const servico = buscarServico(id);
  if (!servico) {
    return undefined;
  }
  Object.assign(servico, dadosAtualizados);
  return servico;
}

export function deletarServico(id) {
  const indice = servicos.findIndex((servico) => servico.id === Number(id));
  if (indice === -1) {
    return false;
  }
  servicos.splice(indice, 1);
  return true;
}

