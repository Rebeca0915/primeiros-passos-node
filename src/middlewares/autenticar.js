export default function autenticar(req, res, next) {
  const autorizacao = req.headers.authorization;
  const tokenSecreto = process.env.TOKEN_SECRETO;

  if (!tokenSecreto || autorizacao !== `Bearer ${tokenSecreto}`) {
    return res.status(401).json({
      erro: "Acesso não autorizado. Token ausente ou inválido"
    });
  }

  next();
}