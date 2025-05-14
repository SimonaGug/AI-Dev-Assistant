import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//import { handleQuery } from "./langchain";
import { handleQuery } from "./langfuse";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/query", async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) return res.status(400).json({ error: "No query provided" });

    const responseText = await handleQuery(query);

    // Persist to the database
    await prisma.query.create({
      data: {
        text: query,
        response: responseText,
      },
    });

    res.json({ response: responseText });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "Unknown error" });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
