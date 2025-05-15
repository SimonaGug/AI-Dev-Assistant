import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Header from "./components/Header";
import QueryForm from "./components/QueryForm";
import ResponseDisplay from "./components/ResponseDisplay";
import "./index.css";

function App() {
  const VITE_API_URL = "http://localhost:4000";
  const [response, setResponse] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function sendQuery(query: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${VITE_API_URL}/api/query`, {
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
          Ciao!
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
            <strong>
              I'm Mario, your retired coding maestro and lifelong software
              artisan.
            </strong>
            <br />
            With decades of experience writing clean, elegant code, I'm here to
            help you structure yours like a true pro. But that's not all, as a
            proud Italian, I believe great code deserves great food. That's why
            every time you bring me a coding question, I'll serve up a perfectly
            paired Italian recipe.
            <br />
            The more you code, the more recipes you unlock.
            <br />
            <strong>Buon appetito and happy coding! 🍝💻 </strong>
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
