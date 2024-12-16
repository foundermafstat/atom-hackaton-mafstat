import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NEUTRON_TESTNET, COSMOS_TESTNET, SUPPORTED_CHAINS } from './config';
import { walletService } from './wallet-service';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  chainId: string;
  lastConnected: number | null;
  sessionDuration: number;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  setChain: (chainId: string) => Promise<void>;
  setError: (error: string | null) => void;
}

export const useWalletStore = create<WalletState>()(
  persist(
    (set, get) => ({
      address: null,
      isConnected: false,
      isConnecting: false,
      error: null,
      chainId: NEUTRON_TESTNET.chainId,
      lastConnected: null,
      sessionDuration: 24 * 60 * 60 * 1000, // 24 hours

      connect: async () => {
        if (!window.keplr) {
          set({ error: 'Please install Keplr wallet' });
          return;
        }

        try {
          set({ isConnecting: true, error: null });
          const currentChain = SUPPORTED_CHAINS.find(chain => chain.chainId === get().chainId);
          
          if (!currentChain) {
            throw new Error('Invalid chain configuration');
          }

          // Add the chain to Keplr
          await window.keplr.experimentalSuggestChain({
            chainId: currentChain.chainId,
            chainName: currentChain.chainName,
            rpc: currentChain.rpcEndpoint,
            rest: currentChain.restEndpoint,
            bip44: { coinType: 118 },
            bech32Config: currentChain.bech32Config,
            currencies: [{
              coinDenom: currentChain.coinDenom,
              coinMinimalDenom: currentChain.denom,
              coinDecimals: currentChain.coinDecimals,
            }],
            feeCurrencies: [{
              coinDenom: currentChain.coinDenom,
              coinMinimalDenom: currentChain.denom,
              coinDecimals: currentChain.coinDecimals,
              gasPriceStep: {
                low: 0.025,
                average: 0.025,
                high: 0.035,
              },
            }],
            stakeCurrency: {
              coinDenom: currentChain.coinDenom,
              coinMinimalDenom: currentChain.denom,
              coinDecimals: currentChain.coinDecimals,
            },
          });

          await window.keplr.enable(currentChain.chainId);
          const offlineSigner = window.keplr.getOfflineSigner(currentChain.chainId);
          const accounts = await offlineSigner.getAccounts();

          set({
            address: accounts[0].address,
            isConnected: true,
            isConnecting: false,
            lastConnected: Date.now(),
            error: null,
          });

        } catch (error) {
          console.error('Connection error:', error);
          set({
            address: null,
            isConnected: false,
            isConnecting: false,
            error: error instanceof Error ? error.message : 'Failed to connect wallet',
          });
        }
      },

      disconnect: async () => {
        try {
          await walletService.disconnect({ clearCache: true });
          set({
            address: null,
            isConnected: false,
            isConnecting: false,
            error: null,
            lastConnected: null,
          });
        } catch (error) {
          console.error('Disconnection error:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to disconnect wallet',
          });
        }
      },

      setChain: async (chainId: string) => {
        try {
          if (!window.keplr) throw new Error('Keplr wallet not found');

          const newChain = SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
          if (!newChain) throw new Error('Invalid chain selected');

          // Suggest the new chain to Keplr
          await window.keplr.experimentalSuggestChain({
            chainId: newChain.chainId,
            chainName: newChain.chainName,
            rpc: newChain.rpcEndpoint,
            rest: newChain.restEndpoint,
            bip44: { coinType: 118 },
            bech32Config: newChain.bech32Config,
            currencies: [{
              coinDenom: newChain.coinDenom,
              coinMinimalDenom: newChain.denom,
              coinDecimals: newChain.coinDecimals,
            }],
            feeCurrencies: [{
              coinDenom: newChain.coinDenom,
              coinMinimalDenom: newChain.denom,
              coinDecimals: newChain.coinDecimals,
              gasPriceStep: {
                low: 0.025,
                average: 0.025,
                high: 0.035,
              },
            }],
            stakeCurrency: {
              coinDenom: newChain.coinDenom,
              coinMinimalDenom: newChain.denom,
              coinDecimals: newChain.coinDecimals,
            },
          });

          await window.keplr.enable(chainId);
          const offlineSigner = window.keplr.getOfflineSigner(chainId);
          const accounts = await offlineSigner.getAccounts();

          set({
            chainId,
            address: accounts[0].address,
            error: null,
          });
        } catch (error) {
          console.error('Chain change error:', error);
          set({
            error: error instanceof Error ? error.message : 'Failed to change chain',
          });
        }
      },

      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'wallet-storage',
      partialize: (state) => ({
        address: state.address,
        chainId: state.chainId,
        lastConnected: state.lastConnected,
      }),
    }
  )
);

// Session check middleware
export const checkWalletSession = () => {
  const { lastConnected, sessionDuration, disconnect } = useWalletStore.getState();
  
  if (lastConnected && Date.now() - lastConnected > sessionDuration) {
    console.log('Session expired, disconnecting wallet');
    disconnect();
  }
};

// Auto-disconnect after session expiration
if (typeof window !== 'undefined') {
  setInterval(checkWalletSession, 60000); // Check every minute
}