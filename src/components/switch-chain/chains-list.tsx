'use client';

import React from 'react';

import type { Chain } from 'viem';

import { Button } from '@heroui/button';

type TChainsList = {
  title: string;
  activeChainId: number;
  pendingChainId: number;
  isSwitchSuccess: boolean;
  isSwitchError: boolean;
  chainsList: Chain[];
  onSwitchChain: (chainId: number) => Promise<void>;
};

export default function ChainsList({
  title,
  activeChainId,
  pendingChainId,
  isSwitchSuccess,
  isSwitchError,
  chainsList,
  onSwitchChain
}: TChainsList) {
  return (
    <div className='flex flex-col gap-y-1.5'>
      <h3>{title}</h3>
      <ul className='flex flex-col gap-y-2.5 pl-1.5'>
        {chainsList.map((chain) => (
          <li key={chain.id} className='relative flex h-10 w-full items-center justify-end'>
            <Button
              color='secondary'
              className='w-full items-center justify-start'
              onPress={() => onSwitchChain(chain.id)}
            >
              {chain.name}
            </Button>

            {!isSwitchSuccess && chain.id === pendingChainId ? (
              isSwitchError ? (
                <div className='pointer-events-none absolute right-4 flex items-center gap-x-2.5'>
                  <span className='text-sm'>Failed</span>
                  <span className='h-2 w-2 rounded-full bg-red-400' />
                </div>
              ) : (
                <div className='pointer-events-none absolute right-4 flex items-center gap-x-2.5'>
                  <span className='text-sm'>Approve in Wallet</span>
                  <span className='h-2 w-2 animate-pulse rounded-full bg-yellow-400' />
                </div>
              )
            ) : null}

            {chain.id === activeChainId ? (
              <div className='pointer-events-none absolute right-4 flex items-center gap-x-2.5'>
                <span className='text-sm'>Connected</span>
                <span className='h-2 w-2 rounded-full bg-green-400' />
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
