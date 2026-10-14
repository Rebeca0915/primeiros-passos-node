# FazAí API

API REST do FazAí, uma plataforma para encontrar e contratar pequenos serviços, como encanamento, elétrica, limpeza, pintura, jardinagem, montagem de móveis, instalação, manutenção e pequenos reparos. A entidade principal é **Serviço**, com os campos `id`, `titulo`, `descricao`, `categoria`, `preco`, `cidade`, `prestador` e `disponivel`.

## Estrutura do projeto

```text
src/
├── config/
│   └── swagger.js
├── controllers/
│   └── servicosController.js
├── data/
│   └── servicos.js
├── middlewares/
│   └── autenticar.js
└── routes/
    └── servicosRoutes.js
```

## Tecnologias

- Node.js e Express
- dotenv para configuração do ambiente
- Swagger UI e swagger-jsdoc para documentação OpenAPI 3.0
- bcrypt instalado para uma evolução futura; não é usado nesta versão
- Dados armazenados em memória, sem banco de dados

## Instalação e execução

Instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste o token didático se desejar. No PowerShell:

```powershell
Copy-Item .env.example .env
```

Inicie a API:

```bash
npm start
```

Para desenvolvimento com reinicialização automática:

```bash
npm run dev
```

Por padrão, o servidor fica em `http://localhost:3000`.

## Autenticação

As rotas `GET /servicos` e `GET /servicos/:id` são públicas. As rotas `POST`, `PATCH` e `DELETE` exigem o cabeçalho:

```text
Authorization: Bearer meu-token
```

O valor depois de `Bearer` deve corresponder à variável `TOKEN_SECRETO` definida no arquivo `.env`. Sem token ou com token inválido, a API responde com HTTP 401.

## Rotas

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/` | Público | Verifica se a API está funcionando |
| GET | `/servicos` | Público | Lista os serviços |
| GET | `/servicos/:id` | Público | Busca um serviço pelo ID |
| POST | `/servicos` | Token | Cadastra um serviço |
| PATCH | `/servicos/:id` | Token | Atualiza parcialmente um serviço |
| DELETE | `/servicos/:id` | Token | Exclui um serviço |

O `POST` exige `titulo`, `descricao`, `categoria`, `preco`, `cidade`, `prestador` e `disponivel`. Textos não podem ser vazios, `preco` deve ser um número maior ou igual a zero e `disponivel` deve ser booleano. O `PATCH` valida somente os campos enviados, não permite alterar o `id` e retorna HTTP 400 quando nenhum campo válido é enviado.

Exemplo de corpo para cadastro:

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

Exemplo de atualização parcial:

```json
{
  "preco": 100,
  "disponivel": false
}
```

## Swagger

Com o servidor iniciado, acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Armazenamento

Os 12 serviços iniciais ficam em um array em memória. Cadastros, alterações e exclusões permanecem somente até o servidor ser reiniciado; esta versão não utiliza banco de dados.
