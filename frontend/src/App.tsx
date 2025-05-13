import React, { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
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
      {/* Full white center column */}
      <Box
        component={Paper}
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 800,
          bgcolor: "background.paper",
          mx: "auto",
          my: 6,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontSize: "2rem" }}
        >
          AI Dev & Cooking Assistant
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            mb: 3,
          }}
        >
          <CodeIcon fontSize="large" color="primary" />
          <Typography
            variant="subtitle1"
            align="center"
            sx={{ fontSize: "1.2rem", flex: 1 }}
          >
            Welcome! This assistant can help you with development questions and
            suggest delicious recipes based on what you're coding.
          </Typography>
          <RestaurantMenuIcon fontSize="large" color="secondary" />
        </Box>

        <QueryForm onSubmit={sendQuery} loading={loading} />
        {error && (
          <Typography color="error" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <ResponseDisplay response={response} />
        </Box>
      </Box>
    </>
  );
}

export default App;
