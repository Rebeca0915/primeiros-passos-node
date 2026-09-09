# FazAí API

API REST acadêmica para cadastro de serviços rápidos e profissionais.

## Tecnologias

- Node.js
- Express
- JavaScript
- Armazenamento em memória

## Como iniciar

```bash
npm install
npm start
```

O servidor ficará disponível em `http://localhost:3000`.

Durante o desenvolvimento, o comando `npm run dev` inicia o servidor com reinício automático usando o Nodemon.

## Rotas da AV1

| Método | Rota | Objetivo |
| --- | --- | --- |
| `GET` | `/` | Verificar se a API está funcionando |
| `POST` | `/servicos` | Cadastrar um serviço |
| `GET` | `/servicos` | Listar todos os serviços |
| `GET` | `/servicos/:id` | Buscar um serviço pelo ID |
| `PATCH` | `/servicos/:id` | Atualizar parte de um serviço |
| `DELETE` | `/servicos/:id` | Excluir um serviço |

Os dados ficam somente na memória. Ao reiniciar o servidor, os 12 serviços iniciais são carregados novamente.

## Acesso às rotas

As rotas `GET` são públicas. Para `POST`, `PATCH` e `DELETE`, envie o cabeçalho abaixo:

```text
Authorization: Bearer seu-token
```

O valor de `seu-token` deve ser igual ao valor da variável de ambiente `TOKEN_SECRET`. No PowerShell, por exemplo:

```powershell
$env:TOKEN_SECRET = "meu-token"
npm start
```

## JSON para o POST

```json
{
  "titulo": "Conserto de torneira",
  "descricao": "Troca de torneira e pequenos reparos hidráulicos",
  "categoria": "Encanamento",
  "preco": 80,
  "cidade": "Engenheiro Coelho",
  "prestador": "João Silva",
  "disponivel": true
}
```

No Insomnia, use `POST http://localhost:3000/servicos`, selecione o corpo JSON e envie o exemplo acima.

## Sequência recomendada no Insomnia

1. Faça o `POST` e anote o `id` retornado.
2. Faça `GET /servicos` para conferir a lista.
3. Faça `GET /servicos/1` usando o ID retornado.
4. Envie um ou mais campos em `PATCH /servicos/1`, sem precisar enviar o objeto inteiro.
5. Faça `DELETE /servicos/1`.
6. Repita um `GET /servicos/1` para verificar a resposta 404.

## Validações

Os campos de texto, `preco` e `disponivel` são obrigatórios no `POST`. No `PATCH`, somente os campos enviados são validados. Textos não podem ficar vazios, `preco` deve ser maior ou igual a zero e `disponivel` deve ser booleano. JSON inválido retorna 400 e serviço ou rota inexistente retorna 404.

## JSON para o PATCH

```json
{
  "preco": 100,
  "disponivel": false
}
```

O campo `id` não é alterado pelo `PATCH`.