
import prisma from "./src/config/prisma.js";

try {
    await prisma.$connect();
    console.log("Conexão com o banco realizada com sucesso!");
} catch (erro) {
    console.error("Erro ao conectar com o banco:");
    console.error(erro);
} finally {
    await prisma.$disconnect();
}
