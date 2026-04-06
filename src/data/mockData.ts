import type { Transaction } from '../types/types';

export const INITIAL_TRANSACTIONS: Transaction[] = [
  // Jan 2026
  { id: 'tj1',  date: '2026-01-01T10:00:00Z', amount: 15000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 'tj2',  date: '2026-01-05T12:30:00Z', amount: 900, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: 'tj3',  date: '2026-01-12T18:45:00Z', amount: 650, category: 'Entertainment', type: 'expense', description: 'Concert Tickets' },
  { id: 'tj4',  date: '2026-01-15T09:15:00Z', amount: 1200, category: 'Utilities', type: 'expense', description: 'Internet & Power' },
  { id: 'tj5',  date: '2026-01-20T11:20:00Z', amount: 2000, category: 'Freelance', type: 'income', description: 'Upwork Client' },
  { id: 'tj6',  date: '2026-01-28T14:10:00Z', amount: 1500, category: 'Shopping', type: 'expense', description: 'Clothing' },
  
  // Feb 2026
  { id: 'tf1',  date: '2026-02-01T10:00:00Z', amount: 15000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 'tf2',  date: '2026-02-04T12:30:00Z', amount: 1100, category: 'Groceries', type: 'expense', description: 'Trader Joe\'s' },
  { id: 'tf3',  date: '2026-02-10T18:45:00Z', amount: 300, category: 'Dining', type: 'expense', description: 'Restaurant' },
  { id: 'tf4',  date: '2026-02-14T09:15:00Z', amount: 800, category: 'Entertainment', type: 'expense', description: 'Valentine\'s Day' },
  { id: 'tf5',  date: '2026-02-20T11:20:00Z', amount: 2500, category: 'Investments', type: 'expense', description: 'Index Funds' },
  { id: 'tf6',  date: '2026-02-25T14:10:00Z', amount: 500, category: 'Transportation', type: 'expense', description: 'Fuel & Transit' },
  
  // Mar 2026
  { id: 't1', date: '2026-03-01T10:00:00Z', amount: 15000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 't2', date: '2026-03-02T12:30:00Z', amount: 1200, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
  { id: 't3', date: '2026-03-03T18:45:00Z', amount: 450, category: 'Entertainment', type: 'expense', description: 'Movie Tickets' },
  { id: 't4', date: '2026-03-05T09:15:00Z', amount: 1500, category: 'Freelance', type: 'income', description: 'Design Project' },
  { id: 't5', date: '2026-03-08T11:20:00Z', amount: 800, category: 'Utilities', type: 'expense', description: 'Electric Bill' },
  { id: 't6', date: '2026-03-10T14:10:00Z', amount: 600, category: 'Dining', type: 'expense', description: 'Dinner with friends' },
  { id: 't7', date: '2026-03-12T08:00:00Z', amount: 150, category: 'Subscriptions', type: 'expense', description: 'Netflix' },
  { id: 't8', date: '2026-03-15T15:30:00Z', amount: 2000, category: 'Shopping', type: 'expense', description: 'Amazon' },
  { id: 't9', date: '2026-03-18T10:00:00Z', amount: 3000, category: 'Investments', type: 'expense', description: 'Stock Purchase' },
  { id: 't10', date: '2026-03-20T19:00:00Z', amount: 650, category: 'Groceries', type: 'expense', description: 'Trader Joe\'s' },
  { id: 't11', date: '2026-03-22T09:00:00Z', amount: 2500, category: 'Freelance', type: 'income', description: 'Consulting' },
  { id: 't12', date: '2026-03-25T13:45:00Z', amount: 900, category: 'Dining', type: 'expense', description: 'Lunch Meeting' },
  { id: 't13', date: '2026-03-28T16:20:00Z', amount: 400, category: 'Transportation', type: 'expense', description: 'Uber' },
  
  // Apr 2026
  { id: 't14', date: '2026-04-01T10:00:00Z', amount: 15000, category: 'Salary', type: 'income', description: 'Tech Corp Inc.' },
  { id: 't15', date: '2026-04-02T11:30:00Z', amount: 1500, category: 'Groceries', type: 'expense', description: 'Whole Foods' },
];

export const CATEGORY_COLORS: Record<string, string> = {
  'Salary': '#22c55e',
  'Freelance': '#10b981',
  'Groceries': '#f59e0b',
  'Entertainment': '#eab308',
  'Utilities': '#3b82f6',
  'Dining': '#f43f5e',
  'Subscriptions': '#8b5cf6',
  'Shopping': '#ec4899',
  'Investments': '#6366f1',
  'Transportation': '#64748b'
};
