"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FormTitle, FormLabel, FormInput } from '../../components/ui/Form';
import { Button } from '../../components/ui/Button';

interface TransactionFormProps {
  type: 'Expenditure' | 'Income';
  onSubmit: (data: TransactionData, reset: () => void) => void;
}

const currencies = ['HKD', 'CNY', 'USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'INR'] as const;

const transactionSchema = z.object({
  itemName: z.string().nonempty("Item Name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").default(1),
  currency: z.enum(currencies),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().optional(),
  date: z.date().max(new Date(new Date().setHours(23, 59, 59, 999)), "Date cannot be in the future"),
});

export type TransactionData = z.infer<typeof transactionSchema>;

export function TransactionForm({ type, onSubmit }: TransactionFormProps) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmitHandler = (data: TransactionData) => {
    onSubmit(data, reset);
  };

  const handleReset = () => {
    reset();
    setSelectedDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <FormTitle className={`${type === 'Expenditure' ? 'text-red-500' : 'text-green-500'}`}>
        {type === 'Expenditure' ? t('form.expenditure') : t('form.income')}
      </FormTitle>
      <div>
        <FormLabel>{t('form.itemName')}:</FormLabel>
        <FormInput
          type="text"
          {...register("itemName")}
        />
        {errors.itemName && <p className="text-red-500">{t('form.required')}</p>}
      </div>
      <div>
        <FormLabel>{t('form.quantity')}:</FormLabel>
        <FormInput
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          min="1"
        />
        {errors.quantity && <p className="text-red-500">{t('form.min1')}</p>}
      </div>
      <div>
        <FormLabel>{t('form.currency')}:</FormLabel>
        <select {...register("currency")} className="border border-gray-300 rounded-md p-1">
          {currencies.map((cur) => (
            <option key={cur} value={cur}>
              {cur}
            </option>
          ))}
        </select>
        {errors.currency && <p className="text-red-500">{errors.currency.message}</p>}
      </div>
      <div>
        <FormLabel>{t('form.price')}:</FormLabel>
        <FormInput
          type="number"
          {...register("amount", { valueAsNumber: true })}
        />
        {errors.amount && <p className="text-red-500">{t('form.positive')}</p>}
      </div>
      <div>
        <FormLabel>{t('form.category')} ({t('form.optional')}):</FormLabel>
        <FormInput
          type="text"
          {...register("category")}
        />
        {errors.category && <p className="text-red-500">{errors.category.message}</p>}
      </div>
      <div>
        <FormLabel>{t('form.date')}:</FormLabel>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => {
            setSelectedDate(date);
            setValue("date", date);
          }}
          maxDate={new Date()}
          dateFormat="yyyy-MM-dd"
          className="border border-gray-300 rounded-md p-2"
        />
        {errors.date && <p className="text-red-500">{t('form.dateNotFuture')}</p>}
      </div>
      <div className="flex space-x-4">
        <Button type="button" onClick={handleReset} className="hover:bg-gray-500 text-gray-500 border-gray-500">
          {t('form.reset')}
        </Button>
        <Button className={`${type === 'Expenditure' ? 'hover:bg-red-500 text-red-500 border-red-500' : 'hover:bg-green-500 text-green-500 border-green-500'}`} 
          type="submit">{t('form.submit')}
        </Button>
      </div>
    </form>
  );
}