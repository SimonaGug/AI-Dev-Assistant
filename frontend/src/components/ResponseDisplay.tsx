import React from "react";

interface Props {
  response: string;
}

export default function ResponseDisplay({ response }: Props) {
  return (
    <div className="response">
      {response || "Your assistant responses will appear here."}
    </div>
  );
}
