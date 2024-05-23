import axiosInstance from "../util/axiosInstance";
import { supabaseClient } from "../util/supabaseClient";

export const getSession = async () => {
  const {
    data: { session },
    error,
  } = await supabaseClient.auth.getSession();

  if (error) {
    console.error("Error getting session:", error.message);
    return null;
  }
  return session;
};

export async function fetchStockWatchlist(token: string) {
  const res = await axiosInstance.get("watchlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
}

export async function addStockToWatchlist(ticker: string) {
  const session = await getSession();

  return axiosInstance.post(
    "watchlist",
    { ticker },
    {
      headers: {
        Authorization: session?.access_token,
      },
    }
  );
}
