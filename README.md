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
| `PUT` | `/servicos/:id` | Atualizar um serviço |
| `DELETE` | `/servicos/:id` | Excluir um serviço |

Os dados ficam somente na memória. Ao reiniciar o servidor, a lista volta a ficar vazia.

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
4. Envie o mesmo formato do JSON em `PUT /servicos/1`, alterando algum campo.
5. Faça `DELETE /servicos/1`.
6. Repita um `GET /servicos/1` para verificar a resposta 404.

## Validações

Os campos de texto são obrigatórios e não podem ficar vazios. `preco` deve ser um número maior ou igual a zero, e `disponivel` deve ser booleano (`true` ou `false`). JSON inválido retorna 400 e serviço ou rota inexistente retorna 404.