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

export async function fetchStockWatchlist() {
  const session = await getSession();

  const res = await axiosInstance.get("watchlist", {
    headers: {
      Authorization: `Bearer ${session?.access_token}`,
    },
  });

  return res.data;
}

export async function addStockToWatchlist(ticker: string) {
  const session = await getSession();

  await axiosInstance
    .post(
      "watchlist",
      { ticker },
      {
        headers: {
          Authorization: session?.access_token,
        },
      }
    )
    .then((response) => {
      console.log("Stock added successfully!", response.data);
    })
    .catch((error) => {
      console.error(
        "Failed to add stock:",
        error.response?.data || error.message
      );
    });
}
