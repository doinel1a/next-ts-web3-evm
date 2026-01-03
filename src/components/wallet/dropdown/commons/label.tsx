import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

import DynamicFallback from './dynamic-fallback';

type TLabel = ComponentProps<'div'> & {
  property: string;
  value: string;
  isLoading?: boolean;
};

export default function Label({
  property,
  value,
  isLoading,
  className,
  ...otherProperties
}: TLabel) {
  return (
    <div className={cn('flex h-[20px] w-full justify-between', className)} {...otherProperties}>
      <span className='text-muted-foreground w-1/2'>{property}</span>
      {isLoading ? (
        <DynamicFallback className='my-0 w-1/2' />
      ) : (
        <span className='w-1/2 text-right'>{value}</span>
      )}
    </div>
  );
}
