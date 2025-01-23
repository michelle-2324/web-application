import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import yahooFinance from 'yahoo-finance2';

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

export async function GET() {
  try {
    const userData = getUserData();
    const holdStocks = userData.Stocks.filter(stock => stock.status === 'Hold');

    const stockPrices = await Promise.all(holdStocks.map(async (stock) => {
      const quote = await yahooFinance.quote(stock.stockSymbol);
      const currentPrice = quote.regularMarketPrice;
      const netGainLoss = ((currentPrice - stock.price) * stock.quantity).toFixed(2);
      return {
        ...stock,
        currentPrice,
        netGainLoss
      };
    }));

    return NextResponse.json({ Stocks: stockPrices });
  } catch (error) {
    console.error('Failed to fetch stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}