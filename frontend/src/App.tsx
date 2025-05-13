import React, { useState } from "react";
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
    <div className="container">
      <h1>AI Dev Assistant</h1>
      <QueryForm onSubmit={sendQuery} loading={loading} />
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      <ResponseDisplay response={response} />
    </div>
  );
}

export default App;
