import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/contact-request.json');

interface ContactFormData {
    title: string;
    name: string;
    email: string;
    phone?: string;
    date: string;
  }
  
  interface FormData {
    ContactRequests: ContactFormData[];
  }

const getFormData = (): FormData => {
  if (!fs.existsSync(dataFilePath)) {
    return { ContactRequests: [] };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

export async function GET() {
  try {
    const FormData = getFormData();
    return NextResponse.json({ ContactRequests: FormData.ContactRequests });
  } catch (error) {
    console.error('Failed to fetch stock data:', error);
    return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
  }
}