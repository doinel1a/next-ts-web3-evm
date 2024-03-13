import React from 'react';

import dynamic from 'next/dynamic';

import ThemeToggle from './theme-toggle';
import { Skeleton } from './ui/skeleton';

const Wallet = dynamic(() => import('./wallet'), {
  loading: () => <Skeleton className='h-10 w-32 rounded-medium' />,
  ssr: false
});

export default function Navbar() {
  return (
    <header className='flex h-16 w-full items-center justify-between border-b border-border px-5'>
      <span className='text-lg font-black'>Template</span>

      <div className='flex items-center gap-x-5 pr-20'>
        <ThemeToggle />
        <Wallet className='w-32' />
      </div>
    </header>
  );
}
