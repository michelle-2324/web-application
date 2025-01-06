import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/user-data.json');

interface TransactionData {
  itemName: string;
  quantity: number;
  currency: string;
  amount: number;
  category?: string;
  date: string;
}

interface StockData {
  stockSymbol: string;
  quantity: number;
  currency: string;
  price: number;
  date: string;
  status: 'Hold' | 'Sold';
}

interface UserData {
  Transactions: {
    Expenditure: TransactionData[];
    Income: TransactionData[];
  };
  Stocks: StockData[];
}

const getUserData = (): UserData => {
  if (!fs.existsSync(dataFilePath)) {
    return { Transactions: { Expenditure: [], Income: [] }, Stocks: [] };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  const userData = JSON.parse(fileData);

  return {
    Transactions: userData.Transactions || { Expenditure: [], Income: [] },
    Stocks: userData.Stocks || [],
  };
};

const saveUserData = (data: UserData) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const stockData: StockData = body;
    const userData = getUserData();

    const newStock = {
      id: `S${Date.now()}`,
      ...stockData,
    };

    userData.Stocks.push(newStock);

    saveUserData(userData);

    return NextResponse.json({ message: 'Stock saved successfully' });
  } catch (error) {
    console.error('Failed to save stock:', error);
    return NextResponse.json({ error: 'Failed to save stock' }, { status: 500 });
  }
}