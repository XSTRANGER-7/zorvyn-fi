import { INITIAL_TRANSACTIONS } from '../data/mockData';
import type { Transaction } from '../types/types';

// Mock API service
export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => { 
    setTimeout(() => {
      console.log("🟢 [Mock API]: Successfully Fetched! Here is your raw data:", INITIAL_TRANSACTIONS);
      resolve(INITIAL_TRANSACTIONS);
    }, 500);
  });
};
