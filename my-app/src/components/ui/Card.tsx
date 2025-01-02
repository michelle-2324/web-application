import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
}

interface CardHeaderProps {
  children: ReactNode;
}

interface CardTitleProps {
  children: ReactNode;
}

interface CardContentProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <div className="shadow-lg rounded-lg p-4 bg-white">
      {children}
    </div>
  );
}

export function CardHeader({ children }: CardHeaderProps) {
  return (
    <div className="border-b pb-2 mb-4 text-gray-500">
      {children}
    </div>
  );
}

export function CardTitle({ children }: CardTitleProps) {
  return (
    <h2 className="text-xl font-bold">
      {children}
    </h2>
  );
}

export function CardContent({ children }: CardContentProps) {
  return (
    <div>
      {children}
    </div>
  );
}