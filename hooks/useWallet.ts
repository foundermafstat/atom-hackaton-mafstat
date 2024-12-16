'use client';

import { useEffect } from 'react';
import { useWalletStore, checkWalletSession } from '@/lib/store';
import { shallow } from 'zustand/shallow';

export function useWallet() {
  const {
    address,
    isConnected,
    isConnecting,
    error,
    chainId,
    connect,
    disconnect,
    setChain,
    setError,
  } = useWalletStore(
    (state) => ({
      address: state.address,
      isConnected: state.isConnected,
      isConnecting: state.isConnecting,
      error: state.error,
      chainId: state.chainId,
      connect: state.connect,
      disconnect: state.disconnect,
      setChain: state.setChain,
      setError: state.setError,
    }),
    shallow
  );

  useEffect(() => {
    // Check session on mount and when address changes
    checkWalletSession();
  }, [address]);

  return {
    address,
    isConnected,
    isConnecting,
    error,
    chainId,
    connect,
    disconnect,
    setChain,
    setError,
  };
}