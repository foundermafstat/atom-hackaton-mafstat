export interface Transaction {
  hash: string;
  type: string;
  amount: string;
  fee: string;
  timestamp: string;
  status: 'success' | 'failed';
  from: string;
  to: string;
}

export interface TransferFormData {
  recipient: string;
  amount: string;
  memo?: string;
}