'use client';

import React from 'react';

import type { Chain } from 'viem';

import { DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ChainsList from './chains-list';

type TSwitchChainDialogContent = {
  activeChainId: number | undefined;
  pendingChainId: number;
  isSwitchSuccess: boolean;
  isSwitchError: boolean;
  mainnetChains: Chain[];
  testnetChains: Chain[];
  description?: string;
  onSwitchChain: (chainId: number) => Promise<void>;
};

export default function SwitchChainDialogContent({
  activeChainId,
  pendingChainId,
  isSwitchSuccess,
  isSwitchError,
  mainnetChains,
  testnetChains,
  description,
  onSwitchChain
}: TSwitchChainDialogContent) {
  if (!activeChainId) {
    return null;
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Switch Chain</DialogTitle>
        {description && <DialogDescription>{description}</DialogDescription>}
      </DialogHeader>

      <div className='flex flex-col gap-y-3'>
        <ChainsList
          title='Mainnet'
          activeChainId={activeChainId}
          pendingChainId={pendingChainId}
          isSwitchSuccess={isSwitchSuccess}
          isSwitchError={isSwitchError}
          chainsList={mainnetChains}
          onSwitchChain={onSwitchChain}
        />

        <ChainsList
          title='Testnet'
          activeChainId={activeChainId}
          pendingChainId={pendingChainId}
          isSwitchSuccess={isSwitchSuccess}
          isSwitchError={isSwitchError}
          chainsList={testnetChains}
          onSwitchChain={onSwitchChain}
        />
      </div>
    </>
  );
}
