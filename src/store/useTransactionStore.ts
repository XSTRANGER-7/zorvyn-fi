import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction } from '../types/types';
import { fetchTransactions } from '../api/transactionService';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
  loadTransactions: () => Promise<void>;
  isInitialized: boolean;
}

export const useTransactionStore = create<TransactionState>()(
  persist(
    (set, get) => ({
      transactions: [], // Start empty, will be hydrated by persist or loadTransactions
      isInitialized: false,
      filterText: '',
      setFilterText: (text) => set({ filterText: text }),
      filterCategory: 'All',
      setFilterCategory: (cat) => set({ filterCategory: cat }),
      
      addTransaction: (tx) => set((state) => ({
        transactions: [
          { ...tx, id: `t${Date.now()}` },
          ...state.transactions
        ]
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter(t => t.id !== id)
      })),

      loadTransactions: async () => {
        // Only load data if the user is completely new (localStorage is empty)
        // By checking isInitialized, we ensure that if a user deletes all their 
        // transactions, we don't accidentally repopulate them!
        if (!get().isInitialized) {
          const data = await fetchTransactions();
          set({ transactions: data, isInitialized: true });
        }
      }
    }),
    {
      name: 'transactions-storage-v3', // bumped to v3 to invalidate v2 cache dates
    }
  )
);

