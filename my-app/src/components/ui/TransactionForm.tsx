"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';

interface TransactionFormProps {
  type: 'Expenditure' | 'Income';
  onSubmit: (data: TransactionData) => void;
}

const currencies = ['HKD', 'CNY', 'USD', 'EUR', 'JPY', 'GBP', 'AUD', 'CAD', 'INR'] as const;

const transactionSchema = z.object({
  itemName: z.string().nonempty("Item Name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1").default(1),
  currency: z.enum(currencies),
  amount: z.number().positive("Amount must be positive"),
  category: z.string().optional(),
  date: z.date().max(new Date(), "Date cannot be in the future"),
});

type TransactionData = z.infer<typeof transactionSchema>;

export function TransactionForm({ type, onSubmit }: TransactionFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TransactionData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const onSubmitHandler = async (data: TransactionData) => {
    // const response = await fetch('/api/transactions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ type, ...data }),
    // });

    // if (response.ok) {
    //   onSubmit(data);
    // } else {
    //   console.error('Failed to save transaction');
    // }
    console.log('submit!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div 
        className={`${type === 'Expenditure' ? 'text-red-500' : 'text-green-500'} text-xl font-bold text-center rounded-lg`}>
        {type}
      </div>
      <div className="font-bold">
        <div>
          <label>Item Name:</label>
          <input
            type="text"
            {...register("itemName")}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.itemName && <p className="text-red-500">{errors.itemName.message}</p>}
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            {...register("quantity", { valueAsNumber: true })}
            min="1"
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.quantity && <p className="text-red-500">{errors.quantity.message}</p>}
        </div>
        <div>
          <label>Currency:</label>
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
          <label>Amount:</label>
          <input
            type="number"
            {...register("amount", { valueAsNumber: true })}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.amount && <p className="text-red-500">{errors.amount.message}</p>}
        </div>
        <div>
          <label>Category (optional):</label>
          <input
            type="text"
            {...register("category")}
            className="border border-gray-300 rounded-md p-2"
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}
        </div>
        <div>
          <label>Date:</label>
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
          {errors.date && <p className="text-red-500">{errors.date.message}</p>}
        </div>
      </div>
      <button className={`bg-transparent 
        ${type === 'Expenditure' ? 'hover:bg-red-500 text-red-500 border-red-500' : 'hover:bg-green-500 text-green-500 border-green-500'} 
        text-xl font-semibold hover:text-white text-center py-2 px-4 border hover:border-transparent rounded`} 
        type="submit">Submit
      </button>
    </form>
  );
}