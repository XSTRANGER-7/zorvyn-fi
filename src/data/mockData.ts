import type { Transaction } from '../types/types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-03-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 't2', date: '2024-03-02T12:30:00Z', amount: 120, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: 't3', date: '2024-03-03T18:45:00Z', amount: 45, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: 't4', date: '2024-03-05T09:15:00Z', amount: 1500, category: 'Freelance', type: 'income', description: 'Design Project' },
  { id: 't5', date: '2024-03-08T11:20:00Z', amount: 80, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: 't6', date: '2024-03-10T14:10:00Z', amount: 60, category: 'Dining', type: 'expense', description: 'Dinner with friends' },
  { id: 't7', date: '2024-03-12T08:00:00Z', amount: 15, category: 'Subscriptions', type: 'expense', description: 'Netflix' },
  { id: 't8', date: '2024-03-15T15:30:00Z', amount: 200, category: 'Shopping', type: 'expense', description: 'Amazon' },
  { id: 't9', date: '2024-03-18T10:00:00Z', amount: 300, category: 'Investments', type: 'expense', description: 'Stock Purchase' },
  { id: 't10', date: '2024-03-20T19:00:00Z', amount: 65, category: 'Groceries', type: 'expense', description: 'Trader Joe\'s' },
  { id: 't11', date: '2024-03-22T09:00:00Z', amount: 250, category: 'Freelance', type: 'income', description: 'Consulting' },
  { id: 't12', date: '2024-03-25T13:45:00Z', amount: 90, category: 'Dining', type: 'expense', description: 'Lunch Meeting' },
  { id: 't13', date: '2024-03-28T16:20:00Z', amount: 40, category: 'Transportation', type: 'expense', description: 'Uber' },
  { id: 't14', date: '2024-04-01T10:00:00Z', amount: 5000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 't15', date: '2024-04-02T11:30:00Z', amount: 150, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Salary': '#22c55e',
  'Freelance': '#10b981',
  'Groceries': '#f59e0b',
  'Entertainment': '#aa3bff',
  'Utilities': '#3b82f6',
  'Dining': '#f43f5e',
  'Subscriptions': '#8b5cf6',
  'Shopping': '#ec4899',
  'Investments': '#6366f1',
  'Transportation': '#64748b'
};
