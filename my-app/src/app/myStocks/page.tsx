"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StockForm, StockData } from './StockForm';
import { useTranslation } from 'react-i18next';

export default function MyStocks() {
  const { t } = useTranslation();

  const handleSubmit = async (data: StockData, reset: () => void) => {
    const response = await fetch('/api/stocks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      window.alert(t('form.submit'));
      reset();
    } else {
      console.error('Failed to save stocks');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('myStocks')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4">
          <div className='w-1/3 border-4 border-gray-200'>
            <StockForm onSubmit={handleSubmit} />
          </div>
          <div className='w-2/3 border-4 border-gray-200'>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}