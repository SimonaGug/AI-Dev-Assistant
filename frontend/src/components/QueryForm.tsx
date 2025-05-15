import React, { useState, FC } from "react";
import { Box, TextField, Button } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";

interface Props {
  onSubmit: (q: string) => void;
  loading: boolean;
}

const QueryForm: FC<Props> = ({ onSubmit, loading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput("");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        mt: 2,
        mb: 2,
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Hello! How can I help you today?"
        value={input}
        onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
          setInput(e.target.value)
        }
        disabled={loading}
        size="medium"
      />
      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        disabled={loading}
        sx={{ whiteSpace: "nowrap" }}
      >
        {loading ? "Loading…" : "Send"}
      </Button>
    </Box>
  );
};

export default QueryForm;
