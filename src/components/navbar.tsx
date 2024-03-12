import React from 'react';

import ThemeToggle from './theme-toggle';
import Wallet from './wallet';

export default function Navbar() {
  return (
    <header className='flex h-16 w-full items-center justify-between border-b border-border px-5'>
      <span className='text-lg font-black'>Template</span>

      <div className='flex items-center gap-x-5 pr-20'>
        <ThemeToggle />
        <Wallet />
      </div>
    </header>
  );
}
