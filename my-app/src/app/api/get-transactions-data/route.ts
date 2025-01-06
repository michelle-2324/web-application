import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/user-data.json');

const getData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return { Transactions: { Expenditure: [], Income: [] } };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  const data = JSON.parse(fileData);

  data.Transactions.Expenditure = data.Transactions.Expenditure.map((transaction: any) => ({
    ...transaction,
    date: transaction.date.split('T')[0],
  }));

  data.Transactions.Income = data.Transactions.Income.map((transaction: any) => ({
    ...transaction,
    date: transaction.date.split('T')[0],
  }));

  return data;
};

export async function GET() {
  try {
    const data = getData();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}