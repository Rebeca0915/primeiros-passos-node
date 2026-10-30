import prisma from "../config/prisma.js";

export const cadastrarUsuario({nome, email, senhaHash}){
    return prisma.usuario.create({
        data: {
            nome,
            email,
            senhaHash
        },
        select: {
            id: true,
            nome: true,
            email: true,
            senhaHash: true
        }
    });
}

export function buscarPorEmail({email}){

    return prisma.usuario.findUnique({
        where: {
            email
        }

}