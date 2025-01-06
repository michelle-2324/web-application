"use client";

import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/Card';
import { ContactForm, contactFormData } from './ContactForm';
import { useTranslation } from 'react-i18next';

export default function ContactUs() {
  const { t } = useTranslation();

  const handleSubmit = async (data: contactFormData, reset: () => void) => {
    const response = await fetch('/api/contact-request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      window.alert(t('form.submit'));
      reset();
    } else {
      console.error('Failed to save request');
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('contactUs')}</CardTitle>
      </CardHeader>
      <CardContent>
        <ContactForm onSubmit={handleSubmit} />
      </CardContent>
    </Card>
  );
}