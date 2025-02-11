/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (url: string, method?: RequestMethod, body?: any) => Promise<void>;
}

export function useApi<T>(): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = useCallback(
    async (url: string, method: RequestMethod = "GET", body?: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: body ? JSON.stringify(body) : undefined,
        });

        const result = await response.json();

        if (!response.ok)
          throw new Error(result.message || "Something went wrong");

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { data, error, loading, request };
}
