'use client';

import { TransactionForm } from '../../components/ui/TransactionForm';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';

export default function MyTransactions() {
  const handleExpenditureSubmit = (data: any) => {
    console.log('Expenditure:', data);
  };

  const handleIncomeSubmit = (data: any) => {
    console.log('Income:', data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>My Transactions!</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-8">
          <div className="shadow-md p-5 border-red-200 rounded-lg border-8">
            <TransactionForm type="Expenditure" onSubmit={handleExpenditureSubmit} />
          </div>
          <div className="shadow-md p-5 border-green-200 rounded-lg border-8">
            <TransactionForm type="Income" onSubmit={handleIncomeSubmit} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}