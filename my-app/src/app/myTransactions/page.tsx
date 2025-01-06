'use client';

import { TransactionForm, TransactionData } from './TransactionForm';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { useTranslation } from 'react-i18next';

export default function MyTransactions() {
  const { t } = useTranslation();

  const handleSubmit = async (type: 'Expenditure' | 'Income', data: TransactionData, reset: () => void) => {
    const response = await fetch('/api/transactions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, ...data }),
    });

    if (response.ok) {
      console.log(`${type} transaction submitted successfully`, data);
      reset();
      window.alert(t('form.submit'));
    } else {
      console.error('Failed to save transaction');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('myTransactions')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-8">
          <div className="shadow-md p-5 border-red-200 rounded-lg border-8">
            <TransactionForm type="Expenditure" onSubmit={(data, reset) => handleSubmit('Expenditure', data, reset)} />
          </div>
          <div className="shadow-md p-5 border-green-200 rounded-lg border-8">
            <TransactionForm type="Income" onSubmit={(data, reset) => handleSubmit('Income', data, reset)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}