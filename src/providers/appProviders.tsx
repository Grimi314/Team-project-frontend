import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';
import { QueryProvider } from './queryProvider';

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  return (
    <QueryProvider>
      {children}
      <Toaster position="top-right" />
    </QueryProvider>
  );
}
