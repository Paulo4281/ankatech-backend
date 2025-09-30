# AnkaTech - Case Backend

API backend do sistema MFO, desenvolvida com **Node.js**, **TypeScript**, **Fastify**, **Prisma** & **PostgreSQL**.

## Tecnologias

- Node.js 20+
- TypeScript
- Fastify
- Prisma (ORM)
- PostgreSQL 15
- Jest (testes unitários e de integração)
- Docker / Docker Compose

## Estrutura do Projeto

- `src/`
    - `modules/` Módulos de negócio (allocation, simulation, familyMember, etc)
    - `routes/` Rotas da API
    - `services/` Lógica de negócio
    - `validations/` Validações com Zod
    - `utils/` Helpers
- `tests/` Testes unitários e integração
- `docker/` Scripts SQL e arquivos Docker relacionados
- `prisma/` Prisma schema
- `package.json`
- `tsconfig.json`
- `Dockerfile`

## Rodando localmente (Docker)

1. Clone o repositório do backend.
2. Garanta que você tenha **Docker** e **Docker Compose** instalados.
3. Rode o comando:

```bash
docker-compose up --build
```

Isso irá:

- Subir um container PostgreSQL com o banco plannerdb.

- Rodar npx prisma migrate deploy para aplicar as migrations.

- Popular dados iniciais do init.sql após as migrations.

- Subir o backend na porta 8080.

## Endpoints Principais

A API segue padrão REST. Alguns exemplos:

Método - Rota - Descrição
- POST	/allocation -->	Criar uma nova alocação
- GET	/allocation -->	Listar alocações
- POST	/allocation-registry --> Criar registro de alocação
- PUT	/allocation-registry --> Atualizar registro de alocação
- PUT	/simulation -->	Criar ou atualizar simulação
- GET	/simulation -->	Obter simulação mais recente

## Testes

Rodar todos os testes com:

```bash
yarn test
```

## Instruções docker-compose.yml
### Execute na raíz do projeto onde estiver as pastas ./backend e ./frontend

```bash
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: planner
      POSTGRES_PASSWORD: plannerpw
      POSTGRES_DB: plannerdb
    volumes:
      - pg_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    depends_on:
      - db
    ports:
      - "8080:8080"
    environment:
      DATABASE_URL: postgresql://planner:plannerpw@db:5432/plannerdb
    command: sh -c "npx prisma migrate deploy && PGPASSWORD=plannerpw psql -h db -U planner -d plannerdb -f ./docker/init.sql && yarn start"

  frontend:
    build: ./frontend
    depends_on:
      - backend
    ports:
      - "3000:3000"

volumes:
  pg_data:

```