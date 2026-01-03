'use client';

import { useMemo } from 'react';

import { useChainId, useChains } from 'wagmi';

import { DropdownMenuLabel } from '@/components/ui/dropdown-menu';

import Label from '../commons/label';

export default function Chain() {
  const chains = useChains();
  const activeChainId = useChainId();

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains]
  );

  return (
    <DropdownMenuLabel>
      <Label property='Chain' value={activeChain?.name ?? 'N / A'} />
    </DropdownMenuLabel>
  );
}
