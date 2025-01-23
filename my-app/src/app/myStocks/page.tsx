"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { StockForm, StockData } from './StockForm';
import Table from '../../components/ui/Table';
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
      fetchData();
    } else {
      console.error('Failed to save stocks');
    }
  };

  const [data, setData] = useState({ Stocks: [] });

  const fetchData = async () => {
    try {
      const response = await fetch('/api/get-stock-data');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const stockData = await response.json();
      setData(stockData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: t('form.stockSymbol'),
        accessor: 'stockSymbol',
      },
      {
        Header: t('form.quantity'),
        accessor: 'quantity',
      },
      {
        Header: t('form.currency'),
        accessor: 'currency',
      },
      {
        Header: t('form.price'),
        accessor: 'price',
      },
      {
        Header: t('form.date'),
        accessor: 'date',
      },
      {
        Header: t('form.status'),
        accessor: 'status',
      },
      {
        Header: t('form.currentPrice'),
        accessor: 'currentPrice',
      },
      {
        Header: t('form.netGainLoss'),
        accessor: 'netGainLoss',
      },
    ],
    [t]
  );

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
            <Table columns={columns} data={data.Stocks} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}