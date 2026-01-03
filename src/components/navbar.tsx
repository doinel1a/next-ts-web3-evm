import { Skeleton } from '@heroui/skeleton';
import dynamic from 'next/dynamic';

const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), {
  loading: () => <Skeleton className='rounded-medium h-10 w-10' />
});
const Wallet = dynamic(() => import('./wallet'), {
  loading: () => <Skeleton className='rounded-medium h-10 w-32' />
});

export default function Navbar() {
  return (
    <header className='border-border flex h-16 w-full items-center justify-between border-b px-5'>
      <span className='text-lg font-black'>Template</span>

      <div className='flex items-center gap-x-5 pr-20'>
        <Wallet className='w-32' />
        <ThemeToggle />
      </div>
    </header>
  );
}
