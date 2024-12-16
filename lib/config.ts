export const NEUTRON_TESTNET = {
  chainId: 'pion-1',
  chainName: 'Neutron Testnet',
  rpcEndpoint: 'https://rpc-palvus.pion-1.ntrn.tech',
  restEndpoint: 'https://rest-palvus.pion-1.ntrn.tech',
  denom: 'untrn',
  coinDecimals: 6,
  coinDenom: 'NTRN',
  prefix: 'neutron',
  gasPrice: '0.025untrn',
  explorerUrl: 'https://explorer.pion-1.ntrn.tech',
  bech32Config: {
    bech32PrefixAccAddr: 'neutron',
    bech32PrefixAccPub: 'neutronpub',
    bech32PrefixValAddr: 'neutronvaloper',
    bech32PrefixValPub: 'neutronvaloperpub',
    bech32PrefixConsAddr: 'neutronvalcons',
    bech32PrefixConsPub: 'neutronvalconspub',
  },
};

export const COSMOS_TESTNET = {
  chainId: 'theta-testnet-001',
  chainName: 'Cosmos Hub Testnet',
  rpcEndpoint: 'https://rpc.sentry-01.theta-testnet.polypore.xyz',
  restEndpoint: 'https://rest.sentry-01.theta-testnet.polypore.xyz',
  denom: 'uatom',
  coinDecimals: 6,
  coinDenom: 'ATOM',
  prefix: 'cosmos',
  gasPrice: '0.025uatom',
  explorerUrl: 'https://explorer.theta-testnet.polypore.xyz',
  bech32Config: {
    bech32PrefixAccAddr: 'cosmos',
    bech32PrefixAccPub: 'cosmospub',
    bech32PrefixValAddr: 'cosmosvaloper',
    bech32PrefixValPub: 'cosmosvaloperpub',
    bech32PrefixConsAddr: 'cosmosvalcons',
    bech32PrefixConsPub: 'cosmosvalconspub',
  },
};

export const SUPPORTED_CHAINS = [NEUTRON_TESTNET, COSMOS_TESTNET];

// Default to Neutron Testnet if no environment variables are set
export const CHAIN_CONFIG = {
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || NEUTRON_TESTNET.chainId,
  rpcEndpoint: process.env.NEXT_PUBLIC_RPC_ENDPOINT || NEUTRON_TESTNET.rpcEndpoint,
  restEndpoint: process.env.NEXT_PUBLIC_REST_ENDPOINT || NEUTRON_TESTNET.restEndpoint,
  denom: process.env.NEXT_PUBLIC_DENOM || NEUTRON_TESTNET.denom,
  coinDecimals: NEUTRON_TESTNET.coinDecimals,
  coinDenom: NEUTRON_TESTNET.coinDenom,
  prefix: NEUTRON_TESTNET.prefix,
  gasPrice: NEUTRON_TESTNET.gasPrice,
  explorerUrl: NEUTRON_TESTNET.explorerUrl,
};

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('Chain Configuration:', {
    ...CHAIN_CONFIG,
    // Exclude sensitive data if any
  });
}