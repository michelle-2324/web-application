import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/contact-request.json');

interface ContactFormData {
  id: string;
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
  const { id } = body;

  if (!id) {
    return NextResponse.json({ success: false, message: 'ID is required' }, { status: 400 });
  }

  const formData = getFormData();
  const index = formData.ContactRequests.findIndex(request => request.id === id);

  if (index === -1) {
    return NextResponse.json({ success: false, message: 'Request not found' }, { status: 404 });
  }

  formData.ContactRequests.splice(index, 1);
  saveFormData(formData);

  return NextResponse.json({ success: true, ContactRequests: formData.ContactRequests });
}