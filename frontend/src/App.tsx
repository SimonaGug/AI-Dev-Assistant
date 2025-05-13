import React, { useState } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Header from "./components/Header";
import QueryForm from "./components/QueryForm";
import ResponseDisplay from "./components/ResponseDisplay";
import "./index.css";

function App() {
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendQuery(query: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (res.ok) setResponse(data.response);
      else setError(data.error || "Unknown error");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Box sx={{ my: 6 }}>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}
          >
            <CodeIcon fontSize="large" color="primary" />
            <Typography variant="h2" align="center" sx={{ fontSize: "1.5rem" }}>
              Welcome! This assistant can help you with development questions
              and suggest delicious recipes based on what you're coding.
            </Typography>
            <RestaurantMenuIcon fontSize="large" color="secondary" />
          </Box>
          <Paper elevation={3} sx={{ p: 4 }}>
            <QueryForm onSubmit={sendQuery} loading={loading} />
            {error && (
              <Typography
                color="error"
                align="center"
                sx={{ mt: 2, fontSize: "1rem" }}
              >
                {error}
              </Typography>
            )}
            <ResponseDisplay response={response} />
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default App;
