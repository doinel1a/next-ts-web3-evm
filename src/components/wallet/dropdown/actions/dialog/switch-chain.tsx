'use client';

import React, { useCallback, useMemo } from 'react';

import type { Chain } from 'viem';

import { Button } from '@nextui-org/button';
import { RefreshCcw } from 'lucide-react';
import { toast } from 'sonner';
import { useChainId, useSwitchChain } from 'wagmi';

import { DialogHeader, DialogTitle } from '@/components/ui/dialog';

import ForwardedDialog from '.';
import IconDropdownMenuItem from '../../commons/icon-item';

type TSwitchChainDialog = {
  isDialogOpen?: boolean;
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onDropdownSelect: () => void;
  onDialogOpenChange: (open: boolean) => void;
};

export default function SwitchChainDialog({
  isDialogOpen,
  setIsDropdownOpen,
  onDropdownSelect,
  onDialogOpenChange
}: TSwitchChainDialog) {
  const activeChainId = useChainId();
  const { chains, variables, isError, isSuccess, reset, switchChainAsync } = useSwitchChain();
  const mainnetChains = useMemo(() => chains.filter((chain) => !!!chain.testnet), [chains]);
  const testnetChains = useMemo(() => chains.filter((chain) => !!chain.testnet), [chains]);

  const activeChain = useMemo(
    () => chains.find((chain) => chain.id === activeChainId),
    [activeChainId, chains]
  );

  const onSwitchChain = useCallback(
    async (chainId: number) => {
      if (activeChainId === chainId) {
        return;
      }

      try {
        await switchChainAsync({ chainId });

        onDialogOpenChange(false);
        setIsDropdownOpen(false);

        toast.success('Success', {
          description: (
            <>
              {activeChain ? (
                <p>
                  Chain switched to <span className='font-semibold'>{activeChain.name}</span>.
                </p>
              ) : (
                <p>Chain switched.</p>
              )}
            </>
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
              errorMessage = 'The switch chain request was rejected.';
              break;
            }
            case 'SwitchChainError': {
              errorMessage = 'A switch chain request is already pending.';
              break;
            }
            default: {
              errorMessage = 'Something horribly wrong happened.';
              break;
            }
          }

          toast.error('Error', {
            description: errorMessage
          });
        }

        console.error('Error switching chain', error);
      }
    },
    [activeChainId, activeChain, onDialogOpenChange, setIsDropdownOpen, switchChainAsync]
  );

  return (
    <ForwardedDialog
      isDialogOpen={isDialogOpen}
      triggerChildren={<IconDropdownMenuItem icon={RefreshCcw} text='Switch Chain' />}
      onDropdownSelect={onDropdownSelect}
      onDialogOpenChange={(open) => {
        onDialogOpenChange(open);
        reset();
      }}
    >
      <DialogHeader>
        <DialogTitle>Switch Chain</DialogTitle>
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
  onSwitchChain: (chainId: number) => Promise<void>;
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
