export interface Transaction {
  id: number;
  type: string;
  description: string;
  amount: number;
  transaction_date: Date;
  user_id: number;
}

export interface ResponseGetTransactions {
  data: Transaction[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }
}

export interface TransactionRelatorio {
  total_receitas: number;
  total_despesas: number;
  saldo_total: number;
}
