# FazAí API

API REST do FazAí, uma plataforma para encontrar e contratar pequenos serviços, como encanamento, elétrica, limpeza, pintura e jardinagem. A entidade principal é **Serviço**, com os campos `id`, `titulo`, `descricao`, `categoria`, `preco`, `cidade`, `prestador` e `disponivel`.

## Tecnologias

- Node.js e Express
- dotenv para configuração do ambiente
- Swagger UI e swagger-jsdoc para documentação
- bcrypt está instalado para uma evolução futura; não é usado nesta versão
- Dados armazenados em memória, sem banco de dados

## Instalação e inicialização

Instale as dependências:

```bash
npm install
```

Copie `.env.example` para `.env` e ajuste o token se desejar. No PowerShell:

```powershell
Copy-Item .env.example .env
```

Depois, inicie a API:

```bash
npm start
```

Durante o desenvolvimento, use `npm run dev`. Por padrão, o servidor fica em `http://localhost:3000`.

## Autenticação

`GET /servicos` e `GET /servicos/:id` são públicas. `POST`, `PATCH` e `DELETE` exigem o cabeçalho `Authorization: Bearer TOKEN`, em que `TOKEN` deve corresponder à variável de ambiente `TOKEN_SECRETO`. O exemplo incluído em `.env.example` usa `meu-token`.

Sem token ou com token inválido, a API responde com HTTP 401:

```json
{
  "erro": "Acesso não autorizado. Token ausente ou inválido"
}
```

## Rotas

| Método | Rota | Acesso | Descrição |
| --- | --- | --- | --- |
| GET | `/` | Público | Verifica se a API está funcionando |
| GET | `/servicos` | Público | Lista os serviços |
| GET | `/servicos/:id` | Público | Busca um serviço por ID |
| POST | `/servicos` | Token | Cadastra um serviço |
| PATCH | `/servicos/:id` | Token | Atualiza parcialmente um serviço |
| DELETE | `/servicos/:id` | Token | Exclui um serviço |

## Exemplos de corpo

O `POST` exige todos os campos, exceto `id`, que é gerado pela API:

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

O `PATCH` aceita somente os campos que deseja alterar. O `id` não pode ser alterado:

```json
{
  "preco": 100,
  "disponivel": false
}
```

Textos devem ser não vazios, `preco` deve ser um número maior ou igual a zero e `disponivel` deve ser booleano. Campos de texto, `preco` e `disponivel` são obrigatórios no cadastro; no `PATCH`, somente os campos enviados são validados.

## Documentação interativa

Com o servidor iniciado, acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs).

## Armazenamento

Os 12 serviços de exemplo são mantidos em um array em memória. Cadastros, alterações e exclusões duram somente até o servidor ser reiniciado; não há banco de dados nesta versão.