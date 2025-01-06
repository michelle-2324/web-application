import { ReactNode } from 'react';

interface FormTitleProps {
  children: ReactNode;
  className?: string;
}

interface FormLabelProps {
  children: ReactNode;
  className?: string;
}

const FormTitle = ({ children, className='' }: FormTitleProps) => {
  return (
    <div className={`text-xl font-bold text-center rounded-lg ${className}`}>
      {children}
    </div>
  );
};

const FormLabel = ({ children }: FormLabelProps) => {
  return (
    <label className="font-bold mr-1">
      {children}
    </label>
  );
};

const FormInput = ({ ...rest }) => {
  return (
    <input className="border border-gray-300 rounded-md p-2" {...rest} />
  );
}

export {
  FormTitle,
  FormLabel,
  FormInput
};