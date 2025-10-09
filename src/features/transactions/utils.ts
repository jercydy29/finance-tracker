import { Transaction } from './types';

export const formatMonth = (date: Date) =>
  date.toLocaleString('en-US', { month: 'long', year: 'numeric' });

export const filterByMonth = (transactions: Transaction[], selectedDate: Date) => {
  const selectedYear = selectedDate.getFullYear();
  const selectedMonth = selectedDate.getMonth();

  return transactions.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === selectedYear && d.getMonth() === selectedMonth;
  });
};

