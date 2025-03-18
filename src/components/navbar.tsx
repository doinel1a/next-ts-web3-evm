import React from 'react';

import { Skeleton } from '@heroui/skeleton';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), {
  loading: () => <Skeleton className='h-10 w-10 rounded-medium' />
});
const Wallet = dynamic(() => import('./wallet'), {
  loading: () => <Skeleton className='h-10 w-32 rounded-medium' />
});

export default function Navbar() {
  return (
    <header className='flex h-16 w-full items-center justify-between border-b border-border px-5'>
      <span className='text-lg font-black'>Template</span>

      <div className='flex items-center gap-x-5 pr-20'>
        <Wallet className='w-32' />
        <ThemeToggle />
      </div>
    </header>
  );
}
