'use client';

import { useState, useEffect } from 'react';
import { StargateClient } from '@cosmjs/stargate';
import { SUPPORTED_CHAINS } from '@/lib/config';
import { useWallet } from '@/hooks/useWallet';

export function useBalance(address: string | null) {
  const [balances, setBalances] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useWallet();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchBalance = async () => {
      if (!address) {
        setBalances({});
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const currentChain = SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
        if (!currentChain) {
          throw new Error('Chain configuration not found');
        }

        console.log('Fetching balance for address:', address);
        console.log('Using RPC endpoint:', currentChain.rpcEndpoint);

        const client = await StargateClient.connect(currentChain.rpcEndpoint);
        const balance = await client.getBalance(address, currentChain.denom);

        if (mounted) {
          console.log('Received balance:', balance);
          setBalances(prev => ({
            ...prev,
            [currentChain.chainId]: balance.amount
          }));
        }
      } catch (error) {
        console.error('Balance fetch error:', error);
        if (mounted) {
          setError(error instanceof Error ? error.message : 'Failed to fetch balance');
          setBalances({});
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchBalance();

    // Poll for balance updates every 15 seconds
    const pollInterval = setInterval(fetchBalance, 15000);

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(pollInterval);
    };
  }, [address, chainId]);

  return { balances, isLoading, error };
}