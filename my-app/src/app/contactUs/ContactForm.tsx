"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormLabel, FormInput } from '../../components/ui/Form';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface ContactFormProps {
  onSubmit: (data: contactFormData, reset: () => void ) => void;
}

const titles = ['Mr.', 'Mrs.', 'Ms.'] as const;

const contactFormSchema = z.object({
    title: z.enum(titles),
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.number().optional(),
    requestContent: z.string().nonempty("Request Content is required"),
    date: z.string(),
});

export type contactFormData = z.infer<typeof contactFormSchema>;

export function ContactForm({ onSubmit }: ContactFormProps) {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<contactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmitHandler = (data: contactFormData) => {
      onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div>
          <FormLabel>{t(`form.title`)}:</FormLabel>
          <select {...register("title")} className="border border-gray-300 rounded-md p-1">
            {titles.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.title && <p className="text-red-500">{t(`form.form.required`)}</p>}
        </div>
        <div>
          <FormLabel>{t(`form.name`)}:</FormLabel>
          <FormInput
            type="text"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500">{t(`form.required`)}</p>}
        </div>
        <div>
          <FormLabel>{t(`form.email`)}:</FormLabel>
          <FormInput
            type="email"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500">{t(`form.invalidEmail`)}</p>}
        </div>
        <div>
          <FormLabel>{t(`form.phone`)}:</FormLabel>
          <FormInput
            type="text"
            {...register("phone", { valueAsNumber: true })}
          />
          {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
            <FormLabel>{t(`form.message`)}:</FormLabel>
            <div className="mt-1">
                <textarea {...register("requestContent")} placeholder={t(`form.inputMessage`)} className="border border-gray-300 rounded-md p-2 w-full"></textarea>  
            </div>
        </div>
        <div hidden>
            <FormInput type="text" {...register("date")} value={new Date().toISOString()}/>
        </div>
      <Button className='hover:bg-blue-500 text-blue-500 border-blue-500' type="submit">
        {t(`form.submit`)}
      </Button>
    </form>
  );
}