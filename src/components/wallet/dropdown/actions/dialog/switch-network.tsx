'use client';

import React, { useMemo } from 'react';

import type { Chain } from 'viem';

import { Button } from '@nextui-org/button';
import { RefreshCcw } from 'lucide-react';
import { useChainId, useSwitchChain } from 'wagmi';

import SuccessToastContent from '@/components/success-toast-content';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/toast/use-toast';

import ForwardedDialog from '.';
import IconDropdownMenuItem from '../../commons/icon-item';

type TSwitchNetworkDialog = {
  isDialogOpen?: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDropdownSelect: () => void;
  onDialogOpenChange: (open: boolean) => void;
};

export default function SwitchNetworkDialog({
  isDialogOpen,
  setIsDropdownOpen,
  onDropdownSelect,
  onDialogOpenChange
}: TSwitchNetworkDialog) {
  const activeChainId = useChainId();
  const { chains, variables, isError, isSuccess, reset, switchChainAsync } = useSwitchChain();

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains]
  );
  const mainnetChains = useMemo(() => chains.filter((chain) => !!!chain.testnet), [chains]);
  const testnetChains = useMemo(() => chains.filter((chain) => !!chain.testnet), [chains]);

  const { toast } = useToast();

  async function onSwitchChain(chainId: number) {
    if (activeChainId === chainId) {
      return;
    }

    try {
      await switchChainAsync({ chainId });

      onDialogOpenChange(false);
      setIsDropdownOpen(false);

      toast({
        description: (
          <SuccessToastContent>
            <div>
              <p>The Switch Network request was successfull.</p>
              {activeChain ? (
                <p>
                  Switched Network to <span className='font-semibold'>{activeChain.name}</span>.
                </p>
              ) : null}
            </div>
          </SuccessToastContent>
        )
      });
    } catch (error: unknown) {
      if (
        error !== null &&
        error !== undefined &&
        typeof error === 'object' &&
        'name' in error &&
        typeof error.name === 'string'
      ) {
        let errorMessage = '';

        switch (error.name) {
          case 'UserRejectedRequestError': {
            errorMessage = 'The Switch Network request was rejected.';
            break;
          }
          case 'SwitchChainError': {
            errorMessage = 'A Switch Network request is already pending.';
            break;
          }
          default: {
            errorMessage = 'Something horribly wrong happened.';
            break;
          }
        }

        toast({
          variant: 'destructive',
          description: errorMessage
        });
      }

      console.error('Error switching chain', error);
    }
  }

  return (
    <ForwardedDialog
      isDialogOpen={isDialogOpen}
      triggerChildren={<IconDropdownMenuItem icon={RefreshCcw} text='Switch Network' />}
      onDropdownSelect={onDropdownSelect}
      onDialogOpenChange={(open) => {
        onDialogOpenChange(open);
        reset();
      }}
    >
      <DialogHeader>
        <DialogTitle>Switch Network</DialogTitle>
      </DialogHeader>

      <div className='flex flex-col gap-y-3'>
        <ChainsList
          title='Mainnet'
          activeChainId={activeChainId}
          pendingChainId={variables?.chainId ?? 0}
          isSwitchSuccess={isSuccess}
          isSwitchError={isError}
          chainsList={mainnetChains}
          onSwitchChain={onSwitchChain}
        />

        <ChainsList
          title='Testnet'
          activeChainId={activeChainId}
          pendingChainId={variables?.chainId ?? 0}
          isSwitchSuccess={isSuccess}
          isSwitchError={isError}
          chainsList={testnetChains}
          onSwitchChain={onSwitchChain}
        />
      </div>
    </ForwardedDialog>
  );
}

type TChainsList = {
  title: string;
  activeChainId: number;
  pendingChainId: number;
  isSwitchSuccess: boolean;
  isSwitchError: boolean;
  chainsList: Chain[];
  onSwitchChain(chainId: number): Promise<void>;
};

function ChainsList({
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
              onClick={() => onSwitchChain(chain.id)}
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
