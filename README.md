# AI Coding Assistant

An AI-powered full-stack assistant that can answer technical questions with approachable explanations and suggests personalized recipes for daily inspiration.

Built with a modern TypeScript stack:

- ✅ React frontend
- ✅ Express + LangChain
- ✅ Prisma for type-safe DB access
- ✅ Fully Dockerized

## 📚 Table of Contents

- [Purpose](#purpose)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Using Docker](#using-docker)
  - [Local Development](#local-development)
- [Project Structure](#project-structure)
- [Prompting](#Prompting)
- [Additional Notes](#additional-notes)

## 🧠 Purpose

This app was designed to make learning fun and engaging — especially for young or curious users new to coding. It provides:

- Clear, accessible programming help, from Mario
- Step-by-step Italian recipes, tailored to the question asked

Example queries include:

> _"How to print in Python?"_  
> _"Explain how to do a while loop in Java."_

---

## 🚀 Tech Stack

- **Frontend**: React + TypeScript SPA with a chat interface
- **Backend**: Express.js REST API with Langfuse for prompting
- **Database**: PostgreSQL + Prisma
- **LLM**: OpenAI (via API key)
- **DevOps**: Docker + Docker Compose for container orchestration

---

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) v18+ & [Yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Getting Started

### 🐳 Using Docker

1. **Clone the repository**

   ```bash
   git clone https://github.com/SimonaGug/AI-Dev-Assistant.git
   cd AI-Dev-Assistant
   ```

2. **Create a `.env.docker` file** in the backend directory (see [`.env.example`](./.env.example) for reference)

   ```env
    OPENAI_API_KEY= your-openai-api-key
    LANGFUSE_SECRET_KEY= your-langfuse-secret-key

    DATABASE_URL="postgresql://devuser:devpass@db:5432/devdb?schema=public"
    LANGFUSE_PUBLIC_KEY="pk-lf-a3983f10-7d18-4448-a0d9-3aadbcd7728a"
    LANGFUSE_BASEURL="https://cloud.langfuse.com"
    LANGFUSE_PROJECT_ID="cmamu9tfb002fad07wnbeybr3"
   ```

3. **Build and start the containers**

   ```bash
   docker-compose up --build
   ```

4. **Open the app** in your browser:
   ```
   http://localhost:3000
   ```
5. **Open the Prisma Studio** in your browser:
   ```
   # In another terminal
   cd backend
   yarn prisma studio
   http://localhost:5555
   ```

---

### 🧑‍💻 Local Development (Without Docker)

1. **Install dependencies**

   ```bash
   # Backend
   cd backend
   yarn install

   # Frontend
   cd ../frontend
   yarn install
   ```

2. **Set up the database**

   ```bash
   cd ../backend
   yarn prisma generate
   yarn prisma migrate dev
   ```

3. **Create your `.env` file** in `backend/`

   ```env
    OPENAI_API_KEY= your-openai-api-key
    LANGFUSE_SECRET_KEY= your-langfuse-secret-key

    DATABASE_URL="postgresql://devuser:devpass@localhost:5432/devdb?schema=public"
    LANGFUSE_PUBLIC_KEY="pk-lf-a3983f10-7d18-4448-a0d9-3aadbcd7728a"
    LANGFUSE_BASEURL="https://cloud.langfuse.com"
    LANGFUSE_PROJECT_ID="cmamu9tfb002fad07wnbeybr3"
   ```

4. **Run the servers**

   ```bash
   # In one terminal
   cd backend
   yarn dev

   # In another terminal
   cd frontend
   yarn dev
   ```

5. **Visit**

   ```
   http://localhost:3000
   ```

6. **Open the Prisma Studio** in your browser:
   ```
   # In another terminal
   cd backend
   yarn prisma studio
   http://localhost:5555
   ```

---

## 📁 Project Structure

```
.
├── backend
│   ├── node_modules/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── index.ts
│   │   ├── langchain.ts
│   │   └── langfuse.ts
│   ├── .env
│   ├── .env.docker
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── yarn.lock
├── frontend
│   ├── node_modules/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx
│   │   │   ├── QueryForm.tsx
│   │   │   ├── ResponseDisplay.tsx
│   │   ├── App.tsx
│   │   ├── index.css
│   │   └── main.tsx
│   ├── Dockerfile
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite-env.d.ts
│   ├── vite.config.ts
│   └── yarn.lock
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md

```

## Prompting:

Prompts are managed dynamically through Langfuse, giving you full control over AI behavior at runtime. In your Langfuse project, you’ll define two prompts—typically a `system_prompt` and a `user_prompt`—which are sent together on each request.

Even though both prompts are configured, this code only tracks the `system_prompt` invocations. Since they always fire as a pair, counting `system_prompt` impressions accurately reflects your total prompt usage.

Below is the exact `system_prompt` I used in Langfuse:

````
You are a retired software developer who has spent your entire life coding. You have deep expertise in helping people structure their code, and you also have an encyclopedic knowledge of food because you are Italian: you know exactly which recipes pair best with the kind of coding task someone is about to tackle. When given a coding question, answer as an expert developer and then suggest a fitting recipe (with ingredients and steps).

When recommending recipes, you must only suggest authentic, region-specific Italian dishes. No modern fusions or adaptations. Each recipe you recommend must:
1. Name the dish
2. Specify its region of origin.
3. For every query, *ALWAYS* give a funny, non-serious but realistic reason why the recipe suits the user query.
4. List only the classic ingredients used in that region.
5. Provide step-by-step instructions as they have been handed down by Italian home cooks or traditional trattorie.
6. At the end of the recipe, always include a markdown link to a matching GialloZafferano page

When providing more info, you must use a charming Italian tone and include:
1. Invite the user to explore GialloZafferano in a friendly way.
2. Explain that this is Italy’s #1 recipe site.
3. A note that the site is in Italian, but many recipes have an English button.
4. A tip to use a browser translator if needed
5. Only after providing the previous points, include a Markdown link to the GialloZafferano search page for that dish, in this exact format:
     ```
     [Search on GialloZafferano](https://www.giallozafferano.it/ricerca-ricette/<slug>/)
     ```
     where `<slug>` is the dish name, lowercased, spaces replaced by `+`, and accents removed.
6. End with a warm goodbye: wish them a good day and remind them: first code, then cook!



When answering, you must structure your reply using Markdown following this template:
**Answer**

<provide the coding solution or explanation here>

**Italian Touch**

<First explain why you suggest a recipe. Then explain it with ingredients and steps here. Each step should have a new line. Never provide any link in this section>

**More info**
<Talk about Giallozafferano. On a new line provide the GialloZafferano search page link. On another new line end the answer>


Always adhere to this format, and be concise yet helpful.
````

Below is the exact `human_prompt` I used in Langfuse:

```
The user has asked the following question:

{query}

Please apply the system instructions above when answering.
```

> **Note:** Before integrating Langfuse, this application used LangChain directly. To switch back to LangChain:
>
> 1. Open `backend/src/index.ts`
> 2. Uncomment the LangChain import on **line 4**:
>    ```ts
>    import { LangChainAgent } from "./langchain";
>    ```
> 3. Comment out the Langfuse import on **line 5**:
>    ```ts
>    // import { LangfuseAgent } from './langfuse';
>    ```

## 🔧 Additional Notes

- **Privacy**: This project does not implement or consider any privacy policy. Use at your own discretion.
- **AI Assistance**: Portions of the code and documentation were generated with the help of AI tools.
- **Demo Video**: Watch a recording of the app in action [here]()

```

```
