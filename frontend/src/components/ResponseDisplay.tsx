import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  response: string;
}

const ResponseDisplay: FC<Props> = ({ response }) => {
  const hasContent = Boolean(response && response.trim());

  return (
    <Box
      sx={{
        p: 2,
        minHeight: 120,
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        bgcolor: "background.paper",
      }}
    >
      {hasContent ? (
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{response}</ReactMarkdown>
      ) : (
        <Typography variant="body1" color="text.secondary" fontStyle="italic">
          Your assistant responses will appear here.
        </Typography>
      )}
    </Box>
  );
};

export default ResponseDisplay;
