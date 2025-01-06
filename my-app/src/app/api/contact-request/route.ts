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

interface UserData {
  ContactRequests: ContactFormData[];
}

const getUserData = (): UserData => {
  if (!fs.existsSync(dataFilePath)) {
    return { ContactRequests: [] };
  }
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return JSON.parse(fileData);
};

const saveUserData = (data: UserData) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: Request) {
  const body = await req.json();
  const { type, ...ContactFormData } = body;
  const userData = getUserData();

  const newTransaction = {
    id: `C${Date.now()}`,
    ...ContactFormData,
  };

  userData.ContactRequests.push(newTransaction);

  saveUserData(userData);

  return NextResponse.json({ message: 'Request saved successfully' });
}