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

const saveFormData = (data: FormData) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

export async function POST(req: Request) {
  const body = await req.json();
  const { type, ...ContactFormData } = body;
  const FormData = getFormData();

  const newRequest = {
    id: `C${Date.now()}`,
    ...ContactFormData,
  };

  FormData.ContactRequests.push(newRequest);

  saveFormData(FormData);

  return NextResponse.json({ message: 'Request saved successfully' });
}