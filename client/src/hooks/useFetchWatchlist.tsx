import { useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthProvider';
import { fetchStockWatchlist } from '../api/watchlist';

const useFetchWatchList = () => {
  const { token } = useAuth()

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWatchlist = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const result = await fetchStockWatchlist(token);
      setData(result);
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchWatchlist();
  }, [fetchWatchlist]);

  return { data, loading, refetch: fetchWatchlist };
};

export default useFetchWatchList;