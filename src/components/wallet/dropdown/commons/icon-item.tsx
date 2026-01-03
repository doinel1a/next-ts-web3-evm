'use client';

import type { TTablerIconName } from '@/components/tabler';

import TablerIcon from '@/components/tabler';
import { cn } from '@/lib/utils';

type TIconItem = {
  iconName: TTablerIconName;
  text: string;
  className?: string;
};

export default function IconItem({ iconName, text, className }: Readonly<TIconItem>) {
  return (
    <div className={cn('flex items-center gap-x-2.5', className)}>
      <TablerIcon name={iconName} size={17} />
      <span>{text}</span>
    </div>
  );
}
