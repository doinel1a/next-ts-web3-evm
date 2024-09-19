import React from 'react';

import type { PropsWithChildren } from 'react';

import { Skeleton } from '@nextui-org/skeleton';

import { cn } from '@/lib/utils';

type TDynamicFallback = PropsWithChildren & {
  className?: string;
};

export default function DynamicFallback({ className, children }: TDynamicFallback) {
  return (
    <Skeleton className={cn('my-1.5 h-[22px] w-full rounded-md', className)}> {children}</Skeleton>
  );
}
