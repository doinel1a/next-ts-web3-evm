'use client';

import React, { useMemo } from 'react';

import Link from 'next/link';
import { useChainId, useChains } from 'wagmi';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

import IconItem from '../commons/icon-item';

const FAUCET_URL = 'https://www.alchemy.com/faucets';

export default function Faucet() {
  const chains = useChains();
  const activeChainId = useChainId();

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains]
  );
  const isActiveChainTestnet = useMemo(() => !!activeChain?.testnet, [activeChain]);

  if (!isActiveChainTestnet) {
    return null;
  }

  return (
    <DropdownMenuItem>
      <Link href={FAUCET_URL} target='_blank' className='cursor-default'>
        <IconItem iconName='IconCoins' text='Faucet' />
      </Link>
    </DropdownMenuItem>
  );
}
