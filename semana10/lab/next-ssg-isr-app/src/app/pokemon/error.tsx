"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error capturado:", error);
  }, [error]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>⚠️ Ocurrió un error inesperado</h2>
      <p>{error.message}</p>
      <button
        onClick={() => reset()}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Reintentar
      </button>
    </div>
  );
}
