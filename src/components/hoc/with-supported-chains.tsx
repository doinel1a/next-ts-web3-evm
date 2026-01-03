'use client';

import { useCallback } from 'react';

import type { PropsWithChildren } from 'react';

import { Dialog, DialogContent, DialogPortal } from '@/components/ui/dialog';
import useSwitchChain from '@/hooks/use-switch-chain';

import SwitchChainDialogContent from '../switch-chain/dialog-content';

type TWithSupportedChains = PropsWithChildren;

export default function WithSupportedChains({ children }: Readonly<TWithSupportedChains>) {
  const {
    activeChainId,
    mainnetChains,
    testnetChains,
    variables,
    isError,
    isSuccess,
    isConnectedToSupportedChain,
    reset,
    onSwitchChain
  } = useSwitchChain();

  const onDialogOpenChange = useCallback(
    (open: boolean) => {
      if (!open && isConnectedToSupportedChain) {
        reset();
      }
    },
    [isConnectedToSupportedChain, reset]
  );

  return (
    <>
      <Dialog open={!isConnectedToSupportedChain} onOpenChange={onDialogOpenChange}>
        <DialogPortal>
          <DialogContent showCloseButton={false}>
            <SwitchChainDialogContent
              activeChainId={activeChainId}
              pendingChainId={variables?.chainId ?? 0}
              isSwitchSuccess={isSuccess}
              isSwitchError={isError}
              mainnetChains={mainnetChains}
              testnetChains={testnetChains}
              description='You are connected to an unsupported chain. Please switch to a chain from the list below.'
              onSwitchChain={onSwitchChain}
            />
          </DialogContent>
        </DialogPortal>
      </Dialog>

      {children}
    </>
  );
}
