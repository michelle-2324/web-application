"use client";

import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import Table from '../../components/ui/Table';
import { useTranslation } from 'react-i18next';

const MyRecords = () => {
  const { t } = useTranslation();
  const [data, setData] = useState({ Transactions: { Expenditure: [], Income: [] } });

  useEffect(() => {
    fetch('/api/get-transactions-data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error('Failed to fetch data:', error);
      });
  }, []);

  const expenditureItems = data.Transactions.Expenditure;

  const incomeItems = data.Transactions.Income;

  const columns = React.useMemo(
    () => [
      {
        Header: t('form.itemName'),
        accessor: 'itemName',
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
        accessor: 'amount',
      },
      {
        Header: t('form.category'),
        accessor: 'category',
      },
      {
        Header: t('form.date'),
        accessor: 'date',
      },
    ],
    [t]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('myRecords')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex-col space-y-4">
          <div className="text-xl font-bold text-red-500">{t('form.expenditure')}</div>
          <Table columns={columns} data={expenditureItems} className="border-red-200 rounded-lg border-4" />
          <div className="text-xl font-bold text-green-500">{t('form.income')}</div>
          <Table columns={columns} data={incomeItems} className="border-green-200 rounded-lg border-4" />
        </div>
      </CardContent>
    </Card>
  );
};

export default MyRecords;