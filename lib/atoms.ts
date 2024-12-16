import { atom } from 'jotai';
import { NEUTRON_TESTNET } from './config';

export interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  chainId: string;
}

export const walletAtom = atom<WalletState>({
  address: null,
  isConnected: false,
  isConnecting: false,
  error: null,
  chainId: NEUTRON_TESTNET.chainId,
});