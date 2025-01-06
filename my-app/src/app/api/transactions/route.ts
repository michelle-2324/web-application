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

interface UserData {
  Transactions: {
    Expenditure: TransactionData[];
    Income: TransactionData[];
  };
}

const getUserData = (): UserData => {
  if (!fs.existsSync(dataFilePath)) {
    return { Transactions: { Expenditure: [], Income: [] } };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

const saveUserData = (data: UserData) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: Request) {
  const body = await req.json();
  const { type, ...transactionData } = body;
  const userData = getUserData();

  const newTransaction = {
    id: `${type === 'Expenditure' ? 'E' : 'I'}${Date.now()}`,
    ...transactionData,
  };

  if (type === 'Expenditure') {
    userData.Transactions.Expenditure.push(newTransaction);
  } else {
    userData.Transactions.Income.push(newTransaction);
  }

  saveUserData(userData);

  return NextResponse.json({ message: 'Transaction saved successfully' });
}