# AI Dev Assistant

**A minimalistic development assistant that answers developer queries about italian cousine using natural language.**

Built with React, Express, LangChain (OpenAI), and Prisma, with Docker containerization and PostgreSQL persistence.

---

## 🚀 Tech Stack

- **Frontend**: React + TypeScript (Vite)

  - UI components in `.tsx`
  - Material UI (MUI) for design

- **Backend**: Express.js + TypeScript

  - REST API (`POST /api/query`)
  - LangChain integration calling OpenAI

- **Database**: Prisma ORM (SQLite by default, Postgres optional)
- **Containerization**: Docker & Docker Compose

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v18+ & [Yarn](https://yarnpkg.com/)
- For database & Docker flows:

  - [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🛠️ Local Development

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd ai-dev-assistant
```

### 2. Backend Setup

```bash
cd backend
# Install dependencies
yarn install

# Initialize Prisma (SQLite by default)
cp .env.example .env  # add your OPENAI_API_KEY and DATABASE_URL
npx prisma migrate dev --name init

# Start in development mode
yarn dev
```

The backend will run on [http://localhost:4000](http://localhost:4000) and expose `POST /api/query`.

### 3. Frontend Setup

```bash
cd frontend
# Install dependencies
yarn install

# (Optional) Add Material UI:
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material

# Create environment file
cp .env.example .env  # ensure VITE_API_URL=http://localhost:4000

# Start Vite dev server
yarn dev
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and proxy API calls to your backend.

---

## 🐳 Docker & Docker Compose

A `docker-compose.yml` is provided for an all-in-one setup (Postgres, backend, frontend):

1. Create a root `.env` alongside `docker-compose.yml`:

   ```ini
   OPENAI_API_KEY=sk-...
   POSTGRES_USER=johndoe
   POSTGRES_PASSWORD=secret
   POSTGRES_DB=mydb
   ```

2. Build and start:

   ```bash

   ```

docker-compose up --build

```

- **Frontend** → http://localhost:3000
- **Backend**  → http://localhost:4000
- **Postgres** data persisted in Docker volume `db_data`.

---

## 📁 Project Structure

```

ai-dev-assistant/
├── backend/
│ ├── prisma/
│ │ └── schema.prisma
│ ├── src/
│ │ ├── index.ts
│ │ └── langchain.ts
│ ├── Dockerfile
│ ├── package.json
│ └── .env.example
├── frontend/
│ ├── src/
│ │ ├── main.tsx
│ │ ├── App.tsx
│ │ ├── index.css
│ │ └── components/
│ │ ├── QueryForm.tsx
│ │ └── ResponseDisplay.tsx
│ ├── index.html
│ ├── Dockerfile
│ ├── package.json
│ └── .env.example
├── docker-compose.yml
└── README.md

```

---

## 🔮 Next Steps

- **Enhance UI**: Add more MUI components, themes, or layouts.
- **Prompt Management**: Integrate a prompt store like Langfuse or a database table.
- **Testing**: Add unit/integration tests for frontend and backend.
- **CI/CD**: Automate builds, linting, and deployments.

---

## 📝 License

This project is licensed under MIT. Feel free to adapt and extend!")}

```

# OLD -DELETE

yarn install in backend

yarn add langchain

yarn add -D @types/cors @types/dotenv
run yarn in /frontend and /backend

Add your OPENAI_API_KEY in backend/.env

yarn add react-markdown remark-gfm
