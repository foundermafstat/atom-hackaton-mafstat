import { StargateClient } from '@cosmjs/stargate';
import { CHAIN_CONFIG } from './config';

interface DisconnectOptions {
  clearCache?: boolean;
  logoutEvent?: boolean;
}

class WalletService {
  private static instance: WalletService;
  private client: StargateClient | null = null;
  private cleanupFunctions: (() => void)[] = [];

  private constructor() {}

  static getInstance(): WalletService {
    if (!this.instance) {
      this.instance = new WalletService();
    }
    return this.instance;
  }

  async disconnect(options: DisconnectOptions = {}): Promise<void> {
    try {
      // Clear StargateClient instance
      if (this.client) {
        await this.client.disconnect();
        this.client = null;
      }

      // Clear Keplr session
      if (window.keplr) {
        // Remove chain suggestions
        try {
          await window.keplr.disable(CHAIN_CONFIG.chainId);
        } catch (error) {
          console.warn('Failed to disable Keplr chain:', error);
        }
      }

      // Clear local storage items related to wallet
      if (options.clearCache) {
        this.clearStorageData();
      }

      // Execute all cleanup functions
      this.cleanupFunctions.forEach(cleanup => cleanup());
      this.cleanupFunctions = [];

      // Log disconnect event
      if (options.logoutEvent) {
        this.logDisconnectEvent();
      }

      // Clear any background intervals
      this.clearBackgroundProcesses();

    } catch (error) {
      console.error('Error during wallet disconnection:', error);
      throw new Error('Failed to securely disconnect wallet');
    }
  }

  private clearStorageData(): void {
    const walletKeys = ['wallet_address', 'wallet_connection_time'];
    walletKeys.forEach(key => {
      try {
        localStorage.removeItem(key);
        sessionStorage.removeItem(key);
      } catch (error) {
        console.warn(`Failed to remove ${key} from storage:`, error);
      }
    });
  }

  private logDisconnectEvent(): void {
    const disconnectEvent = {
      event: 'wallet_disconnect',
      timestamp: new Date().toISOString(),
      chainId: CHAIN_CONFIG.chainId,
    };

    console.info('Wallet disconnection event:', disconnectEvent);
  }

  private clearBackgroundProcesses(): void {
    // Clear any existing intervals
    const highestId = window.setInterval(() => {}, 0);
    for (let i = 0; i < highestId; i++) {
      window.clearInterval(i);
    }
  }

  addCleanupFunction(cleanup: () => void): void {
    this.cleanupFunctions.push(cleanup);
  }
}

export const walletService = WalletService.getInstance();