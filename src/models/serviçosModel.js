import prisma from "../config/prisma";
export function criarServico({ titulo, descricao, categoria, preco, cidade, prestador, disponivel }) {
  return prisma.servico.create({
    data: {
      titulo,
      descricao,
      categoria,
      preco,
      cidade,
      prestador,
      disponivel
    }
  });
}

export function listarServicos() {
  return prisma.servico.findMany({
    orderBy: {
      id: "asc"
    }
  });
}