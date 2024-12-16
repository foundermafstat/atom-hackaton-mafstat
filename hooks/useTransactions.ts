'use client';

import { useState, useEffect } from 'react';
import { getTransactions } from '@/lib/cosmos';
import type { Transaction } from '@/lib/types';
import { SUPPORTED_CHAINS } from '@/lib/config';
import { useWallet } from '@/hooks/useWallet';

export function useTransactions(address: string | null) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { chainId } = useWallet();

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    const fetchTransactions = async () => {
      if (!address || !chainId) return;

      try {
        setIsLoading(true);
        setError(null);
        const txs = await getTransactions(address, chainId);
        
        if (!mounted) return;

        const currentChain = SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
        if (!currentChain) {
          throw new Error('Chain configuration not found');
        }

        const formattedTxs = txs.map((tx: any) => {
          const msg = tx.tx.body.messages[0];
          const msgType = msg['@type'];
          
          let type = 'Unknown';
          let from = '';
          let to = '';
          let amount = '0';

          const transferEvent = tx.events?.find((e: any) => 
            e.type === 'transfer' || 
            e.type === 'coin_spent' || 
            e.type === 'coin_received'
          );

          const getAttributeValue = (event: any, key: string) => 
            event?.attributes?.find((a: any) => a.key === key)?.value || '';

          switch (msgType) {
            case '/cosmos.bank.v1beta1.MsgSend':
              type = 'Transfer';
              from = msg.from_address;
              to = msg.to_address;
              amount = transferEvent 
                ? getAttributeValue(transferEvent, 'amount')
                : (msg.amount?.[0]?.amount || '0');
              break;

            case '/cosmos.staking.v1beta1.MsgDelegate':
              type = 'Delegate';
              from = msg.delegator_address;
              to = msg.validator_address;
              amount = msg.amount?.amount || '0';
              break;

            case '/cosmos.staking.v1beta1.MsgUndelegate':
              type = 'Undelegate';
              from = msg.delegator_address;
              to = msg.validator_address;
              amount = msg.amount?.amount || '0';
              break;

            case '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward':
              type = 'Claim Reward';
              from = msg.delegator_address;
              to = msg.validator_address;
              const rewardEvent = tx.events?.find((e: any) => e.type === 'withdraw_rewards');
              amount = getAttributeValue(rewardEvent, 'amount') || '0';
              break;

            default:
              if (transferEvent) {
                type = 'Transfer';
                from = getAttributeValue(transferEvent, 'sender') || 
                      getAttributeValue(transferEvent, 'spender');
                to = getAttributeValue(transferEvent, 'recipient') || 
                     getAttributeValue(transferEvent, 'receiver');
                amount = getAttributeValue(transferEvent, 'amount');
              } else {
                type = msgType.split('.').pop()?.replace('Msg', '') || 'Unknown';
              }
          }

          amount = amount.replace(new RegExp(`${currentChain.denom}$`), '');

          return {
            hash: tx.txhash,
            type,
            amount,
            fee: tx.tx.auth_info.fee.amount?.[0]?.amount || '0',
            timestamp: tx.timestamp,
            status: tx.code === 0 ? 'success' : 'failed',
            from,
            to,
            memo: tx.tx.body.memo || '',
          };
        });

        setTransactions(formattedTxs);
      } catch (error) {
        if (mounted) {
          console.error('Transaction fetch error:', error);
          setError(error instanceof Error ? error.message : 'Failed to fetch transactions');
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    fetchTransactions();

    // Poll for new transactions every 15 seconds
    const pollInterval = setInterval(fetchTransactions, 15000);

    return () => {
      mounted = false;
      controller.abort();
      clearInterval(pollInterval);
    };
  }, [address, chainId]);

  return { 
    transactions, 
    isLoading, 
    error,
    refetch: async () => {
      setIsLoading(true);
      try {
        const txs = await getTransactions(address || '', chainId);
        setTransactions(txs);
      } catch (error) {
        console.error('Manual refresh error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };
}