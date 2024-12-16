import { StargateClient, SigningStargateClient } from '@cosmjs/stargate';
import { SUPPORTED_CHAINS } from './config';

export async function getTransactions(address: string, chainId: string): Promise<any[]> {
  try {
    const currentChain = SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
    if (!currentChain) {
      throw new Error('Chain configuration not found');
    }

    // Construct all possible query combinations for transactions
    const queries = [
      `message.sender='${address}'`,
      `transfer.recipient='${address}'`,
      `delegate.delegator='${address}'`,
      `unbond.delegator='${address}'`,
      `withdraw_rewards.delegator='${address}'`,
      `coin_spent.spender='${address}'`,
      `coin_received.receiver='${address}'`,
      `transfer.sender='${address}'`,
    ];

    // Fetch transactions for each query in parallel
    const results = await Promise.all(
      queries.map(async (query) => {
        try {
          const response = await fetch(
            `${currentChain.restEndpoint}/cosmos/tx/v1beta1/txs?events=${encodeURIComponent(
              query
            )}&pagination.limit=50&order_by=ORDER_BY_DESC`
          );
          
          if (!response.ok) {
            console.warn(`Failed to fetch transactions for query ${query}:`, response.statusText);
            return { tx_responses: [] };
          }
          
          const data = await response.json();
          return data;
        } catch (error) {
          console.warn(`Error fetching transactions for query ${query}:`, error);
          return { tx_responses: [] };
        }
      })
    );

    // Combine all transactions and remove duplicates
    const allTxs = results.flatMap((result) => result.tx_responses || []);
    const uniqueTxsMap = new Map();
    
    allTxs.forEach((tx) => {
      if (!uniqueTxsMap.has(tx.txhash)) {
        const events = tx.events || [];
        const transferEvents = events.filter((event: any) => 
          event.type === 'transfer' || 
          event.type === 'coin_spent' || 
          event.type === 'coin_received'
        );

        tx.parsed_events = transferEvents;
        uniqueTxsMap.set(tx.txhash, tx);
      }
    });

    const uniqueTxs = Array.from(uniqueTxsMap.values()).sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    console.log(`Found ${uniqueTxs.length} unique transactions for address ${address} on ${currentChain.chainName}`);
    
    return uniqueTxs;
  } catch (error) {
    console.error('Failed to fetch transactions:', error);
    throw error;
  }
}

export async function sendTokens(
  senderAddress: string,
  recipientAddress: string,
  amount: string,
  chainId: string,
  memo: string = ''
) {
  if (!window.keplr) throw new Error('Keplr wallet not found');

  const currentChain = SUPPORTED_CHAINS.find(chain => chain.chainId === chainId);
  if (!currentChain) {
    throw new Error('Chain configuration not found');
  }

  const offlineSigner = window.keplr.getOfflineSigner(chainId);
  const client = await SigningStargateClient.connectWithSigner(
    currentChain.rpcEndpoint,
    offlineSigner
  );

  const amountInBaseUnit = Math.floor(parseFloat(amount) * Math.pow(10, currentChain.coinDecimals));
  
  const message = {
    typeUrl: '/cosmos.bank.v1beta1.MsgSend',
    value: {
      fromAddress: senderAddress,
      toAddress: recipientAddress,
      amount: [{
        denom: currentChain.denom,
        amount: amountInBaseUnit.toString(),
      }],
    },
  };

  return await client.signAndBroadcast(
    senderAddress,
    [message],
    {
      amount: [{
        denom: currentChain.denom,
        amount: '5000',
      }],
      gas: '200000',
    },
    memo
  );
}