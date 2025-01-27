"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { FormTitle, FormLabel, FormInput } from '../../components/ui/Form';
import { Button } from '../../components/ui/Button';
import { useTranslation } from 'react-i18next';

interface StockFormProps {
  onSubmit: (data: StockData, reset: () => void) => void;
}

const currencies = ['HKD', 'CNY', 'USD'] as const;

const stockSchema = z.object({
  stockSymbol: z.string().nonempty("Stock symbol is required"),
  quantity: z.number().positive("Quantity must be positive"),
  currency: z.enum(currencies),
  price: z.number().positive("Amount must be positive"),
  date: z.date().max(new Date(new Date().setHours(23, 59, 59, 999)), "Date cannot be in the future"),
  status: z.enum(['Hold', 'Sold']),
});

export type StockData = z.infer<typeof stockSchema>;

export function StockForm({ onSubmit }: StockFormProps) {
  const { t } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StockData>({
    resolver: zodResolver(stockSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmitHandler = async (data: StockData) => {
    onSubmit(data, reset);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <FormTitle className='text-black-500 !text-left'>
        {t('inputStockInfo')}
      </FormTitle>
      <div>
        <FormLabel>{t('form.stockSymbol')}:</FormLabel>
        <FormInput
          type="text"
          {...register("stockSymbol")}
        />
        {errors.stockSymbol && <p className="text-red-500">{t('form.required')}</p>}
      </div>
      <div>
        <FormLabel>{t('form.quantity')}:</FormLabel>
        <FormInput
          type="number"
          {...register("quantity", { valueAsNumber: true })}
          min="1"
        />
        {errors.quantity && <p className="text-red-500">{t('form.positive')}</p>}
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
        <FormLabel>{t('form.purchasePrice')}:</FormLabel>
        <FormInput
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        {errors.price && <p className="text-red-500">{t('form.positive')}</p>}
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
      <div>
        <FormLabel>{t('form.status')}:</FormLabel>
        <select {...register("status")} className="border border-gray-300 rounded-md p-1">
          <option value="Hold">{t('form.hold')}</option>
          <option value="Sold">{t('form.sold')}</option>
        </select>
        {errors.status && <p className="text-red-500">{errors.status.message}</p>}
      </div>
      <Button className='hover:bg-orange-300 text-orange-300 border-orange-300' type="submit">
        {t('form.submit')}
      </Button>
    </form>
  );
}