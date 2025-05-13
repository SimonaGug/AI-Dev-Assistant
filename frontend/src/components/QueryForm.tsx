import React, { useState } from "react";

interface Props {
  onSubmit: (q: string) => void;
  loading: boolean;
}

export default function QueryForm({ onSubmit, loading }: Props) {
  const [input, setInput] = useState("");

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <form onSubmit={handle}>
      <input
        type="text"
        placeholder="Ask me anything..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading…" : "Send"}
      </button>
    </form>
  );
}
