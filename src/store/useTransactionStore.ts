import { create } from 'zustand';
import type { Transaction } from '../types/types';
import { INITIAL_TRANSACTIONS } from '../data/mockData';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  filterText: string;
  setFilterText: (text: string) => void;
  filterCategory: string;
  setFilterCategory: (cat: string) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: INITIAL_TRANSACTIONS,
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
  }))
}));
